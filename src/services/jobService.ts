// services/jobService.ts
export interface Job {
    id: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    address: string;
    assignedTo: string;
    assignedName: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    price: number;
    priority: 'low' | 'medium' | 'high';
  }
  export interface JobUpdatePayload {
    status?: string;
    assignedTo?: string;
    assignedName?: string;
  }
  // Base API URL
  const API_URL = 'http://localhost:5102/api/Jobs';
  
  // Helper to get token from localStorage
  const getToken = () => localStorage.getItem('token');
  
  // 🔹 Get all jobs
  export const getAllJobs = async (): Promise<Job[]> => {
    
    const res = await fetch(`${API_URL}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    
    return res.json();
  };
  
  // 🔹 Get a single job by ID
  export const getJobById = async (id: string): Promise<Job> => {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error('Failed to fetch job');
    return res.json();
  };
  
  // 🔹 Create a new job
  export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error('Failed to create job');
    return res.json();
  };
  
  // 🔹 Update a job
  export const updateJob = async (jobId: string, data: JobUpdatePayload) => {
    console.log(jobId)
    const response = await fetch(`${API_URL}/${jobId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update job');
    }
  
    return response.json();
  };
  
  // 🔹 Delete a job
  export const deleteJob = async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error('Failed to delete job');
  };
  