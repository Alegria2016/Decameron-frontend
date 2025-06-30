<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ isEditing ? 'Editar Hotel' : 'Nuevo Hotel' }}</h3>
            <button class="modal-close" @click="close">
              &times;
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label>Nombre</label>
                <input v-model="formData.name" required>
              </div>
              
              <div class="form-group">
                <label>Dirección</label>
                <input v-model="formData.address" required>
              </div>
              
              <div class="form-group">
                <label>Ciudad</label>
                <input v-model="formData.city" required>
              </div>
              
              <div class="form-group">
                <label>NIT</label>
                <input v-model="formData.nit" required>
              </div>
              
              <div class="form-group">
                <label>Total de Habitaciones</label>
                <input v-model="formData.total_rooms" type="number" required>
              </div>
              
              <div class="form-group">
                <label>Imagen (URL)</label>
                <input v-model="formData.image" type="url">
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn-cancel"
                  @click="close"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="btn-submit"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  hotel: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const defaultFormData = {
  name: '',
  address: '',
  city: '',
  nit: '',
  total_rooms: 0,
  image: ''
}

const formData = ref({ ...defaultFormData })
const isSubmitting = ref(false)
const errors = ref({})

const isEditing = computed(() => !!props.hotel?.id)

// Actualizar formData cuando cambia el hotel
watch(() => props.hotel, (newHotel) => {
  formData.value = newHotel ? { ...newHotel } : { ...defaultFormData }
}, { immediate: true })

const close = () => {
  emit('close')
}

const submitForm = () => {
  isSubmitting.value = true
  emit('save', { ...formData.value })
  isSubmitting.value = false
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  width: 100%;
  max-width: 500px;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
}

.btn-submit {
  background-color: #4299e1;
  color: white;
}

/* Transiciones */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>