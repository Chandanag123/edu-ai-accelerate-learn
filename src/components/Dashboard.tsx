
import { useState } from "react";
import { TrendingUp, Clock, Target, Zap, BookOpen, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState("mathematics");

  const subjects = [
    { id: "mathematics", name: "Mathematics", progress: 75, color: "from-blue-500 to-blue-600", icon: "📊" },
    { id: "physics", name: "Physics", progress: 60, color: "from-green-500 to-green-600", icon: "⚡" },
    { id: "chemistry", name: "Chemistry", progress: 85, color: "from-purple-500 to-purple-600", icon: "🧪" },
    { id: "biology", name: "Biology", progress: 70, color: "from-pink-500 to-pink-600", icon: "🌱" },
  ];

  const recommendations = [
    {
      title: "Quadratic Equations",
      subject: "Mathematics",
      duration: "15 min",
      difficulty: "Medium",
      type: "Video Lesson"
    },
    {
      title: "Newton's Laws",
      subject: "Physics", 
      duration: "20 min",
      difficulty: "Hard",
      type: "Interactive Quiz"
    },
    {
      title: "Organic Compounds",
      subject: "Chemistry",
      duration: "12 min", 
      difficulty: "Easy",
      type: "Practice Test"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 👋</h2>
            <p className="text-gray-300">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">12</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">847</div>
              <div className="text-sm text-gray-400">XP Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, label: "Overall Progress", value: "73%", color: "text-green-400" },
          { icon: Clock, label: "Study Time Today", value: "2h 30m", color: "text-blue-400" },
          { icon: Target, label: "Goals Completed", value: "8/12", color: "text-purple-400" },
          { icon: Zap, label: "Quiz Accuracy", value: "91%", color: "text-yellow-400" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Progress */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
              Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-white font-medium">{subject.name}</span>
                  </div>
                  <span className="text-purple-400 font-semibold">{subject.progress}%</span>
                </div>
                <Progress 
                  value={subject.progress} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index} 
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold">{rec.title}</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {rec.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{rec.subject}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>⏱️ {rec.duration}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      rec.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                      rec.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
