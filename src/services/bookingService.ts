// services/bookingService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5102/api/Booking'; // adjust your API base URL

// Helper to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  console.log(token)
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
    return res.data;
  },

  getAll: async (): Promise<Booking[]> => {
  //  const a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmNAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI2MDhmOGMwNi00ZmE1LTRkMjItYmE0NS04YWEwYjQ0YjliMTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSW1hbWEgSW1hbWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjdXN0b21lciIsImV4cCI6MTc1ODE0OTQ2MSwiaXNzIjoiTXlBcGkifQ.1WiQLaExkYfKWooZybaEa0tG20DHAxZf43PiwF3AZcg";
   // 
   const a =getToken();
   console.log(a)
    const res = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${a}`,
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

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  }
};
