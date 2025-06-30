<template>
  <Header />
  <div class="hotel-detail-container">
    <div class="hotel-info">
      <h1>{{ hotel.name }}</h1>
      <img :src="hotel.image" :alt="hotel.name" class="hotel-image">
      
      <div class="hotel-details">
        <p><strong>Dirección:</strong> {{ hotel.address }}, {{ hotel.city }}</p>
        <p><strong>NIT:</strong> {{ hotel.nit }}</p>
        <p><strong>Total habitaciones:</strong> {{ hotel.total_rooms }}</p>
      </div>
      
      <div class="rooms-section">
        <h2>Habitaciones</h2>
        <div v-if="hotel.rooms.length > 0" class="rooms-list">
          <div v-for="room in hotel.rooms" :key="room.id" class="room-card">
            <h3>{{ room.room_type.name }} - {{ room.accommodation.type }}</h3>
            <p>Cantidad: {{ room.quantity }}</p>
          </div>
        </div>
        <p v-else>Este hotel no tiene habitaciones registradas.</p>
      </div>
    </div>
    
    <div class="room-form">
      <h2>Agregar Nueva Habitación</h2>
      <form @submit.prevent="submitRoom">
        <div class="form-group">
          <label for="roomType">Tipo de habitación:</label>
          <select 
            id="roomType" 
            v-model="newRoom.room_type_id" 
            @change="updateAvailableAccommodations"
            required
          >
            <option value="">Seleccione...</option>
            <option 
              v-for="type in roomTypes" 
              :key="type.id" 
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="accommodation">Tipo de acomodación:</label>
          <select 
            id="accommodation" 
            v-model="newRoom.accommodation_id" 
            :disabled="!newRoom.room_type_id"
            required
          >
            <option value="">Seleccione...</option>
            <option 
              v-for="acc in availableAccommodations" 
              :key="acc.id" 
              :value="acc.id"
            >
              {{ acc.type }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="quantity">Cantidad:</label>
          <input 
            type="number" 
            id="quantity" 
            v-model.number="newRoom.quantity" 
            min="1" 
            required
          >
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Procesando...</span>
          <span v-else>Agregar Habitación</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import hotelService from '@/api/hotelService'
import roomService from '@/api/roomService'

const route = useRoute()
const id = route.params.id

// Datos del hotel
const hotel = ref({
  id: 0,
  name: '',
  address: '',
  city: '',
  nit: '',
  total_rooms: 0,
  image: '',
  rooms: []
})

// Tipos de habitación con sus acomodaciones
const roomTypes = ref([])
const availableAccommodations = ref([]) // Acomodaciones disponibles según tipo seleccionado

// Nueva habitación
const newRoom = ref({
  hotel_id: parseInt(id),
  room_type_id: '',
  accommodation_id: '',
  quantity: 1
})

// Estados de carga
const isLoading = ref(true)
const isSubmitting = ref(false)
const error = ref(null)

// Consultar datos iniciales
const fetchInitialData = async () => {
  try {
    isLoading.value = true
    
    // Consultar hotel
    if (route.state?.hotel) {
      hotel.value = route.state.hotel
    } else {
      const hotelData = await hotelService.getHotelById(id)
      hotel.value = hotelData
    }
    
    // Consultar tipos de habitación con sus acomodaciones
    const typesResponse = await roomService.getAllRoomTypes()
    roomTypes.value = typesResponse
    
  } catch (err) {
    console.error('Error fetching initial data:', err)
    error.value = 'No se pudieron cargar los datos necesarios'
  } finally {
    isLoading.value = false
  }
}

// Actualizar acomodaciones disponibles cuando cambia el tipo de habitación
const updateAvailableAccommodations = () => {
  // Resetear acomodación seleccionada
  newRoom.value.accommodation_id = ''
  
  if (!newRoom.value.room_type_id) {
    availableAccommodations.value = []
    return
  }
  
  // Buscar el tipo de habitación seleccionado
  const selectedType = roomTypes.value.find(
    type => type.id === parseInt(newRoom.value.room_type_id))
  
  // Si encontramos el tipo, obtenemos sus acomodaciones
  if (selectedType) {
    availableAccommodations.value = selectedType.accommodations.map(acc => ({
      id: acc.id,
      type: acc.type
    }))
  } else {
    availableAccommodations.value = []
  }
}

// Agregar nueva habitación
const submitRoom = async () => {
  try {
    isSubmitting.value = true
    
    // Validar que se haya seleccionado tipo y acomodación
    if (!newRoom.value.room_type_id || !newRoom.value.accommodation_id) {
      throw new Error('Debe seleccionar tipo de habitación y acomodación')
    }
    
    // Validar que la acomodación pertenezca al tipo seleccionado
    const isValidCombination = availableAccommodations.value.some(
      acc => acc.id === parseInt(newRoom.value.accommodation_id)
    )
    
    if (!isValidCombination) {
      throw new Error('La acomodación seleccionada no es válida para este tipo de habitación')
    }

    // Preparar datos para enviar al servicio
    const roomData = {
      hotel_id: newRoom.value.hotel_id,
      room_type_id: newRoom.value.room_type_id,
      accommodation_id: newRoom.value.accommodation_id,
      quantity: newRoom.value.quantity
    }

    // Llamar al servicio para crear la habitación
    const response = await roomService.createRoom(roomData)
    
    // Obtener detalles completos del tipo y acomodación para mostrar en la lista
    const selectedType = roomTypes.value.find(
      type => type.id === parseInt(newRoom.value.room_type_id))
    const selectedAccommodation = availableAccommodations.value.find(
      acc => acc.id === parseInt(newRoom.value.accommodation_id))
    
    // Agregar la nueva habitación a la lista local
    const createdRoom = {
      ...response.data, // Usamos los datos devueltos por el API
      room_type: {
        id: selectedType.id,
        name: selectedType.name
      },
      accommodation: {
        id: selectedAccommodation.id,
        type: selectedAccommodation.type
      }
    }
    
    hotel.value.rooms.push(createdRoom)
    hotel.value.total_rooms += newRoom.value.quantity
    
    // Resetear formulario
    newRoom.value = {
      hotel_id: parseInt(id),
      room_type_id: '',
      accommodation_id: '',
      quantity: 1
    }
    
    availableAccommodations.value = []
    
    // Mostrar notificación de éxito
    alert('Habitación agregada exitosamente!')
    
    // Opcional: Emitir evento para notificar al componente padre
    // emit('room-created', createdRoom)
    
  } catch (error) {
    console.error('Error adding room:', error)
    
    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error de respuesta del servidor
      if (error.response.status === 400) {
        alert('Datos inválidos: ' + (error.response.data.message || 'Verifique la información ingresada'))
      } else if (error.response.status === 401) {
        alert('No autorizado: Debe iniciar sesión para realizar esta acción')
      } else {
        alert('Error del servidor: ' + (error.response.data.message || 'Intente nuevamente más tarde'))
      }
    } else {
      // Error de red u otro tipo de error
      alert('Error al agregar habitación: ' + (error.message || 'Verifique su conexión e intente nuevamente'))
    }
  } finally {
    isSubmitting.value = false
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchInitialData()
})
</script>

<style scoped>
.hotel-detail-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hotel-info {
  flex: 2;
}

.room-form {
  flex: 1;
  border-left: 1px solid #eee;
  padding-left: 2rem;
}

.hotel-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.rooms-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.room-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select, input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6b;
}

/* Nuevos estilos para estados deshabilitados */
select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
}
</style>