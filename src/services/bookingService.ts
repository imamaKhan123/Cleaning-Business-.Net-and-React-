// services/bookingService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5102/api/Booking'; // adjust your API base URL

// Helper to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  //console.log(token)
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface BookingDto {
  service: string;
  date: string;
  time: string;
  address: string;
  price: number;
  addOns?: string[];
  specialInstructions?: string;
  frequency?: string;
  status?: string;
}

export interface Booking extends BookingDto {
  id: string; // Guid
  userId: string;
}
const getToken = () => localStorage.getItem('token');
export const bookingService = {
  create: async (dto: BookingDto): Promise<Booking> => {
    const res = await axios.post(API_URL, dto, { headers: getAuthHeader() });
    if (!res || !res.data) throw new Error("Failed to create bookings");
   console.log(res.data)
    return res.data;
  },

  getAll: async (): Promise<Booking[]> => {
 
 
    const res = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      withCredentials: true 
    });
  
    if (!res || !res.data) throw new Error("Failed to fetch bookings");
    return res.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() , withCredentials:true});
    return res.data;
  },

  update: async (id: string, dto: BookingDto): Promise<Booking> => {
    const res = await axios.put(`${API_URL}/${id}`, dto, { headers: getAuthHeader() });
    return res.data;
  },
  cancel: async (id: string): Promise<Booking> => {
    const res = await axios.put(
      `${API_URL}/${id}/cancel`,
      {}, // empty body
      { headers: getAuthHeader() } // headers go here
    ); return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  }
};
