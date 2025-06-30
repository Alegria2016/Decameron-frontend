// composables/useHotels.js
import { ref } from 'vue'
import hotelService from '@/services/hotelService'

export default function useHotels() {
  const hotels = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchHotels = async () => {
    try {
      loading.value = true
      error.value = null
      hotels.value = await hotelService.getHotels()
    } catch (err) {
      error.value = err.message || 'Error al cargar hoteles'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    hotels,
    loading,
    error,
    fetchHotels
  }
}