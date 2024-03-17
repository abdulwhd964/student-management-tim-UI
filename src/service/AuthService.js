import axios from 'axios';
const API_URL = 'http://localhost:8089/LMS'; // Update with your backend API URL

const AuthService = {
  
  login: async (username, password) => {
    try {
      
      const response = await axios.post(`${API_URL}/login?email=${username}&password=${password}`);
      // const response = await axios.post(`${API_URL}/login`, { username, password });
      if (response.data.token) {

        localStorage.setItem('user', JSON.stringify(response.data));
      }
    
      // return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

};

export default AuthService;
