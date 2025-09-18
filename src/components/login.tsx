import React, { useState } from 'react';
import { useAuth, UserRole } from './auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { registerUser, saveAuth } from '../services/authService';
import toast from 'react-hot-toast';

export function Login() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // 🔹 Register-specific states
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };
// Handle Register
const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    setLoading(false);
    return;
  }

  try {
    // Call your register API here
    console.log("Registering:", { name, email, password });
    
    const result = await registerUser({ name, email, password });
  //  saveAuth(result);
    console.log(result)
       toast.success('Registration successful!');
     
       setActiveTab('login');
       
       // Optionally, clear registration fields
       setName('');
       setEmail('');
       setPassword('');
       setConfirmPassword('');
    
  } catch (err) {
    setError("Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const quickLogin = async (role: UserRole) => {
    const credentials = {
      customer: { email: 'customer@example.com', password: 'password' },
      staff: { email: 'staff@example.com', password: 'password' },
      admin: { email: 'admin@example.com', password: 'password' }
    };
    
    await login(credentials[role].email, credentials[role].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-pink-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-pink-600">CleanPro Manager</CardTitle>
          <CardDescription className="text-center text-blue-600">
            Professional cleaning business management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              {/* <TabsTrigger value="demo">Quick Demo</TabsTrigger> */}
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
{/*             
            <TabsContent value="demo" className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Quick access for demo purposes
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => quickLogin('customer')}
                >
                  Login as Customer
                  <Badge variant="secondary">customer@example.com</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => quickLogin('staff')}
                >
                  Login as Staff
                  <Badge variant="secondary">staff@example.com</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => quickLogin('admin')}
                >
                  Login as Admin
                  <Badge variant="secondary">admin@example.com</Badge>
                </Button>
              </div>
            </TabsContent> */}
               
               <TabsContent value="register" className="space-y-4">
  <form onSubmit={handleRegister} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type="password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>

    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}

    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? 'Creating account...' : 'Sign Up'}
    </Button>
  </form>
</TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}