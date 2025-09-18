// services/staffService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5102/api/Staff';

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  rating: number;
}

export interface StaffRegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // store JWT after login
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const staffService = {
  register: async (dto: StaffRegisterDto): Promise<Staff> => {
    const res = await axios.post(`${API_URL}/register`, dto);
    return res.data;
  },

  login: async (dto: LoginDto): Promise<{ token: string }> => {
    const res = await axios.post(`${API_URL}/login`, dto);
    if (res.data.token) localStorage.setItem('token', res.data.token);
    return res.data;
  },

  getAll: async (): Promise<Staff[]> => {
    const res = await axios.get(API_URL, { headers: getAuthHeader() });
    console.log(res)
    return res.data;
  },

  getById: async (id: string): Promise<Staff> => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return res.data;
  },

  update: async (id: string, updates: Partial<Staff>): Promise<Staff> => {
    const res = await axios.put(`${API_URL}/${id}`, updates, { headers: getAuthHeader() });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  },
};

export default staffService;
