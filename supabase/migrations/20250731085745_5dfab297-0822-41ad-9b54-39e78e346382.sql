-- Create workout related tables with sample data

-- Create workout types enum
CREATE TYPE public.workout_type AS ENUM (
  'strength', 'cardio', 'hiit', 'yoga', 'pilates', 
  'flexibility', 'functional', 'crossfit'
);

-- Create workouts table
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type workout_type NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL, -- duration in minutes
  instructor TEXT NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 15,
  current_participants INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout_registrations table for user signups
CREATE TABLE public.workout_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workout_id, user_id)
);

-- Enable RLS
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_registrations ENABLE ROW LEVEL SECURITY;

-- RLS policies for workouts
CREATE POLICY "Anyone can view workouts" 
ON public.workouts 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage workouts" 
ON public.workouts 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for workout registrations
CREATE POLICY "Users can view their own registrations" 
ON public.workout_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can register for workouts" 
ON public.workout_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations" 
ON public.workout_registrations 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations" 
ON public.workout_registrations 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_workouts_updated_at
BEFORE UPDATE ON public.workouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample workout data
INSERT INTO public.workouts (title, type, date, time, duration, instructor, location, max_participants, current_participants, description) VALUES
-- Today's workouts
('Morning Strength Training', 'strength', CURRENT_DATE, '07:00', 60, 'Mike Johnson', 'Weight Room A', 12, 8, 'Start your day with an energizing strength training session focused on compound movements.'),
('HIIT Cardio Blast', 'hiit', CURRENT_DATE, '18:30', 45, 'Sarah Chen', 'Studio 1', 20, 15, 'High-intensity interval training to boost your metabolism and burn calories.'),
('Lunch Break Yoga', 'yoga', CURRENT_DATE, '12:00', 30, 'Emma Wilson', 'Studio 2', 15, 7, 'A quick yoga session perfect for your lunch break to stretch and relax.'),

-- Tomorrow's workouts
('Yoga Flow', 'yoga', CURRENT_DATE + INTERVAL '1 day', '09:00', 75, 'Emma Wilson', 'Studio 2', 15, 10, 'A flowing yoga sequence to improve flexibility and mindfulness.'),
('Powerlifting Session', 'strength', CURRENT_DATE + INTERVAL '1 day', '19:00', 90, 'Alex Rodriguez', 'Weight Room B', 8, 6, 'Advanced powerlifting session focusing on squat, bench press, and deadlift.'),
('CrossFit WOD', 'crossfit', CURRENT_DATE + INTERVAL '1 day', '17:00', 60, 'Jake Martinez', 'CrossFit Box', 12, 9, 'Workout of the Day featuring functional movements at high intensity.'),

-- Future workouts for variety
('Pilates Core', 'pilates', CURRENT_DATE + INTERVAL '2 days', '10:00', 50, 'Lisa Park', 'Studio 3', 10, 4, 'Core-focused Pilates session to strengthen your center and improve posture.'),
('Functional Training', 'functional', CURRENT_DATE + INTERVAL '2 days', '16:00', 45, 'Tom Wilson', 'Functional Area', 15, 8, 'Real-world movement patterns to improve daily life activities.'),
('Evening Cardio', 'cardio', CURRENT_DATE + INTERVAL '3 days', '19:30', 40, 'Maria Lopez', 'Cardio Zone', 25, 12, 'Low-impact cardio session perfect for all fitness levels.'),
('Flexibility & Stretch', 'flexibility', CURRENT_DATE + INTERVAL '3 days', '08:00', 30, 'David Kim', 'Studio 1', 20, 6, 'Gentle stretching session to improve flexibility and prevent injury.');

-- Update current participants with some sample registrations
-- Note: We can't add actual registrations without real user IDs, 
-- but we've set current_participants to show realistic numbers