<template>
  <article class="hotel-card">
    <!-- Sección de la imagen del hotel -->
    <div class="hotel-image-container">
      <img 
        :src="hotel.image" 
        :alt="`Imagen de ${hotel.name}`" 
        class="hotel-image"
        loading="lazy"
      >
    </div>
    
    <div class="hotel-content">
      <header class="hotel-header">
        <h2 class="hotel-name">{{ hotel.name }}</h2>
        <span class="hotel-city">{{ hotel.city }}</span>
      </header>
      
      <div class="hotel-details">
        <div class="detail-item">
          <span class="detail-label">Dirección:</span>
          <span class="detail-value">{{ hotel.address }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">NIT:</span>
          <span class="detail-value">{{ hotel.nit }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Habitaciones totales:</span>
          <span class="detail-value">{{ hotel.total_rooms }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Disponibles:</span>
          <span class="detail-value">{{ availableRooms }}</span>
        </div>
      </div>
      
      <div class="hotel-card__actions">
        <button class="hotel-card__button hotel-card__button--primary" @click="viewDetail">
          Ver Detalles
        </button>
        <button 
          class="hotel-card__button hotel-card__button--secondary"
          @click="emit('edit', hotel)"
        >
          Editar
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const props = defineProps({
  hotel: {
    type: Object,
    required: true,
    validator: (hotel) => {
      return [
        'id', 'name', 'address', 'city', 'nit', 'total_rooms', 'image', 'rooms'
      ].every(key => key in hotel)
    }
  }
})

const emit = defineEmits(['edit'])

// Calcular habitaciones disponibles
const availableRooms = computed(() => {
  const totalCreatedRooms = props.hotel.rooms?.reduce((sum, room) => sum + room.quantity, 0) || 0
  return props.hotel.total_rooms - totalCreatedRooms
})

function viewDetail() {
  // Versión segura usando path
  router.push({
    path: `/hotels/${props.hotel.id}`,
    state: { hotel: props.hotel }
  }).catch(err => {
    console.error('Navigation error:', err)
  })
}
</script>

<style scoped>
.hotel-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hotel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.hotel-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.hotel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hotel-card:hover .hotel-image {
  transform: scale(1.05);
}

.hotel-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.hotel-header {
  margin-bottom: 1rem;
}

.hotel-name {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  line-height: 1.2;
}

.hotel-city {
  display: inline-block;
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.hotel-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
}

.detail-label {
  font-weight: 600;
  color: #34495e;
}

.detail-value {
  color: #7f8c8d;
  text-align: right;
}

/* Estilo para resaltar las habitaciones disponibles */
.detail-item:last-child .detail-value {
  color: #27ae60;
  font-weight: 500;
}

.hotel-card__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.hotel-card__button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  border: none;
}

.hotel-card__button--primary {
  background-color: #4299e1;
  color: white;
}

.hotel-card__button--primary:hover {
  background-color: #3182ce;
}

.hotel-card__button--secondary {
  background-color: white;
  color: #4299e1;
  border: 1px solid #4299e1;
}

.hotel-card__button--secondary:hover {
  background-color: #ebf8ff;
}

@media (max-width: 768px) {
  .hotel-card__actions {
    flex-direction: column;
  }
  .hotel-image-container {
    height: 180px;
  }
  
  .hotel-content {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .hotel-image-container {
    height: 160px;
  }
  
  .hotel-name {
    font-size: 1.3rem;
  }
  
  .hotel-content {
    padding: 1rem;
  }
}
</style>