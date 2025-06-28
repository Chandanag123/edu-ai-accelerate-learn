
import { useState } from "react";
import { User, Trophy, Target, Calendar, Award, TrendingUp, BookOpen, Clock, Edit2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { useCourses } from "@/hooks/useCourses";
import { useQuizResults } from "@/hooks/useQuizResults";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const { profile, updateProfile } = useProfile();
  const { userProgress, courses } = useCourses();
  const { quizResults } = useQuizResults();
  const { toast } = useToast();

  const handleEditProfile = () => {
    setEditName(profile?.full_name || "");
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const { error } = await updateProfile({ full_name: editName });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      setEditingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProfile(false);
    setEditName("");
  };

  const achievements = [
    { 
      icon: "🏆", 
      title: "First Quiz", 
      description: "Complete your first quiz", 
      progress: quizResults.length > 0 ? 100 : 0,
      earned: quizResults.length > 0
    },
    { 
      icon: "⚡", 
      title: "Speed Learner", 
      description: "Complete 5 quizzes", 
      progress: Math.min((quizResults.length / 5) * 100, 100),
      earned: quizResults.length >= 5
    },
    { 
      icon: "🔥", 
      title: "Course Starter", 
      description: "Start your first course", 
      progress: userProgress.length > 0 ? 100 : 0,
      earned: userProgress.length > 0
    },
    { 
      icon: "🎯", 
      title: "High Achiever", 
      description: "Score 80%+ on a quiz", 
      progress: quizResults.some(r => (r.score / r.total_questions) >= 0.8) ? 100 : 0,
      earned: quizResults.some(r => (r.score / r.total_questions) >= 0.8)
    },
    { 
      icon: "📚", 
      title: "Knowledge Seeker", 
      description: "Start 3 different courses", 
      progress: Math.min((userProgress.length / 3) * 100, 100),
      earned: userProgress.length >= 3
    },
    { 
      icon: "💎", 
      title: "Quiz Master", 
      description: "Complete 10 quizzes", 
      progress: Math.min((quizResults.length / 10) * 100, 100),
      earned: quizResults.length >= 10
    }
  ];

  const getSubjectProgress = () => {
    const subjectMap = new Map();
    
    userProgress.forEach(progress => {
      const course = courses.find(c => c.id === progress.course_id);
      if (course) {
        if (!subjectMap.has(course.subject)) {
          subjectMap.set(course.subject, { total: 0, count: 0, courses: [] });
        }
        const subject = subjectMap.get(course.subject);
        subject.total += progress.progress;
        subject.count += 1;
        subject.courses.push({ title: course.title, progress: progress.progress });
      }
    });

    return Array.from(subjectMap.entries()).map(([subject, data]) => ({
      name: subject,
      progress: Math.round(data.total / data.count),
      courses: data.courses.length
    }));
  };

  const stats = [
    { label: "Total XP", value: quizResults.length * 50, icon: TrendingUp, color: "text-purple-400" },
    { label: "Courses Started", value: userProgress.length, icon: BookOpen, color: "text-blue-400" },
    { label: "Quizzes Taken", value: quizResults.length, icon: Target, color: "text-green-400" },
    { label: "Avg Quiz Score", value: quizResults.length > 0 ? `${Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total_questions * 100), 0) / quizResults.length)}%` : "0%", icon: Clock, color: "text-yellow-400" }
  ];

  const recentActivity = [
    ...quizResults.slice(0, 2).map(result => ({
      action: "Completed",
      item: `${result.quiz_name} Quiz`,
      time: new Date(result.completed_at).toLocaleDateString(),
      xp: "+50 XP"
    })),
    ...userProgress.slice(0, 2).map(progress => {
      const course = courses.find(c => c.id === progress.course_id);
      return {
        action: "Started",
        item: course?.title || "Course",
        time: progress.last_accessed ? new Date(progress.last_accessed).toLocaleDateString() : "Recently",
        xp: "+25 XP"
      };
    })
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
                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                {editingProfile ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white text-2xl font-bold"
                      placeholder="Enter your name"
                    />
                    <Button size="sm" onClick={handleSaveProfile} className="bg-green-500 hover:bg-green-600">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleCancelEdit} variant="ghost" className="text-gray-400">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white">{profile?.full_name || 'User'}</h2>
                    <Button size="sm" onClick={handleEditProfile} variant="ghost" className="text-gray-400 hover:text-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              <p className="text-gray-300 mb-4">{profile?.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <Badge className="bg-purple-500/20 text-purple-300 px-3 py-1">
                  Level {Math.floor(stats[0].value / 100) + 1}
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-300 px-3 py-1">
                  {achievements.filter(a => a.earned).length} Achievements
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 px-3 py-1">
                  {userProgress.filter(p => p.completed).length} Completed
                </Badge>
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
              {getSubjectProgress().length > 0 ? (
                getSubjectProgress().map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{subject.name}</h4>
                        <p className="text-gray-400 text-sm">{subject.courses} courses</p>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">{subject.progress}%</div>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">No courses started yet</p>
                  <p className="text-gray-500 text-sm">Start learning to see your progress here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { goal: "Complete 5 quizzes", progress: Math.min((quizResults.length / 5) * 100, 100), completed: quizResults.length, total: 5 },
                { goal: "Start 3 courses", progress: Math.min((userProgress.length / 3) * 100, 100), completed: userProgress.length, total: 3 },
                { goal: "Earn 500 XP points", progress: Math.min(((quizResults.length * 50) / 500) * 100, 100), completed: quizResults.length * 50, total: 500 },
                { goal: "Get 80%+ average", progress: quizResults.length > 0 ? Math.min((quizResults.reduce((sum, r) => sum + (r.score / r.total_questions * 100), 0) / quizResults.length), 100) : 0, completed: quizResults.length > 0 ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total_questions * 100), 0) / quizResults.length) : 0, total: 80 }
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
                achievement.earned ? 'ring-2 ring-yellow-500/50' : ''
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
                {achievement.earned && (
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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
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
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">No activity yet</p>
                  <p className="text-gray-500 text-sm">Start learning to see your activity here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
