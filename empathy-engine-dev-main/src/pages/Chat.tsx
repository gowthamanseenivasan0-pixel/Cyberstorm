import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

// Mock chatbot responses
const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    return "I understand you're feeling stressed or anxious. Here are some techniques that can help: 1) Try the 4-7-8 breathing technique, 2) Practice progressive muscle relaxation, 3) Take a short walk outside, 4) Listen to calming music. Remember, it's normal to feel this way sometimes. Would you like me to guide you through a breathing exercise?";
  }
  
  if (lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
    return "Thank you for sharing how you're feeling. Depression and sadness are serious concerns. Some things that might help: 1) Maintain a regular sleep schedule, 2) Try to get some sunlight daily, 3) Connect with friends or family, 4) Consider gentle exercise. However, if these feelings persist, I strongly encourage you to speak with a counselor. Would you like help booking an appointment?";
  }
  
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
    return "Sleep is crucial for mental health. Here are some tips for better sleep: 1) Stick to a consistent sleep schedule, 2) Avoid screens 1 hour before bed, 3) Keep your room cool and dark, 4) Try relaxation techniques before bed, 5) Avoid caffeine late in the day. Creating a calming bedtime routine can make a big difference.";
  }
  
  if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('academic')) {
    return "Academic stress is very common among students. Here's what can help: 1) Break large tasks into smaller, manageable parts, 2) Use the Pomodoro technique (25 min work, 5 min break), 3) Create a realistic study schedule, 4) Take regular breaks, 5) Practice self-compassion - you're doing your best! Remember, your worth isn't determined by grades.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to support you! I can help with stress management, study techniques, sleep hygiene, and general mental health tips. If you need more comprehensive support, our counselors are available for appointments. What specific area would you like to focus on today?";
  }
  
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're very welcome! I'm glad I could help. Remember, taking care of your mental health is an ongoing process, and it's okay to have ups and downs. Is there anything else you'd like to talk about today?";
  }
  
  return "I'm here to listen and support you. Could you tell me more about what's on your mind? I can help with stress, anxiety, sleep issues, study tips, and general mental health support. You can also book an appointment with one of our counselors if you'd prefer to talk with a human professional.";
};

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hello! I'm your mental health support bot. I'm here to listen and provide helpful resources. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto animate-calm-slide-in">
        <Card className="shadow-floating h-[calc(100vh-8rem)]">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-healing/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-healing" />
              </div>
              <div>
                <h2 className="text-xl">Mental Health Support Chat</h2>
                <p className="text-sm text-muted-foreground font-normal">
                  Safe space for mental health support • Available 24/7
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-3 animate-calm-slide-in",
                      message.isBot ? "justify-start" : "justify-end"
                    )}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 bg-healing/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-healing" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "max-w-[80%] space-y-1",
                      message.isBot ? "items-start" : "items-end"
                    )}>
                      <div className={cn(
                        "px-4 py-3 rounded-2xl transition-calm",
                        message.isBot 
                          ? "bg-muted text-foreground" 
                          : "bg-primary text-primary-foreground"
                      )}>
                        <p className="text-sm leading-relaxed">{message.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3 animate-gentle-pulse">
                    <div className="w-8 h-8 bg-healing/20 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-healing" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  disabled={!inputMessage.trim() || isTyping}
                  className="transition-calm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted transition-calm" 
                       onClick={() => setInputMessage("I'm feeling stressed about exams")}>
                  💭 Exam stress
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted transition-calm"
                       onClick={() => setInputMessage("I've been having trouble sleeping")}>
                  😴 Sleep issues
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted transition-calm"
                       onClick={() => setInputMessage("I'm feeling anxious lately")}>
                  😰 Anxiety help
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted transition-calm"
                       onClick={() => setInputMessage("I need study tips")}>
                  📚 Study help
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 This conversation is confidential. For urgent help, contact emergency services or your local crisis hotline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;