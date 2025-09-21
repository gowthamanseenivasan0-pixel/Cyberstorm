import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Calendar, Shield, Clock, Users, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-background via-primary-light/10 to-healing/20">
        <div className="max-w-4xl mx-auto space-y-8 animate-calm-slide-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 animate-gentle-pulse">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-healing bg-clip-text text-transparent">
            Your Mental Health Matters
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional mental health support designed specifically for students. 
            Connect with counselors, get instant chat support, and take control of your wellbeing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-floating">
              <Link to="/register">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-healing" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-healing" />
              <span>24/7 Chat Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-healing" />
              <span>Licensed Counselors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Mental Health Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to support your mental health journey, available when you need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-floating transition-calm">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Chat Support</CardTitle>
                <CardDescription>Get instant help and guidance 24/7</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Our intelligent chatbot provides immediate support for stress, anxiety, study tips, and more. 
                  Available anytime you need someone to talk to.
                </p>
                <Badge variant="secondary" className="mb-2">Always Available</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-floating transition-calm">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-healing/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-healing" />
                </div>
                <CardTitle>Professional Counselors</CardTitle>
                <CardDescription>Book sessions with licensed professionals</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Connect with experienced counselors who specialize in student mental health, 
                  anxiety, depression, and academic stress management.
                </p>
                <Badge variant="secondary" className="mb-2">Expert Care</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-floating transition-calm">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Safe & Confidential</CardTitle>
                <CardDescription>Your privacy is our top priority</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  All conversations and sessions are completely confidential. Your mental health journey 
                  is private and secure with end-to-end encryption.
                </p>
                <Badge variant="secondary" className="mb-2">HIPAA Compliant</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Counselors Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Counselors</h2>
            <p className="text-xl text-muted-foreground">
              Licensed professionals specializing in student mental health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dr.Justin</h3>
                <p className="text-primary font-medium mb-2">Anxiety & Stress Management</p>
                <p className="text-sm text-muted-foreground mb-4">
                  8+ years helping students manage academic stress and anxiety disorders using cognitive behavioral therapy.
                </p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.9/5 rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-healing/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-healing" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dr. Maran</h3>
                <p className="text-healing font-medium mb-2">Depression & Mood Disorders</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert in treating depression and mood disorders with mindfulness-based interventions and therapy.
                </p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.8/5 rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dr.Happy</h3>
                <p className="text-accent-foreground font-medium mb-2">Academic Performance</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Specializes in academic stress, test anxiety, and performance pressure. Former academic advisor.
                </p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.9/5 rating</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-healing/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Take the First Step?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your mental health journey starts with a single step. Join thousands of students who have 
            found support, guidance, and healing through our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-floating">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-healing">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-healing">100%</div>
              <div className="text-sm text-muted-foreground">Confidential</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
