import { StatsOverview } from "@/components/StatsOverview";
import { WorkoutSchedule } from "@/components/WorkoutSchedule";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, {user?.email}</h2>
          <Button variant="ghost" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

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
