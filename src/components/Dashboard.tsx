
import { useState } from "react";
import { TrendingUp, Clock, Target, Zap, BookOpen, Star, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import { useProfile } from "@/hooks/useProfile";
import { useQuizResults } from "@/hooks/useQuizResults";

export const Dashboard = () => {
  const { courses, userProgress, updateProgress } = useCourses();
  const { profile } = useProfile();
  const { quizResults } = useQuizResults();

  const getProgressForCourse = (courseId: string) => {
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress?.progress || 0;
  };

  const getOverallProgress = () => {
    if (userProgress.length === 0) return 0;
    const totalProgress = userProgress.reduce((sum, progress) => sum + progress.progress, 0);
    return Math.round(totalProgress / userProgress.length);
  };

  const getAverageQuizScore = () => {
    if (quizResults.length === 0) return 0;
    const totalScore = quizResults.reduce((sum, result) => sum + (result.score / result.total_questions * 100), 0);
    return Math.round(totalScore / quizResults.length);
  };

  const getStudyTimeToday = () => {
    const todayProgress = userProgress.filter(p => {
      const lastAccessed = new Date(p.last_accessed || '');
      const today = new Date();
      return lastAccessed.toDateString() === today.toDateString();
    });
    return `${todayProgress.length * 30}min`;
  };

  const getCompletedCourses = () => {
    const completed = userProgress.filter(p => p.completed).length;
    return `${completed}/${courses.length}`;
  };

  const handleStartCourse = async (courseId: string) => {
    await updateProgress(courseId, 25);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="text-gray-300">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{userProgress.length}</div>
              <div className="text-sm text-gray-400">Courses Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{quizResults.length * 50}</div>
              <div className="text-sm text-gray-400">XP Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, label: "Overall Progress", value: `${getOverallProgress()}%`, color: "text-green-400" },
          { icon: Clock, label: "Study Time Today", value: getStudyTimeToday(), color: "text-blue-400" },
          { icon: Target, label: "Courses Completed", value: getCompletedCourses(), color: "text-purple-400" },
          { icon: Zap, label: "Quiz Accuracy", value: `${getAverageQuizScore()}%`, color: "text-yellow-400" },
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
        {/* Available Courses */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
              Available Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.slice(0, 4).map((course) => {
              const progress = getProgressForCourse(course.id);
              return (
                <div 
                  key={course.id} 
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{course.title}</h4>
                      <p className="text-gray-400 text-sm">{course.instructor}</p>
                      <p className="text-gray-500 text-xs mt-1">{course.subject} • {course.level}</p>
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      {course.duration}min
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-sm font-semibold">{progress}% Complete</span>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        onClick={() => handleStartCourse(course.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Quiz Results */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              Recent Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizResults.length > 0 ? (
              quizResults.slice(0, 4).map((result, index) => (
                <div 
                  key={result.id} 
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{result.quiz_name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      (result.score / result.total_questions) >= 0.8 
                        ? 'bg-green-500/20 text-green-300' 
                        : (result.score / result.total_questions) >= 0.6
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {Math.round((result.score / result.total_questions) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{result.score}/{result.total_questions} correct</span>
                    <span>{new Date(result.completed_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">No quiz results yet</p>
                <p className="text-gray-500 text-sm">Take your first quiz to see results here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
