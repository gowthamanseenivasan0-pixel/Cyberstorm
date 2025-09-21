import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, CheckCircle, X, Phone, Video, MessageSquare, Award } from 'lucide-react';

interface Appointment {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  duration: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in-person';
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    studentName: 'CyberStorm',
    studentEmail: 'cyber.j@university.edu',
    date: '2024-01-20',
    time: '14:00',
    duration: '50 min',
    status: 'confirmed',
    type: 'video',
    notes: 'First session - anxiety management',
  },
  {
    id: '2',
    studentName: 'Gowshick',
    studentEmail: 'gowshick.chen@university.edu',
    date: '2024-01-20',
    time: '15:30',
    duration: '50 min',
    status: 'pending',
    type: 'video',
    notes: 'Follow-up session - stress management techniques',
  },
  {
    id: '3',
    studentName: 'gowtham',
    studentEmail: 'gowtham.r@university.edu',
    date: '2024-01-21',
    time: '10:00',
    duration: '50 min',
    status: 'confirmed',
    type: 'video',
    notes: 'Academic performance anxiety',
  },
  {
    id: '4',
    studentName: 'aadhi',
    studentEmail: 'aadhi.b@university.edu',
    date: '2024-01-19',
    time: '11:00',
    duration: '50 min',
    status: 'completed',
    type: 'video',
    notes: 'Session completed - provided coping strategies',
  },
];

const CounselorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const { toast } = useToast();

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: newStatus }
          : apt
      )
    );

    toast({
      title: "Appointment updated",
      description: `Appointment has been ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-healing/20 text-healing-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-muted">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === '2024-01-20');
  const upcomingAppointments = appointments.filter(apt => apt.date > '2024-01-20');
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-calm-slide-in">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Counselor Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Welcome back, {user?.name}. Manage your appointments and support students on their mental health journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Today's Sessions</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-healing" />
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">{pendingAppointments.length}</div>
              <div className="text-sm text-muted-foreground">Pending Approval</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{appointments.filter(apt => apt.status === 'completed').length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Appointment Management</CardTitle>
            <CardDescription>View and manage your student appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingAppointments.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                <TabsTrigger value="all">All Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="shadow-gentle">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{appointment.studentName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.studentEmail}</p>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{appointment.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4 mr-1" />
                              Join Session
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {pendingAppointments.length > 0 ? (
                  pendingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="shadow-gentle border-warning/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-warning" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{appointment.studentName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.studentEmail}</p>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mb-3 p-2 bg-muted/50 rounded text-sm">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirm</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            className="flex items-center space-x-1"
                          >
                            <X className="h-4 w-4" />
                            <span>Decline</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending appointments</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="shadow-gentle">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{appointment.studentName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.studentEmail}</p>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{appointment.duration}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming appointments</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="shadow-gentle">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{appointment.studentName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.studentEmail}</p>
                            </div>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{appointment.duration}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounselorDashboard;