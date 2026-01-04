import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { SEVERITY_CONFIG, SeverityLevel } from '@/types/hazard';
import { dashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const LocationStats = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Most Affected Locations
      </h3>

      <div className="space-y-3">
        {dashboardStats.locationStats.map((location, index) => {
          const severity = SEVERITY_CONFIG[location.severity];

          return (
            <div
              key={location.name}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Rank */}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {index + 1}
              </div>

              {/* Location Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{location.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {location.reports} reports
                </span>
              </div>

              {/* Severity Badge */}
              <Badge className={cn(severity.bgColor, "text-white")}>
                {severity.label}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
