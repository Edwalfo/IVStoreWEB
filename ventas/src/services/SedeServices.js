// services/SedeService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/sedes';

class SedeService {
  static async getAllSedes() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching sedes:', error);
      throw error;
    }
  }

  static async getSedeById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data  ;
    } catch (error) {
      console.error(`Error fetching sede with ID ${id}:`, error);
      throw error;
    }
  }

  static async createSede(sedeData) {
    try {
      const response = await axios.post(API_BASE_URL, sedeData);
      return response.data;
    } catch (error) {
      console.error('Error creating sede:', error);
      throw error;
    }
  }

  static async updateSede(id, sedeData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, sedeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating sede with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteSede(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting sede with ID ${id}:`, error);
      throw error;
    }
  }
}

export default SedeService;