import apiClient from './apiClient'

const hotelService = {
  /**
   * Obtiene la lista completa de hoteles con sus habitaciones
   * @returns {Promise<Array>} Lista de hoteles
   */
   async getAll() {
    try {
      const response = await apiClient.get('/hotels');
      console.log('Response from /hotels:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  },

  /**
   * Obtiene un hotel específico por ID
   * @param {number} id - ID del hotel
   * @returns {Promise<Object>} Datos del hotel
   */
  async getHotelById(id) {
    try {
      const response = await apiClient.get(`/hotels/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching hotel ${id}:`, error)
      throw error
    }
  },

  /**
   * Crea un nuevo hotel
   * @param {Object} hotelData - Datos del hotel a crear
   * @returns {Promise<Object>} Hotel creado
   */
  async createHotel(hotelData) {
    try {
      const response = await apiClient.post('/hotels', hotelData)
      return response.data
    } catch (error) {
      console.error('Error creating hotel:', error)
      throw error
    }
  },

  /**
   * Actualiza un hotel existente
   * @param {number} id - ID del hotel a actualizar
   * @param {Object} hotelData - Datos actualizados
   * @returns {Promise<Object>} Hotel actualizado
   */
  async updateHotel(id, hotelData) {
    try {
      const response = await apiClient.put(`/hotels/${id}`, hotelData)
      return response.data
    } catch (error) {
      console.error(`Error updating hotel ${id}:`, error)
      throw error
    }
  },

  /**
   * Elimina un hotel
   * @param {number} id - ID del hotel a eliminar
   * @returns {Promise<void>}
   */
  async deleteHotel(id) {
    try {
      await apiClient.delete(`/hotels/${id}`)
    } catch (error) {
      console.error(`Error deleting hotel ${id}:`, error)
      throw error
    }
  },

  /**
   * Obtiene las habitaciones de un hotel específico
   * @param {number} hotelId - ID del hotel
   * @returns {Promise<Array>} Lista de habitaciones
   */
  async getHotelRooms(hotelId) {
    try {
      const response = await apiClient.get(`/hotels/${hotelId}/rooms`)
      return response.data
    } catch (error) {
      console.error(`Error fetching rooms for hotel ${hotelId}:`, error)
      throw error
    }
  }
}

export default hotelService