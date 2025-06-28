
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor: string;
  subject: string;
  level: string;
  duration: number;
  thumbnail_url: string | null;
  created_at: string;
}

interface UserProgress {
  id: string;
  course_id: string;
  progress: number;
  completed: boolean;
  last_accessed: string | null;
}

export const useCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user progress:', error);
      } else {
        setUserProgress(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateProgress = async (courseId: string, progress: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress,
          completed: progress >= 100,
          last_accessed: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating progress:', error);
      } else {
        await fetchUserProgress();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { courses, userProgress, loading, updateProgress, refetch: fetchCourses };
};
