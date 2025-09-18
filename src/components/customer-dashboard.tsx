import React, { useState ,useEffect} from 'react';
import { useAuth } from './auth-context';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, MapPin, CreditCard, Star, Plus, CheckCircle } from 'lucide-react';
import { ServiceBooking } from './service-booking';
import { PaymentInterface } from './payment-interface';
import { bookingService } from '../services/bookingService';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  cleaner: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  address: string;
  price: number;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    service: 'Deep Cleaning',
    date: '2024-03-15',
    time: '09:00',
    cleaner: 'Sarah Johnson',
    status: 'scheduled',
    address: '123 Main St, Apt 4B',
    price: 120
  },
  {
    id: '2',
    service: 'Regular Cleaning',
    date: '2024-03-10',
    time: '14:00',
    cleaner: 'Mike Wilson',
    status: 'completed',
    address: '123 Main St, Apt 4B',
    price: 80
  },
  {
    id: '3',
    service: 'Move-out Cleaning',
    date: '2024-03-08',
    time: '10:00',
    cleaner: 'Emma Davis',
    status: 'completed',
    address: '456 Oak Ave',
    price: 200
  }
];

export function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAll();
        setAppointments(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };
  
    fetchBookings();
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookingComplete = (booking: any) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      service: booking.service,
      date: booking.date,
      time: booking.time,
      cleaner: 'To be assigned',
      status: 'scheduled',
      address: booking.address,
      price: booking.price
    };
    setAppointments([newAppointment, ...appointments]);
    setShowBooking(false);
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === "scheduled" || apt.status === 'in-progress');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

  if (showBooking) {
    return <ServiceBooking onBack={() => setShowBooking(false)} onComplete={handleBookingComplete} />;
  }

  if (showPayment && selectedAppointment) {
    return (
      <PaymentInterface 
        appointment={selectedAppointment}
        onBack={() => {
          setShowPayment(false);
          setSelectedAppointment(null);
        }}
        onComplete={() => {
          setShowPayment(false);
          setSelectedAppointment(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl">Welcome back, {user?.name}</h1>
              <p className="text-gray-600">Manage your cleaning services</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setShowBooking(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Book Service
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">All Appointments</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-pink-100/50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-pink-600" />
                    <div className="ml-4">
                      <p className="text-sm text-pink-700">Upcoming</p>
                      <p className="text-2xl text-pink-800">{upcomingAppointments.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-blue-700">Completed</p>
                      <p className="text-2xl text-blue-800">{pastAppointments.filter(a => a.status === 'completed').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm text-purple-700">This Month</p>
                      <p className="text-2xl text-purple-800">${appointments.reduce((sum, apt) => sum + apt.price, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50 to-indigo-100/50">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-indigo-600" />
                    <div className="ml-4">
                      <p className="text-sm text-indigo-700">Rating</p>
                      <p className="text-2xl text-indigo-800">4.9</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled cleaning services</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Button onClick={() => setShowBooking(true)} className="mt-4">
                      Book Your First Service
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col">
                            <p className="font-medium">{appointment.service}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {appointment.date}
                              <Clock className="h-4 w-4 ml-3 mr-1" />
                              {appointment.time}
                              <MapPin className="h-4 w-4 ml-3 mr-1" />
                              {appointment.address}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Cleaner: {appointment.cleaner?appointment.cleaner:"To be Assigned" }</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <p className="font-medium">${appointment.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>Complete history of your cleaning services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <p className="font-medium">{appointment.service}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {appointment.date}
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            {appointment.time}
                            <MapPin className="h-4 w-4 ml-3 mr-1" />
                            {appointment.address}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Cleaner: {appointment.cleaner?appointment.cleaner:"To be Assigned" }</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <p className="font-medium">${appointment.price}</p>
                        {appointment.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowPayment(true);
                            }}
                          >
                            View Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
                <CardDescription>Manage your payments and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Total Spent This Month</h3>
                        <p className="text-2xl text-green-600">${appointments.filter(a => a.status === 'completed').reduce((sum, apt) => sum + apt.price, 0)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Average Service Cost</h3>
                        <p className="text-2xl text-blue-600">$133</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Recent Invoices</h3>
                    {appointments.filter(a => a.status === 'completed').map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{appointment.service}</p>
                          <p className="text-sm text-gray-600">{appointment.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">${appointment.price}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowPayment(true);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
