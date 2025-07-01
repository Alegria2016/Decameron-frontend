<template>
  <Header></Header>
  <section class="hotel-index">
    <div class="hotel-index__header">
      <h2 class="hotel-index__title">Nuestros Hoteles</h2>
      <div class="hotel-index__controls">
        <button 
          class="hotel-index__add-button"
          @click="openCreateModal"
        >
          <i class="fas fa-plus"></i> Nuevo Hotel
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="hotel-index__loading">
      <i class="fas fa-spinner fa-spin"></i> Cargando hoteles...
    </div>
    
    <div v-else-if="error" class="hotel-index__error">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>
    
    <div v-else-if="hotels.length === 0" class="hotel-index__empty">
      No se encontraron hoteles. ¡Agrega uno nuevo!
    </div>
    
    <div v-else class="hotel-grid">
      <HotelCard 
        v-for="hotel in hotels" 
        :key="hotel.id" 
        :hotel="hotel" 
        @edit="openEditModal"
      />
    </div>
  
    <!-- Modal para crear/editar -->
    <HotelFormModal
      v-if="showModal"
      :show="showModal"
      :hotel="selectedHotel"
      :is-editing="!!selectedHotel"
      @close="closeModal"
      @save="handleSave"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HotelCard from '../../components/hotels/HotelCard.vue'
import Header from '../Home.vue'
import hotelService from '../../api/hotelService'
import HotelFormModal from '../../components/hotels/HotelFormModal.vue'

const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedHotel = ref(null)
const hotels = ref([])

// Obtener lista de hoteles
const fetchHotels = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await hotelService.getAll()
    hotels.value = response.data || response
  } catch (err) {
    error.value = err.message || 'Error al cargar los hoteles'
    hotels.value = []
  } finally {
    loading.value = false
  }
}

// Abrir modal para crear nuevo hotel
const openCreateModal = () => {
  selectedHotel.value = null
  showModal.value = true
}

// Abrir modal para editar hotel
const openEditModal = (hotel) => {
  try {
    if (!hotel?.id) throw new Error('Hotel inválido')
    selectedHotel.value = { ...hotel } // Copia profunda para evitar mutaciones
    showModal.value = true
  } catch (err) {
    console.error('Error opening edit modal:', err)
    error.value = 'No se pudo abrir el editor'
  }
}

// Cerrar modal
const closeModal = () => {
  showModal.value = false
  selectedHotel.value = null
}

// Manejar guardado (creación o actualización)
const handleSave = async (hotelData) => {
  try {
    if (hotelData.id) {
      // Actualizar hotel existente
      const updatedHotel = await hotelService.updateHotel(hotelData.id, hotelData)
      
      // Actualizar lista local
      const index = hotels.value.findIndex(h => h.id === hotelData.id)
      if (index !== -1) {
        hotels.value[index] = updatedHotel.data || updatedHotel
      }
      
      // Mostrar feedback
      alert('Hotel actualizado exitosamente!')
    } else {
      // Crear nuevo hotel
      const response = await hotelService.createHotel(hotelData)
      const newHotel = response.data || response
      hotels.value.unshift(newHotel)
      alert('Hotel creado exitosamente!')
    }
    
    closeModal()
  } catch (err) {
    console.error('Error saving hotel:', err)
    error.value = err.response?.data?.message || err.message || 'Error al guardar el hotel'
  }
}

// Cargar hoteles al montar el componente
onMounted(() => {
  fetchHotels()
})
</script>

<style scoped>
.hotel-index {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
}

.hotel-index__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.hotel-index__title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.hotel-index__add-button {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hotel-index__add-button:hover {
  background-color: #3182ce;
}

.hotel-index__loading,
.hotel-index__error,
.hotel-index__empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.hotel-index__error {
  color: #e53e3e;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@media (min-width: 1024px) {
  .hotel-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .hotel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hotel-grid {
    grid-template-columns: 1fr;
  }
}
</style>