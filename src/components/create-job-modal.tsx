import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { X, Plus } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'busy' | 'offline';
  rating: number;
  jobsCompleted: number;
  specialties: string[];
}

interface Job {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  address: string;
  assignedTo: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  priority: 'low' | 'medium' | 'high';
  customerEmail?: string;
  customerPhone?: string;
  specialInstructions?: string;
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateJob: (job: Omit<Job, 'id'>) => void;
  staff: Staff[];
}

const serviceTypes = [
  { value: 'regular', label: 'Regular Cleaning', price: 80 },
  { value: 'deep', label: 'Deep Cleaning', price: 150 },
  { value: 'moveout', label: 'Move-out Cleaning', price: 200 },
  { value: 'commercial', label: 'Commercial Cleaning', price: 120 },
  { value: 'post-construction', label: 'Post-Construction Cleaning', price: 250 }
];

const existingCustomers = [
  { name: 'John Doe', email: 'john.doe@email.com', phone: '(555) 123-4567' },
  { name: 'Alice Smith', email: 'alice.smith@email.com', phone: '(555) 234-5678' },
  { name: 'Bob Brown', email: 'bob.brown@email.com', phone: '(555) 345-6789' },
  { name: 'Emma Wilson', email: 'emma.wilson@email.com', phone: '(555) 456-7890' },
  { name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '(555) 567-8901' }
];

export function CreateJobModal({ isOpen, onClose, onCreateJob, staff }: CreateJobModalProps) {
  const [formData, setFormData] = useState({
    customerType: 'existing', // 'existing' or 'new'
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    price: 0,
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleCustomerSelect = (customerName: string) => {
    const customer = existingCustomers.find(c => c.name === customerName);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone
      }));
    }
  };

  const handleServiceSelect = (service: string) => {
    const serviceType = serviceTypes.find(s => s.value === service);
    if (serviceType) {
      setFormData(prev => ({
        ...prev,
        service: serviceType.label,
        price: serviceType.price
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.service) {
      newErrors.service = 'Service type is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (formData.customerType === 'new') {
      if (!formData.customerEmail.trim()) {
        newErrors.customerEmail = 'Email is required for new customers';
      }
      if (!formData.customerPhone.trim()) {
        newErrors.customerPhone = 'Phone is required for new customers';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newJob: Omit<Job, 'id'> = {
      customerName: formData.customerName,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      assignedTo: formData.assignedTo || 'Unassigned',
      status: 'scheduled',
      price: formData.price,
      priority: formData.priority,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      specialInstructions: formData.notes
    };

    onCreateJob(newJob);
    
    // Reset form
    setFormData({
      customerType: 'existing',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      service: '',
      date: '',
      time: '',
      address: '',
      assignedTo: '',
      priority: 'medium',
      price: 0,
      notes: ''
    });
    setErrors({});
    onClose();
  };

  const availableStaff = staff.filter(s => s.status === 'active');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Job</CardTitle>
              <CardDescription>Schedule a new cleaning service</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Customer Information</h3>
              
              <div className="space-y-2">
                <Label>Customer Type</Label>
                <Select
                  value={formData.customerType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, customerType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">Existing Customer</SelectItem>
                    <SelectItem value="new">New Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.customerType === 'existing' ? (
                <div className="space-y-2">
                  <Label>Select Customer</Label>
                  <Select onValueChange={handleCustomerSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose existing customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingCustomers.map((customer) => (
                        <SelectItem key={customer.name} value={customer.name}>
                          {customer.name} - {customer.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.customerName && (
                    <p className="text-sm text-red-600">{errors.customerName}</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Enter customer name"
                    />
                    {errors.customerName && (
                      <p className="text-sm text-red-600">{errors.customerName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="customer@email.com"
                    />
                    {errors.customerEmail && (
                      <p className="text-sm text-red-600">{errors.customerEmail}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                    {errors.customerPhone && (
                      <p className="text-sm text-red-600">{errors.customerPhone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select onValueChange={handleServiceSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-sm text-red-600">{errors.service}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as 'low' | 'medium' | 'high' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600">{errors.date}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-600">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter service address"
                  rows={2}
                />
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="space-y-2">
                  <Label>Assign Staff (Optional)</Label>
                 <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Leave unassigned or select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {availableStaff.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name} - Rating: {member.rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions or notes"
                  rows={3}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}