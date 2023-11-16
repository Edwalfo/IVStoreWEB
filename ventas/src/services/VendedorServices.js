
import axios from 'axios';  

const API_BASE_URL = 'http://localhost:8000/api/vendedors';

class VendedorService {
  static async getAllVendedors() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching vendedors:', error);
      throw error;
    }
  }

  static async getVendedorById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data  ;
    } catch (error) {
      console.error(`Error fetching vendedor with ID ${id}:`, error);
      throw error;
    }
  }

  static async createVendedor(vendedorData) {

    console.log(vendedorData);
    try {
      const response = await axios.post(API_BASE_URL, vendedorData);
      return response.data;
    } catch (error) {
      console.error('Error creating vendedor:', error);
      throw error;
    }
  }

  static async updateVendedor(id, vendedorData) {


    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, vendedorData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating vendedor with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteVendedor(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vendedor with ID ${id}:`, error);
      throw error;
    }
  }
}

export default VendedorService;