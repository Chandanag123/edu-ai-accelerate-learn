
import { useState } from "react";
import { Trophy, Play, Clock, Target, Brain, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuizResults } from "@/hooks/useQuizResults";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuizzes = [
  {
    id: "math-basics",
    title: "Mathematics Fundamentals",
    description: "Test your basic math skills",
    difficulty: "Easy",
    duration: 15,
    questions: [
      {
        id: 1,
        question: "What is 15 + 27?",
        options: ["40", "42", "44", "46"],
        correctAnswer: 1,
        explanation: "15 + 27 = 42"
      },
      {
        id: 2,
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
        explanation: "√64 = 8 because 8 × 8 = 64"
      },
      {
        id: 3,
        question: "What is 12 × 8?",
        options: ["84", "92", "96", "104"],
        correctAnswer: 2,
        explanation: "12 × 8 = 96"
      }
    ]
  },
  {
    id: "physics-motion",
    title: "Physics: Motion & Forces",
    description: "Understanding basic physics concepts",
    difficulty: "Medium",
    duration: 20,
    questions: [
      {
        id: 1,
        question: "What is Newton's first law of motion?",
        options: [
          "F = ma",
          "An object at rest stays at rest unless acted upon by a force",
          "For every action, there is an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: 1,
        explanation: "Newton's first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force."
      },
      {
        id: 2,
        question: "What is the unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The Newton (N) is the unit of force in the International System of Units."
      }
    ]
  }
];

export const QuizZone = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { saveQuizResult } = useQuizResults();
  const { toast } = useToast();

  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(true);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === selectedQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    await saveQuizResult(selectedQuiz.title, score, selectedQuiz.questions.length);
    setShowResults(true);

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${selectedQuiz.questions.length} (${Math.round((score / selectedQuiz.questions.length) * 100)}%)`,
    });
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  if (quizStarted && selectedQuiz && !showResults) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">{selectedQuiz.title}</CardTitle>
              <Button variant="ghost" onClick={resetQuiz} className="text-gray-400 hover:text-white">
                Exit Quiz
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl text-white font-semibold mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                    onClick={() => selectAnswer(index)}
                    className={`w-full text-left justify-start p-4 h-auto transition-all duration-300 ${
                      selectedAnswers[currentQuestion] === index
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400"
                    }`}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                {currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && selectedQuiz) {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === selectedQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-2xl text-white">Quiz Complete!</CardTitle>
            <div className="text-4xl font-bold text-purple-400 mt-2">{percentage}%</div>
            <p className="text-gray-300">You scored {score} out of {selectedQuiz.questions.length} questions correctly</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedQuiz.questions.map((question: Question, index: number) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{question.question}</h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Your answer: <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                          {question.options[userAnswer] || "Not answered"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-400 mb-2">
                          Correct answer: <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-300">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="flex gap-4 pt-4">
              <Button onClick={resetQuiz} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Take Another Quiz
              </Button>
              <Button onClick={() => startQuiz(selectedQuiz)} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                Retake This Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Zone</h2>
        <p className="text-gray-300">Test your knowledge and earn points!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleQuizzes.map((quiz) => (
          <Card key={quiz.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Brain className="h-8 w-8 text-purple-400" />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                  quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              <CardTitle className="text-white">{quiz.title}</CardTitle>
              <p className="text-gray-400 text-sm">{quiz.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {quiz.duration} min
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {quiz.questions.length} questions
                  </div>
                </div>
                <Button 
                  onClick={() => startQuiz(quiz)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
