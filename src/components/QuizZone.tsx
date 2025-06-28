
import { useState } from "react";
import { Trophy, Zap, Target, Clock, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const QuizZone = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Subjects", icon: "🎯" },
    { id: "math", name: "Mathematics", icon: "🧮" },
    { id: "physics", name: "Physics", icon: "⚡" },
    { id: "chemistry", name: "Chemistry", icon: "🧪" },
    { id: "biology", name: "Biology", icon: "🧬" },
  ];

  const challenges = [
    {
      id: 1,
      title: "Weekly Math Championship",
      description: "Test your algebra and calculus skills",
      participants: 1247,
      timeLeft: "2d 14h",
      difficulty: "Hard",
      reward: "500 XP",
      prize: "🏆 Gold Badge",
      category: "math"
    },
    {
      id: 2,
      title: "Physics Lightning Round",
      description: "Quick-fire questions on mechanics",
      participants: 892,
      timeLeft: "5h 23m",
      difficulty: "Medium",
      reward: "300 XP",
      prize: "⚡ Speed Badge",
      category: "physics"
    },
    {
      id: 3,
      title: "Chemistry Masters",
      description: "Organic chemistry challenge",
      participants: 654,
      timeLeft: "1d 8h",
      difficulty: "Expert",
      reward: "750 XP",
      prize: "💎 Master Badge",
      category: "chemistry"
    }
  ];

  const quickQuizzes = [
    { subject: "Trigonometry", questions: 15, time: "10 min", difficulty: "Easy", xp: 50 },
    { subject: "Thermodynamics", questions: 20, time: "15 min", difficulty: "Medium", xp: 100 },
    { subject: "Genetics", questions: 25, time: "20 min", difficulty: "Hard", xp: 150 },
    { subject: "Calculus", questions: 30, time: "25 min", difficulty: "Expert", xp: 200 },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 2840, badge: "🥇" },
    { rank: 2, name: "Maria Garcia", points: 2730, badge: "🥈" },
    { rank: 3, name: "John Smith", points: 2650, badge: "🥉" },
    { rank: 4, name: "You", points: 2580, badge: "🎯" },
    { rank: 5, name: "Sarah Wilson", points: 2490, badge: "⭐" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Quiz Zone</h2>
        <p className="text-gray-300 text-lg">Challenge yourself and compete with peers</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Trophy, label: "Total Score", value: "2,580", color: "text-yellow-400" },
          { icon: Zap, label: "Streak", value: "12 days", color: "text-purple-400" },
          { icon: Target, label: "Accuracy", value: "89%", color: "text-green-400" },
          { icon: Star, label: "Rank", value: "#4", color: "text-blue-400" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10">
              <CardContent className="p-6 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Live Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge) => (
                <div 
                  key={challenge.id}
                  className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{challenge.title}</h3>
                      <p className="text-gray-400 mb-3">{challenge.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          {challenge.participants.toLocaleString()} joined
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {challenge.timeLeft} left
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge 
                        className={`mb-2 ${
                          challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                          challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          challenge.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <div className="text-purple-400 font-semibold">{challenge.reward}</div>
                      <div className="text-yellow-400 text-sm">{challenge.prize}</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
                    Join Challenge
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Quizzes */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Quick Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickQuizzes.map((quiz, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  >
                    <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                      {quiz.subject}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>{quiz.questions} questions</span>
                      <span>{quiz.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={`text-xs ${
                          quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                          quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          quiz.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {quiz.difficulty}
                      </Badge>
                      <span className="text-purple-400 font-semibold text-sm">+{quiz.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  user.name === "You" 
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{user.badge}</span>
                  <div>
                    <div className={`font-semibold ${user.name === "You" ? "text-purple-300" : "text-white"}`}>
                      {user.name}
                    </div>
                    <div className="text-gray-400 text-sm">#{user.rank}</div>
                  </div>
                </div>
                <div className={`font-bold ${user.name === "You" ? "text-purple-300" : "text-gray-300"}`}>
                  {user.points.toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
