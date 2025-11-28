import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export const fetchHealthPing = async () => {
  const { data } = await apiClient.get('/ping');
  return data;
};

export default apiClient;
