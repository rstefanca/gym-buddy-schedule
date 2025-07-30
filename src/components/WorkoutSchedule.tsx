import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "./WorkoutCard";

const todayWorkouts = [
  {
    title: "Morning Strength Training",
    time: "07:00",
    duration: "60 min",
    type: "Strength",
    instructor: "Mike Johnson",
    location: "Weight Room A",
    participants: 8,
    maxParticipants: 12
  },
  {
    title: "HIIT Cardio Blast",
    time: "18:30",
    duration: "45 min",
    type: "Cardio",
    instructor: "Sarah Chen",
    location: "Studio 1",
    participants: 15,
    maxParticipants: 20
  }
];

const upcomingWorkouts = [
  {
    title: "Yoga Flow",
    time: "09:00",
    duration: "75 min",
    type: "Flexibility",
    instructor: "Emma Wilson",
    location: "Studio 2",
    participants: 10,
    maxParticipants: 15
  },
  {
    title: "Powerlifting Session",
    time: "19:00",
    duration: "90 min",
    type: "Strength",
    instructor: "Alex Rodriguez",
    location: "Weight Room B",
    participants: 6,
    maxParticipants: 8
  }
];

export const WorkoutSchedule = () => {
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
        <Button variant="workout" className="gap-2">
          <Plus className="w-4 h-4" />
          Schedule Workout
        </Button>
      </div>

      {/* Today's Workouts */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {todayWorkouts.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </section>

      {/* Upcoming Workouts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tomorrow</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingWorkouts.map((workout, index) => (
            <WorkoutCard key={index} {...workout} />
          ))}
        </div>
      </section>
    </div>
  );
};