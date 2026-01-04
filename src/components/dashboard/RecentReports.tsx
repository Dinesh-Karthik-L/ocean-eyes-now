import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { HazardReport, HAZARD_CONFIG, SEVERITY_CONFIG } from '@/types/hazard';
import { mockReports } from '@/data/mockData';
import { cn } from '@/lib/utils';

const verificationIcon = {
  verified: { icon: CheckCircle2, class: 'text-success' },
  pending: { icon: AlertCircle, class: 'text-warning' },
  unverified: { icon: XCircle, class: 'text-muted-foreground' },
  false: { icon: XCircle, class: 'text-destructive' },
};

const timeAgo = (date: Date) => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const RecentReports = () => {
  const recentReports = mockReports.slice(0, 5);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
        <Button variant="ghost" size="sm" className="gap-1">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentReports.map((report) => {
          const config = HAZARD_CONFIG[report.hazardType];
          const severity = SEVERITY_CONFIG[report.severity];
          const verification = verificationIcon[report.verificationStatus];
          const VerificationIcon = verification.icon;

          return (
            <div
              key={report.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              {/* Hazard Icon */}
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                config.bgColor
              )}>
                <span className="text-lg">{config.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground truncate">
                    {config.label}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", severity.color)}
                  >
                    {severity.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                  {report.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {timeAgo(report.timestamp)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {report.latitude.toFixed(2)}, {report.longitude.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex-shrink-0">
                <VerificationIcon className={cn("h-5 w-5", verification.class)} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
