import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend-decameron-app-3.onrender.com/api/v1',
  //timeout: 10000, // Tiempo máximo de espera de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || 'Error en la solicitud'
      })
    }
    console.error('Network Error:', error.message)
    return Promise.reject({
      status: null,
      message: 'Error de conexión. Verifique su red.'
    })
  }
)

export default apiClient