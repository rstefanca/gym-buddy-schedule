import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { WorkoutCard } from "./WorkoutCard";
import { ScheduleWorkoutDialog } from "./ScheduleWorkoutDialog";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfToday, addDays } from "date-fns";

interface WorkoutFromDB {
  id: string;
  title: string;
  time: string;
  duration: number;
  type: string;
  instructor: string;
  location: string;
  current_participants: number;
  max_participants: number;
  description?: string;
}

interface WorkoutCardData {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: string;
  instructor: string;
  location: string;
  participants: number;
  maxParticipants: number;
  description?: string;
}

const fetchWorkoutsByDate = async (date: Date): Promise<WorkoutCardData[]> => {
  const dateString = format(date, 'yyyy-MM-dd');
  
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('date', dateString)
    .order('time', { ascending: true });

  if (error) {
    throw error;
  }

  return data?.map((workout: WorkoutFromDB) => ({
    id: workout.id,
    title: workout.title,
    time: workout.time.slice(0, 5), // Format time as HH:MM
    duration: `${workout.duration} min`,
    type: workout.type,
    instructor: workout.instructor,
    location: workout.location,
    participants: workout.current_participants,
    maxParticipants: workout.max_participants,
    description: workout.description
  })) || [];
};

export const WorkoutSchedule = () => {
  const today = startOfToday();
  const tomorrow = addDays(today, 1);

  const { data: todayWorkouts = [], isLoading: loadingToday } = useQuery({
    queryKey: ['workouts', 'today'],
    queryFn: () => fetchWorkoutsByDate(today),
  });

  const { data: tomorrowWorkouts = [], isLoading: loadingTomorrow } = useQuery({
    queryKey: ['workouts', 'tomorrow'],
    queryFn: () => fetchWorkoutsByDate(tomorrow),
  });

  const isLoading = loadingToday || loadingTomorrow;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Workout Schedule
            </h1>
            <p className="text-muted-foreground mt-1">
              Plan and track your fitness journey
            </p>
          </div>
          <ScheduleWorkoutDialog />
        </div>
        
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Workout Schedule
          </h1>
          <p className="text-muted-foreground mt-1">
            Plan and track your fitness journey
          </p>
        </div>
        <ScheduleWorkoutDialog />
      </div>

      {/* Today's Workouts */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {todayWorkouts.length > 0 ? (
            todayWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))
          ) : (
            <div className="md:col-span-2 text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No workouts scheduled for today</p>
            </div>
          )}
        </div>
      </section>

      {/* Tomorrow's Workouts */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Tomorrow's Schedule</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {tomorrowWorkouts.length > 0 ? (
            tomorrowWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))
          ) : (
            <div className="md:col-span-2 text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No workouts scheduled for tomorrow</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};