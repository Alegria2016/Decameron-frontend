import apiClient from './apiClient'

const roomService = {
    async getAllRoomTypes() {
    try {
      const response = await apiClient.get('/room-types');
      console.log('Response from /room-types:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching room types:', error);
      throw error;
    }
  },
    async createRoom(roomData) {
    try {
      const response = await apiClient.post(`/hotels/${roomData.hotel_id}/rooms`, roomData)
      return response.data
    } catch (error) {
      console.error('Error creating room:', error)
      throw error
    }
  },
}

export default roomService