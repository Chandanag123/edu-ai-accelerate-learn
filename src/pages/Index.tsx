
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { LiveClasses } from "@/components/LiveClasses";
import { QuizZone } from "@/components/QuizZone";
import { AIAssistant } from "@/components/AIAssistant";
import { Profile } from "@/components/Profile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <Dashboard />;
      case "classes":
        return <LiveClasses />;
      case "quiz":
        return <QuizZone />;
      case "ai":
        return <AIAssistant />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === "home" && <Hero />}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
