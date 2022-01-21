import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getSupervisorBoard() {
    return axios.get(API_URL + 'sup', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();