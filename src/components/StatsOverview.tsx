import { TrendingUp, Calendar, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "This Week",
    value: "5",
    subtitle: "workouts completed",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    title: "Next Session",
    value: "7:00 AM",
    subtitle: "Morning Strength",
    icon: Calendar,
    color: "text-accent"
  },
  {
    title: "Total Time",
    value: "4.5h",
    subtitle: "this week",
    icon: Clock,
    color: "text-primary"
  },
  {
    title: "Weekly Goal",
    value: "83%",
    subtitle: "progress",
    icon: Target,
    color: "text-accent"
  }
];

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-workout transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};