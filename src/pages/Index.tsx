import { StatsOverview } from "@/components/StatsOverview";
import { WorkoutSchedule } from "@/components/WorkoutSchedule";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                FitSchedule
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your personal workout scheduling companion. Plan, track, and achieve your fitness goals.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Workout Schedule */}
        <WorkoutSchedule />
      </div>
    </div>
  );
};

export default Index;
