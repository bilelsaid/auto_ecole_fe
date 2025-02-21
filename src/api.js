// src/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:4443/';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests.
});

export default api;
