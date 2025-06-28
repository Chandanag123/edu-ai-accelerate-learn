
import { useState } from "react";
import { User, Trophy, Target, Calendar, Award, TrendingUp, BookOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const achievements = [
    { icon: "🏆", title: "Math Master", description: "Completed 50 math quizzes", progress: 100 },
    { icon: "⚡", title: "Speed Learner", description: "Fastest quiz completion", progress: 100 },
    { icon: "🔥", title: "Streak Champion", description: "15-day learning streak", progress: 75 },
    { icon: "🎯", title: "Accuracy Pro", description: "90% quiz accuracy", progress: 90 },
    { icon: "📚", title: "Knowledge Seeker", description: "Watched 100 video lessons", progress: 60 },
    { icon: "💎", title: "Premium Learner", description: "Complete 10 challenges", progress: 40 }
  ];

  const subjects = [
    { name: "Mathematics", level: 15, progress: 85, xp: 1250, color: "from-blue-500 to-blue-600" },
    { name: "Physics", level: 12, progress: 70, xp: 980, color: "from-green-500 to-green-600" },
    { name: "Chemistry", level: 18, progress: 92, xp: 1450, color: "from-purple-500 to-purple-600" },
    { name: "Biology", level: 14, progress: 78, xp: 1120, color: "from-pink-500 to-pink-600" }
  ];

  const stats = [
    { label: "Total XP", value: "4,800", icon: TrendingUp, color: "text-purple-400" },
    { label: "Classes Attended", value: "127", icon: BookOpen, color: "text-blue-400" },
    { label: "Quiz Score", value: "89%", icon: Target, color: "text-green-400" },
    { label: "Study Hours", value: "245h", icon: Clock, color: "text-yellow-400" }
  ];

  const recentActivity = [
    { action: "Completed", item: "Quadratic Equations Quiz", time: "2 hours ago", xp: "+50 XP" },
    { action: "Attended", item: "Live Physics Class", time: "1 day ago", xp: "+25 XP" },
    { action: "Achieved", item: "Math Master Badge", time: "2 days ago", xp: "+100 XP" },
    { action: "Completed", item: "Chemistry Challenge", time: "3 days ago", xp: "+75 XP" }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-md">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                AK
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Alex Kumar</h2>
              <p className="text-gray-300 mb-4">Grade 12 Science Student</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <Badge className="bg-purple-500/20 text-purple-300 px-3 py-1">Level 47</Badge>
                <Badge className="bg-yellow-500/20 text-yellow-300 px-3 py-1">Top 5%</Badge>
                <Badge className="bg-green-500/20 text-green-300 px-3 py-1">15 Day Streak</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
          {[
            { id: "overview", label: "Overview" },
            { id: "achievements", label: "Achievements" },
            { id: "activity", label: "Activity" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-6 py-3 transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
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
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{subject.name}</h4>
                      <p className="text-gray-400 text-sm">Level {subject.level} • {subject.xp} XP</p>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">{subject.progress}%</div>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-400" />
                This Week's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { goal: "Complete 5 Math quizzes", progress: 80, completed: 4, total: 5 },
                { goal: "Attend 3 live classes", progress: 67, completed: 2, total: 3 },
                { goal: "Study for 10 hours", progress: 90, completed: 9, total: 10 },
                { goal: "Solve 20 practice problems", progress: 45, completed: 9, total: 20 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{item.goal}</span>
                    <span className="text-gray-400 text-sm">{item.completed}/{item.total}</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className={`bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                achievement.progress === 100 ? 'ring-2 ring-yellow-500/50' : ''
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                <Progress value={achievement.progress} className="h-2 mb-2" />
                <div className="text-purple-400 text-sm font-semibold">
                  {achievement.progress}% Complete
                </div>
                {achievement.progress === 100 && (
                  <Badge className="mt-2 bg-yellow-500/20 text-yellow-300">Earned!</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "activity" && (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div>
                    <div className="text-white font-medium">
                      <span className="text-purple-400">{activity.action}</span> {activity.item}
                    </div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">{activity.xp}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
