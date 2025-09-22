import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { X, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

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

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateAppointment: (id: string, updatedAppointment: Partial<Appointment>) => void;
  onCancelAppointment: (id: string) => void;
}

const serviceTypes = [
  { value: 'Regular Cleaning', label: 'Regular Cleaning', price: 80 },
  { value: 'Deep Cleaning', label: 'Deep Cleaning', price: 150 },
  { value: 'Move-out Cleaning', label: 'Move-out Cleaning', price: 200 },
  { value: 'Commercial Cleaning', label: 'Commercial Cleaning', price: 120 },
  { value: 'Post-Construction Cleaning', label: 'Post-Construction Cleaning', price: 250 }
];

export function EditAppointmentModal({ 
  isOpen, 
  onClose, 
  appointment, 
  onUpdateAppointment,
  onCancelAppointment 
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    address: '',
    price: 0,
  
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    if (appointment) {
      const normalizedDate = new Date(appointment.date).toISOString().split('T')[0]; // 'YYYY-MM-DD'

      setFormData({
        service: appointment.service,
        date: normalizedDate,
        time: appointment.time,
        address: appointment.address,
        price: appointment.price,
        cleaner: "To be Assigned"
      });
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  // Only allow editing if appointment is scheduled
  const canEdit = appointment.status === 'scheduled';

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
    
    // Check if appointment is in the past
    const appointmentDate = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
    
    if (appointmentDate <= now) {
      newErrors.date = 'Cannot schedule appointment in the past';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedData: Partial<Appointment> = {
      service: formData.service,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      price: formData.price
    };

    onUpdateAppointment(appointment.id, updatedData);
    onClose();
  };

  const handleCancel = () => {
    onCancelAppointment(appointment.id);
    try {
      if (!appointment) return;
  
  
      // 2️⃣ Close the cancel dialog
      setShowCancelDialog(false);
  
      // 3️⃣ Close the modal
      onClose();
  
      
    } catch (error) {
      toast.error("Failed to cancel appointment:", error);
      // Optionally: show an error notification
    }
   
  };

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  // Check if changes have been made
  const hasChanges = 
    formData.service !== appointment.service ||
    formData.date !== appointment.date ||
    formData.time !== appointment.time ||
    formData.address !== appointment.address ||
    formData.price !== appointment.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {canEdit ? 'Edit Appointment' : 'View Appointment'}
              </CardTitle>
              <CardDescription>
                {canEdit 
                  ? 'Modify your scheduled cleaning service' 
                  : 'Appointment details (cannot be edited)'
                }
              </CardDescription>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Service Type</Label>
              {canEdit ? (
                <>
                  <Select
                    value={formData.service}
                    onValueChange={handleServiceSelect}
                  >
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
                </>
              ) : (
                <Input value={formData.service} disabled />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                {canEdit ? (
                  <>
                    <Input
                      type="date"
                      value={formData.date?? ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      min={minDate}
                    />
                    {errors.date && (
                      <p className="text-sm text-red-600">{errors.date}</p>
                    )}
                  </>
                ) : (
                  <Input value={formData.date ?? ""} disabled />
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Time</Label>
                {canEdit ? (
                  <>
                    <Input
                      type="time"
                      value={formData.time ?? ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    />
                    {errors.time && (
                      <p className="text-sm text-red-600">{errors.time}</p>
                    )}
                  </>
                ) : (
                  <Input value={formData.time ?? ""} disabled />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              {canEdit ? (
                <>
                  <Textarea
                    value={formData.address ?? ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter service address"
                    rows={2}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address}</p>
                  )}
                </>
              ) : (
                <Textarea value={formData.address ?? ""} disabled rows={2} />
              )}
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price ?? 0}
                disabled={true}
                onChange={canEdit ? (e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) })) : undefined}
                min="0"
                step="10"
              />
            </div>

            <div className="space-y-2">
              <Label>Assigned Cleaner</Label>
              <Input value={appointment.cleaner ?? ""} disabled />
              <p className="text-sm text-gray-600">
                Contact support to change assigned cleaner
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {canEdit ? (
                <>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={!hasChanges}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  
                  <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel Appointment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this appointment? This action cannot be undone.
                          You may be subject to cancellation fees depending on our policy.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
                          Yes, Cancel Appointment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <Button type="button" onClick={onClose} className="w-full">
                  Close
                </Button>
              )}
            </div>

            {canEdit && (
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Changes can be made up to 24 hours before the appointment</p>
                <p>• Cancellations made less than 24 hours in advance may incur fees</p>
                <p>• Contact support for staff changes or special requests</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}