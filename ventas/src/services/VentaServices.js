
import axios from 'axios';  

const API_BASE_URL = 'http://localhost:8000/api/facturas';

class VentaService {
  static async getAllVentas() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching ventas:', error);
      throw error;
    }
  }

  static async getVentaById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data  ;
    } catch (error) {
      console.error(`Error fetching venta with ID ${id}:`, error);
      throw error;
    }
  }

  static async createVenta(ventaData) {

   
    try {
      const response = await axios.post(API_BASE_URL, ventaData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error creating venta:', error);
      throw error;
    }
  }

  static async updateVenta(id, ventaData) {


    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, ventaData);

      return response.data;
    } catch (error) {
      console.error(`Error updating venta with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteVenta(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting venta with ID ${id}:`, error);
      throw error;
    }
  }
}

export default VentaService;