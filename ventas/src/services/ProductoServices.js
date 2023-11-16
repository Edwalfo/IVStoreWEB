// services/ProductoService.js

import axios from 'axios';  

const API_BASE_URL = 'http://localhost:8000/api/productos';

class ProductoService {
  static async getAllProductos() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  }

  static async getProductoById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data  ;
    } catch (error) {
      console.error(`Error fetching producto with ID ${id}:`, error);
      throw error;
    }
  }

  static async createProducto(productoData) {

    console.log(productoData);
    try {
      const response = await axios.post(API_BASE_URL, productoData);
      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  }

  static async updateProducto(id, productoData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, productoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating producto with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteProducto(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting producto with ID ${id}:`, error);
      throw error;
    }
  }
}

export default ProductoService;