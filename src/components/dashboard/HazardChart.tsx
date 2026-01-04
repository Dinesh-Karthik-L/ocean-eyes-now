import { Card } from '@/components/ui/card';
import { HAZARD_CONFIG, HazardType } from '@/types/hazard';
import { dashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const HazardChart = () => {
  const data = dashboardStats.hazardDistribution;
  const maxValue = Math.max(...Object.values(data));
  const sortedHazards = (Object.entries(data) as [HazardType, number][])
    .sort((a, b) => b[1] - a[1]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Hazard Distribution
      </h3>

      <div className="space-y-4">
        {sortedHazards.map(([type, count]) => {
          const config = HAZARD_CONFIG[type];
          const percentage = (count / maxValue) * 100;

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span className="font-medium text-foreground">{config.label}</span>
                </div>
                <span className="text-muted-foreground">{count} reports</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", config.bgColor)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
