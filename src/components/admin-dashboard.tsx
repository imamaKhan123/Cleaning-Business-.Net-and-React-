import React, { useState } from 'react';
import { useAuth } from './auth-context';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Star,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { useStaff } from '../hooks/useStaff';
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
}

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Jane Cleaner',
    email: 'jane@cleanerpro.com',
    phone: '(555) 234-5678',
    status: 'active',
    rating: 4.8,
    jobsCompleted: 156,
    specialties: ['Deep Cleaning', 'Commercial']
  },
  {
    id: '2',
    name: 'Mike Wilson',
    email: 'mike@cleanerpro.com',
    phone: '(555) 345-6789',
    status: 'busy',
    rating: 4.6,
    jobsCompleted: 143,
    specialties: ['Regular Cleaning', 'Move-out']
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@cleanerpro.com',
    phone: '(555) 456-7890',
    status: 'offline',
    rating: 4.9,
    jobsCompleted: 189,
    specialties: ['Deep Cleaning', 'Post-Construction']
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    customerName: 'John Doe',
    service: 'Deep Cleaning',
    date: '2024-03-15',
    time: '09:00',
    address: '123 Main St, Apt 4B',
    assignedTo: 'Jane Cleaner',
    status: 'in-progress',
    price: 150,
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Alice Smith',
    service: 'Regular Cleaning',
    date: '2024-03-15',
    time: '14:00',
    address: '456 Oak Ave',
    assignedTo: 'Mike Wilson',
    status: 'scheduled',
    price: 80,
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Bob Brown',
    service: 'Move-out Cleaning',
    date: '2024-03-16',
    time: '10:00',
    address: '789 Pine St',
    assignedTo: 'Unassigned',
    status: 'scheduled',
    price: 200,
    priority: 'high'
  }
];

export function AdminDashboard() {
  const { user, logout } = useAuth();

  // const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const { jobs, loading, error, addJob, updateJob, removeJob, fetchJobs } = useJobs();
  const { addStaff,staff } = useStaff();
//  const [staff, setStaff] = useState([]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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

  const assignJob = async (job: Job, staff: Staff) => {
    try {
      await updateJob(job.id, {
        status: 'scheduled',        // or whatever status you want
        assignedTo: staff.id,       // staff GUID
        assignedName: staff.name    // staff display name
      });
  
      // Update local state
      // setJobs(jobs.map(j => 
      //   j.id === job.id ? { ...j, assignedTo: staff.name, status: 'scheduled' } : j
      // ));
  
      setShowAssignModal(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Failed to assign job:", err);
    }
  };
  

  const totalRevenue = jobs.filter(j => j.status === 'completed').reduce((sum, job) => sum + job.price, 0);
  const activeJobs = jobs.filter(j => j.status === 'in-progress').length;
  const availableStaff = staff.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your cleaning business operations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">
                Admin Access
              </Badge>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <DollarSign className="h-8 w-8 text-green-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Today's Revenue</p>
          <p className="text-2xl font-semibold">${totalRevenue}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Active Jobs</p>
          <p className="text-2xl font-semibold">{activeJobs}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <Users className="h-8 w-8 text-purple-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Available Staff</p>
          <p className="text-2xl font-semibold">{availableStaff}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-start">
        <TrendingUp className="h-8 w-8 text-orange-600" />
        <div className="ml-4">
          <p className="text-sm text-gray-600">Growth</p>
          <p className="text-2xl font-semibold">+23%</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>


            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>Latest job updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{job.service}</p>
                          <p className="text-sm text-gray-600">{job.customerName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <span className="text-sm">${job.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Status</CardTitle>
                  <CardDescription>Current staff availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staff.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.jobsCompleted} jobs completed</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{member.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Job Management</h2>
                <p className="text-gray-600">Monitor and assign cleaning jobs</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Job
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Jobs</CardTitle>
                <CardDescription>Manage and track all cleaning assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{job.service}</h3>
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority}
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

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {job.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {job.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.address}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {job.assignedTo? job.assignedName : "Not Assigned yet"}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {job.assignedTo === 'Unassigned' ||job.assignedTo === null  && (
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedJob(job);
                              setShowAssignModal(true);
                            }}
                          >
                            Assign Staff
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Staff Management</h2>
                <p className="text-gray-600">Manage your cleaning team</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Staff Member
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {staff.map((member) => (
                <Card key={member.id}>
                 <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                 <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                <CardDescription className="truncate">{member.email}</CardDescription>
                   </div>
                 <Badge className={`-ml-5 shrink-0 ${getStatusColor(member.status)}`}>
                  {member.status}
                   </Badge>
                 </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Phone:</span>
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jobs Completed:</span>
                        <span>{member.jobsCompleted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rating:</span>
                        <span className="flex items-center">
                          {member.rating} <Star className="h-3 w-3 text-yellow-500 ml-1" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {/* {member?.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))} */}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Customer Management</h2>
                <p className="text-gray-600">View and manage customer accounts</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Customer
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>All registered customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['John Doe', 'Alice Smith', 'Bob Brown', 'Emma Wilson', 'Mike Johnson'].map((customer, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{customer}</h3>
                          <p className="text-sm text-gray-600">customer{index + 1}@email.com</p>
                          <p className="text-sm text-gray-600">Last service: March {10 + index}, 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {Math.floor(Math.random() * 5) + 1} services
                          </Badge>
                          <Button size="sm" variant="outline">
                            View History
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Business Analytics</h2>
              <p className="text-gray-600">Track performance and growth</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-medium">$2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-medium">$9,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Year:</span>
                      <span className="font-medium">$98,500</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Growth Rate:</span>
                      <span className="font-medium">+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Regular Cleaning:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deep Cleaning:</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Move-out Cleaning:</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commercial:</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average Rating:</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jobs Completed Today:</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Satisfaction:</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers:</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operational Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Avg. Job Duration:</span>
                      <span className="font-medium">3.2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>No-shows:</span>
                      <span className="font-medium">2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cancellation Rate:</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff Utilization:</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Assignment Modal */}
        {showAssignModal && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Assign Job</CardTitle>
                <CardDescription>
                  Assign "{selectedJob.service}" to a staff member
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Available Staff</Label>
                  <div className="space-y-2">
                    {staff.filter(s => s.status === 'active').map((member) => (
                      <Button
                        key={member.id}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => assignJob(selectedJob, member
                        )}
                      >
                        <span>{member.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{member.rating}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedJob(null);
                  }}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}