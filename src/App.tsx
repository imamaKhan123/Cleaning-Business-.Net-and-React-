import React from 'react';
import { AuthProvider, useAuth } from './components/auth-context';
import { Login } from './components/login';
import { CustomerDashboard } from './components/customer-dashboard';
import { StaffDashboard } from './components/staff-dashboard';
import { AdminDashboard } from './components/admin-dashboard';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  switch (user.role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Login />;
  }
}

export default function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />

    <AuthProvider >
      <AppContent />
    </AuthProvider>
        </>
  );
}