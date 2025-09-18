// hooks/useJobs.ts
import { useState, useEffect, useCallback } from 'react';
import * as jobService from '../services/jobService';
import { Job } from '../services/jobService';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all jobs
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getAllJobs();
      setJobs(data);
     
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
      console.log(jobs)
    }
  }, []);

  // Create a new job
  const addJob = async (job: Omit<Job, 'id'>) => {
    try {
      const newJob = await jobService.createJob(job);
      setJobs(prev => [newJob, ...prev]);
      return newJob;
    } catch (err: any) {
      setError(err.message || 'Failed to create job');
      throw err;
    }
  };

  // Update a job
  const updateJob = async (id: string, updates: jobService.JobUpdatePayload) => {
    try {
    
      const updated = await jobService.updateJob(id, updates);
      setJobs(prev => prev.map(j => (j.id === id ? updated : j)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update job');
      throw err;
    }
  };

  // Delete a job
  const removeJob = async (id: string) => {
    try {
      await jobService.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete job');
      throw err;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    addJob,
    updateJob,
    removeJob,
  };
}
