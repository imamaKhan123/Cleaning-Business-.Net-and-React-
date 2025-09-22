import { useState, useEffect, useCallback } from 'react';
import { bookingService, Booking, BookingDto } from '../services/bookingService';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new booking
  const addBooking = async (dto: BookingDto) => {
    try {
      const newBooking = await bookingService.create(dto);
      setBookings(prev => [newBooking, ...prev]);
      return newBooking;
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
      throw err;
    }
  };

  // Update a booking
  const updateBooking = async (id: string, updates: Partial<BookingDto>) => {
    try {
      const updated = await bookingService.update(id, updates as BookingDto);
      setBookings(prev => prev.map(b => (b.id === id ? updated : b)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update booking');
      throw err;
    }
  };

  //cancel bboking
  const cancelBooking = async (id: string) => {
    try {
      const updated = await bookingService.cancel(id);
      setBookings(prev => prev.map(b => (b.id === id ? updated : b)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel booking');
      throw err;
    }
  };

  // Delete a booking
  const removeBooking = async (id: string) => {
    try {
      await bookingService.delete(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete booking');
      throw err;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    addBooking,
    cancelBooking,
    updateBooking,
    removeBooking,
  };
}
