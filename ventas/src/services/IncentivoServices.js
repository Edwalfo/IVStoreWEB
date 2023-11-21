import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/countVentas';

class IncentivoServices {
  static async getCountVentas(inicio = null, fin = null) {
    let ruta = API_BASE_URL;  // Inicializar ruta con la URL base

    if (inicio && fin) {
      ruta = `${API_BASE_URL}/${inicio}/${fin}`;  // Sobrescribir con la URL completa si inicio y fin están presentes
    }

    try {
      const response = await axios.get(ruta);

      return response.data.data;
    } catch (error) {
      console.error('Error fetching cantidad ventas:', error);
      throw error;
    }
  }
}

export default IncentivoServices;