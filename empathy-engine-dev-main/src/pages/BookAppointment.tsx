import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, Award, CheckCircle, Star } from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  experience: string;
  availableSlots: string[];
}

const mockCounsellors: Counselor[] = [
  {
    id: '1',
    name: 'Dr.Justin',
    specialization: 'Anxiety & Stress Management',
    bio: 'Specialized in helping students manage academic stress and anxiety disorders. 8+ years of experience in cognitive behavioral therapy.',
    rating: 4.9,
    experience: '8 years',
    availableSlots: ['09:00', '10:30', '14:00', '15:30'],
  },
  {
    id: '2',
    name: 'Dr.Maran ',
    specialization: 'Depression & Mood Disorders',
    bio: 'Expert in treating depression, mood disorders, and seasonal affective disorder. Focuses on mindfulness-based interventions.',
    rating: 4.8,
    experience: '10 years',
    availableSlots: ['09:30', '11:00', '13:00', '16:00'],
  },
  {
    id: '3',
    name: 'Dr.Happy',
    specialization: 'Academic Stress & Performance',
    bio: 'Helps students overcome academic challenges, test anxiety, and performance pressure. Former academic advisor.',
    rating: 4.9,
    experience: '6 years',
    availableSlots: ['10:00', '11:30', '14:30', '16:30'],
  },
];

const BookAppointment = () => {
  const { user } = useAuth();
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleBookAppointment = async () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select a counselor, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Appointment booked successfully!",
        description: `Your appointment with ${selectedCounselor.name} is scheduled for ${selectedDate.toDateString()} at ${selectedTime}.`,
      });
      
      // Reset form
      setSelectedCounselor(null);
      setSelectedDate(undefined);
      setSelectedTime('');
      setIsBooking(false);
    }, 2000);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months ahead

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-calm-slide-in">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-healing/20 rounded-full mb-4">
            <CalendarIcon className="h-8 w-8 text-healing" />
          </div>
          <h1 className="text-3xl font-bold">Book an Appointment</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our professional counselors who specialize in student mental health. 
            Choose the counselor and time that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Counselor Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select a Counselor</h2>
            <div className="space-y-4">
              {mockCounsellors.map((counselor) => (
                <Card 
                  key={counselor.id} 
                  className={`cursor-pointer transition-calm shadow-card hover:shadow-gentle ${
                    selectedCounselor?.id === counselor.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedCounselor(counselor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{counselor.name}</h3>
                          <p className="text-primary font-medium">{counselor.specialization}</p>
                          <p className="text-muted-foreground text-sm mt-2">{counselor.bio}</p>
                        </div>
                      </div>
                      {selectedCounselor?.id === counselor.id && (
                        <CheckCircle className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{counselor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{counselor.experience} experience</span>
                        </div>
                      </div>
                      <Badge variant="outline">{counselor.availableSlots.length} slots available</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>
                  {selectedCounselor 
                    ? `Book with ${selectedCounselor.name}`
                    : 'Please select a counselor first'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCounselor ? (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Date</label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < today || date > maxDate}
                        className="rounded-md border"
                      />
                    </div>
                    
                    {selectedDate && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Available Times</label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCounselor.availableSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{slot}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {selectedDate && selectedTime && (
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <h4 className="font-medium">Appointment Summary</h4>
                        <div className="text-sm space-y-1 text-muted-foreground">
                          <p><strong>Counselor:</strong> {selectedCounselor.name}</p>
                          <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
                          <p><strong>Time:</strong> {selectedTime}</p>
                          <p><strong>Duration:</strong> 50 minutes</p>
                          <p><strong>Type:</strong> Video session</p>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full transition-calm" 
                      onClick={handleBookAppointment}
                      disabled={!selectedDate || !selectedTime || isBooking}
                    >
                      {isBooking ? 'Booking...' : 'Book Appointment'}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a counselor to see available dates and times</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Need Help Choosing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Not sure which counselor is right for you? Here's a quick guide:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Anxiety & Stress:</strong> Dr.Justin</li>
                  <li>• <strong>Depression:</strong> Dr.Maran</li>
                  <li>• <strong>Academic Issues:</strong> Dr.Happy Rodriguez</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;