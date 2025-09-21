import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, User, Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    counselorName: 'Dr.Justin',
    specialization: 'Anxiety & Stress Management',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed' as const,
  },
  {
    id: '2',
    counselorName: 'Dr.Maran',
    specialization: 'Depression & Mood Disorders',
    date: '2024-01-25',
    time: '10:30',
    status: 'pending' as const,
  },
];

const mockChatHistory = [
  {
    id: '1',
    lastMessage: 'How can I manage my exam stress?',
    lastResponse: 'Here are some effective stress management techniques...',
    timestamp: '2024-01-18 15:30',
  },
  {
    id: '2',
    lastMessage: 'I\'ve been feeling overwhelmed lately',
    lastResponse: 'It\'s completely normal to feel overwhelmed sometimes...',
    timestamp: '2024-01-17 09:15',
  },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-healing" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="secondary" className="bg-healing/20 text-healing-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-calm-slide-in">
        {/* Welcome Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Heart className="h-8 w-8 text-primary animate-gentle-pulse" />
          </div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your mental health journey continues here. Track your progress, chat with our support bot, 
            and manage your counselor appointments all in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button asChild size="lg" className="h-auto p-6 flex-col space-y-2 shadow-card">
            <Link to="/chat">
              <MessageCircle className="h-8 w-8" />
              <div className="text-center">
                <div className="font-semibold">Chat Support</div>
                <div className="text-sm opacity-80">Get instant help</div>
              </div>
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="h-auto p-6 flex-col space-y-2 shadow-card">
            <Link to="/book-appointment">
              <Calendar className="h-8 w-8" />
              <div className="text-center">
                <div className="font-semibold">Book Appointment</div>
                <div className="text-sm opacity-80">Schedule with counselor</div>
              </div>
            </Link>
          </Button>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="font-semibold">Profile</div>
              <div className="text-sm text-muted-foreground">Manage your info</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>Your scheduled counselor sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAppointments.length > 0 ? (
                mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-border rounded-lg transition-calm hover:shadow-gentle">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{appointment.counselorName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(appointment.status)}
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming appointments</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/book-appointment">Schedule your first session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Chat Sessions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-healing" />
                <span>Recent Chat Sessions</span>
              </CardTitle>
              <CardDescription>Your conversations with our support bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockChatHistory.length > 0 ? (
                mockChatHistory.map((chat) => (
                  <div key={chat.id} className="p-4 border border-border rounded-lg transition-calm hover:shadow-gentle">
                    <div className="space-y-2">
                      <p className="text-sm font-medium line-clamp-2">{chat.lastMessage}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{chat.lastResponse}</p>
                      <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No chat history yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/chat">Start your first conversation</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mental Health Tips */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Today's Mental Health Tip</CardTitle>
            <CardDescription>Small steps towards better wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gradient-to-r from-primary/10 to-healing/10 rounded-lg">
              <h3 className="font-semibold mb-2">Practice Deep Breathing</h3>
              <p className="text-muted-foreground">
                Take 5 minutes today to practice deep breathing. Inhale for 4 counts, 
                hold for 4 counts, and exhale for 6 counts. This simple technique can 
                help reduce stress and anxiety while improving focus.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;