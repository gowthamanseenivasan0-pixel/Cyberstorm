import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Mail, Lock, GraduationCap, UserCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'counselor',
    age: '',
    course: '',
    specialization: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register({
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
      });
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to MindCare. Your mental health journey starts now.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Registration failed",
          description: "Please try again with different details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-calm-slide-in">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-healing/20 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-healing" />
            </div>
            <CardTitle className="text-2xl font-bold">Join MindCare</CardTitle>
            <CardDescription>
              Create your account and start your mental wellness journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <Select value={formData.role} onValueChange={(value: 'student' | 'counselor') => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="counselor">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4" />
                        <span>Counselor</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      min="16"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course of Study</Label>
                    <Input
                      id="course"
                      placeholder="e.g., Computer Science, Psychology"
                      value={formData.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                    />
                  </div>
                </>
              )}

              {formData.role === 'counselor' && (
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    placeholder="e.g., Anxiety & Stress Management"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full transition-calm" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;