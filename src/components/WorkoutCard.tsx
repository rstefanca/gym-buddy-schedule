import { Clock, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  title: string;
  time: string;
  duration: string;
  type: string;
  instructor?: string;
  location: string;
  participants: number;
  maxParticipants: number;
  className?: string;
}

export const WorkoutCard = ({
  title,
  time,
  duration,
  type,
  instructor,
  location,
  participants,
  maxParticipants,
  className
}: WorkoutCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'strength':
        return 'bg-primary text-primary-foreground';
      case 'cardio':
        return 'bg-accent text-accent-foreground';
      case 'flexibility':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={`hover:shadow-workout transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={getTypeColor(type)}>{type}</Badge>
        </div>
        <p className="text-2xl font-bold text-primary">{time}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{duration}</span>
        </div>
        
        {instructor && (
          <div className="text-sm">
            <span className="font-medium">Instructor:</span> {instructor}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{participants}/{maxParticipants} participants</span>
        </div>
      </CardContent>
    </Card>
  );
};