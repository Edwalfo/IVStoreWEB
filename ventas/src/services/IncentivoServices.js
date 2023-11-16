

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/cantVentas';

class CategoriaService {
  static async getCountVentas() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching cantidad ventas:', error);
      throw error;
    }
  }

 
}

export default CategoriaService;