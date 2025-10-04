import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  guestName: string;
  roomType: 'Single' | 'Double' | 'Deluxe' | 'Suite';
  checkInDate: string;
  checkOutDate: string;
  contactNumber: string;
  email: string;
  idProof?: string;
  status: 'pending' | 'checked-in' | 'checked-out';
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const stored = localStorage.getItem('hotel-bookings');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('hotel-bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `BK${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBooking = (id: string, updatedData: Partial<Booking>) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...updatedData } : booking
      )
    );
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getBooking = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBooking, deleteBooking, getBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
