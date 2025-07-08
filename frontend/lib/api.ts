import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  indexNumber: string;
  password: string;
}

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async connectWallet(walletAddress: string) {
    return api.post('/auth/connect-wallet', { walletAddress });
  },

  async updatePassword(data: { oldPassword: string; newPassword: string }) {
    return api.put('/auth/update-password', data);
  },

  logout() {
    localStorage.removeItem('token');
  },
};

export default api;
