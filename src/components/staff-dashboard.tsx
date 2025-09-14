import React, { useState } from 'react';
import { useAuth } from './auth-context';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Pause,
  Star,
  MessageSquare
} from 'lucide-react';

interface Job {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  duration: string;
  price: number;
  status: 'assigned' | 'in-progress' | 'completed' | 'issue';
  specialInstructions?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockJobs: Job[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerPhone: '(555) 123-4567',
    service: 'Deep Cleaning',
    date: '2024-03-15',
    time: '09:00',
    address: '123 Main St, Apt 4B, Downtown',
    duration: '4 hours',
    price: 150,
    status: 'assigned',
    specialInstructions: 'Please focus on the kitchen and bathrooms. Pet-friendly products only.',
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Mike Wilson',
    customerPhone: '(555) 234-5678',
    service: 'Regular Cleaning',
    date: '2024-03-15',
    time: '14:00',
    address: '456 Oak Ave, Suite 12',
    duration: '2 hours',
    price: 80,
    status: 'assigned',
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Emma Davis',
    customerPhone: '(555) 345-6789',
    service: 'Move-out Cleaning',
    date: '2024-03-14',
    time: '10:00',
    address: '789 Pine Street',
    duration: '6 hours',
    price: 200,
    status: 'completed',
    priority: 'low'
  }
];

export function StaffDashboard() {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [issueReport, setIssueReport] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  const updateJobStatus = (jobId: string, newStatus: Job['status']) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const reportIssue = (jobId: string, issue: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'issue' } : job
    ));
    setIssueReport('');
    // In a real app, this would send the issue to management
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'issue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayJobs = jobs.filter(job => job.date === '2024-03-15');
  const completedJobs = jobs.filter(job => job.status === 'completed');
  const activeJob = jobs.find(job => job.status === 'in-progress');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl">Welcome, {user?.name}</h1>
              <p className="text-gray-600">Your cleaning assignments for today</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                Active Staff
              </Badge>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Today's Jobs</TabsTrigger>
            <TabsTrigger value="active">Active Job</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Today's Jobs</p>
          <p className="text-2xl font-semibold">{todayJobs.length}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <CheckCircle className="h-8 w-8 text-green-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-semibold">{completedJobs.length}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <Clock className="h-8 w-8 text-purple-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Hours Today</p>
          <p className="text-2xl font-semibold">6h</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <Star className="h-8 w-8 text-yellow-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Rating</p>
          <p className="text-2xl font-semibold">4.8</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>


            {/* Today's Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Assignments</CardTitle>
                <CardDescription>March 15, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{job.service}</h3>
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Customer: {job.customerName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <span className="font-medium">${job.price}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {job.time} ({job.duration})
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.address}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {job.customerPhone}
                        </div>
                      </div>

                      {job.specialInstructions && (
                        <div className="bg-blue-50 p-3 rounded text-sm">
                          <p className="font-medium text-blue-900">Special Instructions:</p>
                          <p className="text-blue-800">{job.specialInstructions}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {job.status === 'assigned' && (
                          <Button 
                            size="sm"
                            onClick={() => updateJobStatus(job.id, 'in-progress')}
                            className="flex items-center gap-1"
                          >
                            <Play className="h-4 w-4" />
                            Start Job
                          </Button>
                        )}
                        {job.status === 'in-progress' && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => updateJobStatus(job.id, 'completed')}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Mark Complete
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedJob(job)}
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Report Issue
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Customer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            {activeJob ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pause className="h-5 w-5 text-yellow-600" />
                    Active Job: {activeJob.service}
                  </CardTitle>
                  <CardDescription>Currently in progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Job Details</h4>
                        <div className="space-y-1 text-sm">
                          <p>Customer: {activeJob.customerName}</p>
                          <p>Phone: {activeJob.customerPhone}</p>
                          <p>Address: {activeJob.address}</p>
                          <p>Duration: {activeJob.duration}</p>
                          <p>Price: ${activeJob.price}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Time Tracking</h4>
                        <div className="space-y-1 text-sm">
                          <p>Started: {activeJob.time}</p>
                          <p>Elapsed: 1h 23m</p>
                          <p>Estimated completion: 12:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => updateJobStatus(activeJob.id, 'completed')}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Complete
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedJob(activeJob)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Job</h3>
                  <p className="text-gray-600">Start a job from your today's assignments to track progress here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Jobs</CardTitle>
                <CardDescription>Your recent completed assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{job.service}</h3>
                          <p className="text-sm text-gray-600">Customer: {job.customerName}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {job.date} at {job.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                          <span className="font-medium">${job.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Jobs Completed:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Hours:</span>
                    <span className="font-medium">38h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Earnings:</span>
                    <span className="font-medium">$1,520</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="font-medium flex items-center">
                      4.8 <Star className="h-4 w-4 text-yellow-500 ml-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm italic">"Excellent work! Very thorough and professional."</p>
                    <p className="text-xs text-gray-500 mt-1">- Sarah Johnson</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm italic">"Always on time and does a fantastic job."</p>
                    <p className="text-xs text-gray-500 mt-1">- Mike Wilson</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Issue Report Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Report Issue</CardTitle>
                <CardDescription>
                  Report any problems or concerns with the current job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Job: {selectedJob.service}</p>
                  <p className="text-sm text-gray-600">Customer: {selectedJob.customerName}</p>
                </div>
                <Textarea
                  placeholder="Describe the issue or concern..."
                  value={issueReport}
                  onChange={(e) => setIssueReport(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      reportIssue(selectedJob.id, issueReport);
                      setSelectedJob(null);
                    }}
                    disabled={!issueReport.trim()}
                  >
                    Submit Report
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}