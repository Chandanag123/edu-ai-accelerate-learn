
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface QuizResult {
  id: string;
  quiz_name: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

export const useQuizResults = () => {
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchQuizResults();
    } else {
      setQuizResults([]);
      setLoading(false);
    }
  }, [user]);

  const fetchQuizResults = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Error fetching quiz results:', error);
      } else {
        setQuizResults(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveQuizResult = async (quizName: string, score: number, totalQuestions: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          quiz_name: quizName,
          score,
          total_questions: totalQuestions
        });

      if (error) {
        console.error('Error saving quiz result:', error);
        return { error };
      } else {
        await fetchQuizResults();
        return { error: null };
      }
    } catch (error) {
      console.error('Error:', error);
      return { error };
    }
  };

  return { quizResults, loading, saveQuizResult, refetch: fetchQuizResults };
};
