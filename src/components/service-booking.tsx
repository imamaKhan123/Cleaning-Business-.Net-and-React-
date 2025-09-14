import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ArrowLeft, Home, Sparkles, Package, Truck } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: string;
  icon: React.ReactNode;
}

const services: ServiceOption[] = [
  {
    id: 'regular',
    name: 'Regular Cleaning',
    description: 'Standard cleaning of all rooms including dusting, vacuuming, and bathroom cleaning',
    basePrice: 80,
    duration: '2-3 hours',
    icon: <Home className="h-6 w-6" />
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Thorough cleaning including inside appliances, baseboards, and detailed sanitization',
    basePrice: 150,
    duration: '4-6 hours',
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    id: 'moveout',
    name: 'Move-out Cleaning',
    description: 'Complete cleaning for move-out including inside cabinets, appliances, and deep sanitization',
    basePrice: 200,
    duration: '6-8 hours',
    icon: <Package className="h-6 w-6" />
  },
  {
    id: 'commercial',
    name: 'Commercial Cleaning',
    description: 'Office and commercial space cleaning with professional-grade equipment',
    basePrice: 120,
    duration: '3-5 hours',
    icon: <Truck className="h-6 w-6" />
  }
];

const addOns = [
  { id: 'windows', name: 'Window Cleaning', price: 30 },
  { id: 'carpet', name: 'Carpet Cleaning', price: 50 },
  { id: 'appliances', name: 'Inside Appliances', price: 40 },
  { id: 'garage', name: 'Garage Cleaning', price: 35 }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

interface ServiceBookingProps {
  onBack: () => void;
  onComplete: (booking: any) => void;
}

export function ServiceBooking({ onBack, onComplete }: ServiceBookingProps) {
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    specialInstructions: '',
    frequency: 'one-time'
  });

  const calculateTotal = () => {
    if (!selectedService) return 0;
    
    let total = selectedService.basePrice;
    
    // Add bedroom/bathroom modifiers
    const bedrooms = parseInt(formData.bedrooms) || 0;
    const bathrooms = parseInt(formData.bathrooms) || 0;
    total += bedrooms * 10 + bathrooms * 15;
    
    // Add selected add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    
    // Apply frequency discount
    if (formData.frequency === 'weekly') total *= 0.9;
    else if (formData.frequency === 'bi-weekly') total *= 0.95;
    
    return Math.round(total);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    const booking = {
      service: selectedService.name,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      price: calculateTotal(),
      addOns: selectedAddOns,
      specialInstructions: formData.specialInstructions,
      frequency: formData.frequency
    };
    
    onComplete(booking);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl">Book a Cleaning Service</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Service Type</CardTitle>
              <CardDescription>Choose the type of cleaning service you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedService?.id === service.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-600 mt-1">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">{service.duration}</span>
                          <Badge variant="secondary">${service.basePrice}+</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedService && (
            <>
              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Help us provide an accurate quote</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select onValueChange={(value) => setFormData({...formData, bedrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select onValueChange={(value) => setFormData({...formData, bathrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select onValueChange={(value) => setFormData({...formData, frequency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="One-time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="weekly">Weekly (10% off)</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly (5% off)</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address including apartment/unit number"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle>Add-on Services</CardTitle>
                  <CardDescription>Enhance your cleaning with additional services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {addOns.map((addOn) => (
                      <div key={addOn.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={addOn.id}
                            checked={selectedAddOns.includes(addOn.id)}
                            onCheckedChange={() => handleAddOnToggle(addOn.id)}
                          />
                          <Label htmlFor={addOn.id} className="font-medium">{addOn.name}</Label>
                        </div>
                        <Badge variant="outline">+${addOn.price}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                  <CardDescription>Choose your preferred date and time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Select onValueChange={(value) => setFormData({...formData, time: value})} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special requests or areas that need extra attention?"
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{selectedService.name}</span>
                      <span>${selectedService.basePrice}</span>
                    </div>
                    {formData.bedrooms && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formData.bedrooms} bedrooms</span>
                        <span>+${parseInt(formData.bedrooms) * 10}</span>
                      </div>
                    )}
                    {formData.bathrooms && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formData.bathrooms} bathrooms</span>
                        <span>+${parseInt(formData.bathrooms) * 15}</span>
                      </div>
                    )}
                    {selectedAddOns.map(addOnId => {
                      const addOn = addOns.find(a => a.id === addOnId);
                      return addOn ? (
                        <div key={addOnId} className="flex justify-between text-sm text-gray-600">
                          <span>{addOn.name}</span>
                          <span>+${addOn.price}</span>
                        </div>
                      ) : null;
                    })}
                    {formData.frequency !== 'one-time' && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>{formData.frequency} discount</span>
                        <span>-{formData.frequency === 'weekly' ? '10' : '5'}%</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                Book Service - ${calculateTotal()}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}