import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Heart, LogOut, MessageCircle, Calendar, Home } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border shadow-gentle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Heart className="h-6 w-6 text-healing" />
            <span>MindCare</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard" className="flex items-center space-x-1">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
                
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/chat" className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat Support</span>
                  </Link>
                </Button>
                
                {user?.role === 'student' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/book-appointment" className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Book Appointment</span>
                    </Link>
                  </Button>
                )}
                
                {user?.role === 'counselor' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/counselor-dashboard" className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>My Appointments</span>
                    </Link>
                  </Button>
                )}
                
                <span className="text-muted-foreground text-sm">
                  Welcome, {user?.name}
                </span>
                
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};