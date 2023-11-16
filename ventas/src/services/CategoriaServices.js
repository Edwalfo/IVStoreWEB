// services/CategoriaService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/categorias';

class CategoriaService {
  static async getAllCategorias() {
    try {
      const response = await axios.get(API_BASE_URL);
   
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categorias:', error);
      throw error;
    }
  }

  static async getCategoriaById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data  ;
    } catch (error) {
      console.error(`Error fetching categoria with ID ${id}:`, error);
      throw error;
    }
  }

  static async createCategoria(categoriaData) {
    try {
      const response = await axios.post(API_BASE_URL, categoriaData);
      return response.data;
    } catch (error) {
      console.error('Error creating categoria:', error);
      throw error;
    }
  }

  static async updateCategoria(id, categoriaData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, categoriaData);
      return response.data;
    } catch (error) {
      console.error(`Error updating categoria with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteCategoria(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting categoria with ID ${id}:`, error);
      throw error;
    }
  }
}

export default CategoriaService;