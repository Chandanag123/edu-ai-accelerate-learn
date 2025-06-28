
import { useState } from "react";
import { Video, Users, Calendar, Clock, Play, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState("live");

  const liveClasses = [
    {
      id: 1,
      title: "Advanced Calculus - Integration Techniques",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      time: "2:00 PM - 3:30 PM",
      participants: 234,
      isLive: true,
      thumbnail: "🧮"
    },
    {
      id: 2,
      title: "Organic Chemistry - Reaction Mechanisms", 
      teacher: "Prof. Michael Chen",
      subject: "Chemistry",
      time: "3:45 PM - 5:15 PM",
      participants: 189,
      isLive: true,
      thumbnail: "🧪"
    }
  ];

  const upcomingClasses = [
    {
      id: 3,
      title: "Quantum Physics - Wave-Particle Duality",
      teacher: "Dr. Emily Watson",
      subject: "Physics", 
      date: "Tomorrow",
      time: "10:00 AM - 11:30 AM",
      enrolled: 156,
      thumbnail: "⚛️"
    },
    {
      id: 4,
      title: "Cell Biology - Mitosis & Meiosis",
      teacher: "Prof. David Rodriguez",
      subject: "Biology",
      date: "Dec 29",
      time: "1:00 PM - 2:30 PM", 
      enrolled: 203,
      thumbnail: "🧬"
    }
  ];

  const recordedClasses = [
    {
      id: 5,
      title: "Trigonometry Fundamentals",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      duration: "1h 25m",
      views: 1240,
      rating: 4.8,
      thumbnail: "📐"
    },
    {
      id: 6,
      title: "Atomic Structure Deep Dive",
      teacher: "Prof. Michael Chen", 
      subject: "Chemistry",
      duration: "2h 10m",
      views: 890,
      rating: 4.9,
      thumbnail: "🔬"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Live Classes</h2>
        <p className="text-gray-300 text-lg">Join interactive sessions with top educators</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
          {[
            { id: "live", label: "Live Now", icon: Video },
            { id: "upcoming", label: "Upcoming", icon: Calendar },
            { id: "recorded", label: "Recorded", icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
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
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "live" && liveClasses.map((classItem) => (
          <Card key={classItem.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-6xl">
                {classItem.thumbnail}
              </div>
              <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                🔴 LIVE
              </Badge>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {classItem.participants}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                {classItem.title}
              </h3>
              <p className="text-gray-400 mb-2">by {classItem.teacher}</p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                {classItem.time}
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Join Live Class
              </Button>
            </CardContent>
          </Card>
        ))}

        {activeTab === "upcoming" && upcomingClasses.map((classItem) => (
          <Card key={classItem.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center text-6xl">
                {classItem.thumbnail}
              </div>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {classItem.enrolled}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                {classItem.title}
              </h3>
              <p className="text-gray-400 mb-2">by {classItem.teacher}</p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {classItem.date} • {classItem.time}
              </div>
              <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Set Reminder
              </Button>
            </CardContent>
          </Card>
        ))}

        {activeTab === "recorded" && recordedClasses.map((classItem) => (
          <Card key={classItem.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-green-600/30 to-teal-600/30 flex items-center justify-center text-6xl">
                {classItem.thumbnail}
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="h-16 w-16 text-white" />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white text-sm">
                {classItem.duration}
              </div>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-sm flex items-center">
                <Heart className="h-3 w-3 mr-1 fill-current" />
                {classItem.rating}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-300 transition-colors">
                {classItem.title}
              </h3>
              <p className="text-gray-400 mb-2">by {classItem.teacher}</p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Play className="h-4 w-4 mr-1" />
                {classItem.views.toLocaleString()} views
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                Watch Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
