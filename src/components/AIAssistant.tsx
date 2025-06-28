
import { useState } from "react";
import { Bot, Send, Camera, Mic, Image, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const chatHistory = [
    {
      type: "ai",
      content: "Hi! I'm your AI learning assistant. How can I help you today? 🤖",
      timestamp: "2 min ago"
    },
    {
      type: "user", 
      content: "Can you explain the concept of derivatives in calculus?",
      timestamp: "2 min ago"
    },
    {
      type: "ai",
      content: "Great question! A derivative represents the rate of change of a function. Think of it as the slope of a curve at any given point. \n\nFor example, if you have a function f(x) = x², its derivative f'(x) = 2x tells you how steep the curve is at any point x.\n\nWould you like me to show you some practice problems?",
      timestamp: "1 min ago"
    },
    {
      type: "user",
      content: "Yes, please provide some examples!",
      timestamp: "30 sec ago"
    }
  ];

  const quickActions = [
    { icon: Camera, label: "Scan Problem", description: "Take a photo of your math problem" },
    { icon: FileText, label: "Upload Notes", description: "Get AI insights on your study notes" },
    { icon: Image, label: "Diagram Help", description: "Analyze scientific diagrams" },
    { icon: Mic, label: "Voice Query", description: "Ask questions using your voice" }
  ];

  const suggestions = [
    "Explain quantum entanglement",
    "Solve this algebra equation",
    "What is photosynthesis?", 
    "Help with essay writing",
    "Chemical bonding types",
    "History timeline help"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">AI Learning Assistant</h2>
        <p className="text-gray-300 text-lg">Your personal tutor, available 24/7</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button 
                  key={index}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                >
                  <Icon className="h-5 w-5 mr-3 text-purple-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">{action.label}</div>
                    <div className="text-gray-400 text-xs">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center">
              <Bot className="h-6 w-6 mr-2 text-purple-400" />
              Chat with AI Tutor
              <Badge className="ml-auto bg-green-500/20 text-green-300">Online</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat History */}
            <div className="h-96 overflow-y-auto space-y-4 p-4 bg-black/20 rounded-lg border border-white/5">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    chat.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-white/10 text-gray-100 border border-white/10'
                  }`}>
                    <div className="whitespace-pre-line">{chat.content}</div>
                    <div className={`text-xs mt-2 ${
                      chat.type === 'user' ? 'text-purple-100' : 'text-gray-400'
                    }`}>
                      {chat.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
                  onClick={() => setMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your studies..."
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 pr-12 h-12 rounded-full"
                  onKeyPress={(e) => e.key === 'Enter' && message.trim() && console.log('Send message:', message)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${
                    isListening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-purple-400'
                  }`}
                  onClick={() => setIsListening(!isListening)}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full h-12 w-12 p-0"
                disabled={!message.trim()}
                onClick={() => {
                  console.log('Send message:', message);
                  setMessage('');
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center text-gray-400 text-sm">
              AI responses are generated to help with your learning. Always verify important information.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
