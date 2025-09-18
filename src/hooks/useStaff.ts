// hooks/useStaff.ts
import { useState, useEffect, useCallback } from 'react';
import staffService, { Staff, StaffRegisterDto } from '../services/staffService';

export function useStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all staff
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await staffService.getAll();
      setStaff(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add/register a new staff member
  const addStaff = async (dto: StaffRegisterDto) => {
    try {
      const newStaff = await staffService.register(dto);
      setStaff(prev => [newStaff, ...prev]);
      return newStaff;
    } catch (err: any) {
      setError(err.message || 'Failed to add staff');
      throw err;
    }
  };

  // Update a staff member
  const updateStaff = async (id: string, updates: Partial<Staff>) => {
    try {
      const updated = await staffService.update(id, updates);
      setStaff(prev => prev.map(s => (s.id === id ? updated : s)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update staff');
      throw err;
    }
  };

  // Delete a staff member
  const removeStaff = async (id: string) => {
    try {
      await staffService.delete(id);
      setStaff(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete staff');
      throw err;
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    staff,
    loading,
    error,
    fetchStaff,
    addStaff,
    updateStaff,
    removeStaff,
  };
}
