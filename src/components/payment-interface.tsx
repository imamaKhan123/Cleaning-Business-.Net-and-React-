import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Download, CreditCard, Calendar, MapPin, User, CheckCircle } from 'lucide-react';

interface PaymentInterfaceProps {
  appointment: {
    id: string;
    service: string;
    date: string;
    time: string;
    cleaner: string;
    address: string;
    price: number;
    status: string;
  };
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentInterface({ appointment, onBack, onComplete }: PaymentInterfaceProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);
  const [showInvoice, setShowInvoice] = useState(appointment.status === 'completed');

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setShowInvoice(true);
  };

  const downloadInvoice = () => {
    // Simulate invoice download
    const invoiceData = `
CLEANER PRO INVOICE
Invoice #: INV-${appointment.id}
Date: ${new Date().toLocaleDateString()}

Service: ${appointment.service}
Date: ${appointment.date}
Time: ${appointment.time}
Address: ${appointment.address}
Cleaner: ${appointment.cleaner}

Amount: $${appointment.price}
Status: Paid

Thank you for your business!
    `;
    
    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${appointment.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showInvoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-4">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl">Invoice</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl">Payment Successful</CardTitle>
              <CardDescription>Your payment has been processed successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invoice Details */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">CleanerPro Services</h3>
                    <p className="text-gray-600">Professional Cleaning Services</p>
                    <p className="text-gray-600">info@cleanerpro.com</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Invoice #INV-{appointment.id}</p>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    <Badge className="bg-green-100 text-green-800 mt-2">Paid</Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Service Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Service: {appointment.service}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{appointment.address}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Cleaner: {appointment.cleaner}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service Cost:</span>
                        <span>${appointment.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (0%):</span>
                        <span>$0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${appointment.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    Thank you for choosing CleanerPro! We hope you're satisfied with our service.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={downloadInvoice} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button onClick={onComplete}>
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl">Payment</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{appointment.service}</span>
                  <span>${appointment.price}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {appointment.date} at {appointment.time}
                  </div>
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {appointment.address}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Cleaner: {appointment.cleaner}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${appointment.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${appointment.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === 'bank' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Account Name:</strong> CleanerPro Services Ltd</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Routing Number:</strong> 987654321</p>
                    <p><strong>Reference:</strong> INV-{appointment.id}</p>
                  </div>
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay $${appointment.price}`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your payment information is secure and encrypted. We do not store your payment details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}