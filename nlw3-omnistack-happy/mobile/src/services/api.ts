import axios from 'axios';

const api = axios.create({
  baseURL: 'https://192.168.25.10:3333',
});

export default api;