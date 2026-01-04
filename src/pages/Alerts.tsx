import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ChevronRight,
  BellOff,
  Settings
} from 'lucide-react';
import { SEVERITY_CONFIG, HAZARD_CONFIG } from '@/types/hazard';
import { mockHotspots, mockReports } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';

const timeAgo = (date: Date) => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const Alerts = () => {
  const criticalReports = mockReports.filter(r => r.severity === 'critical' || r.severity === 'high');

  return (
    <>
      <Helmet>
        <title>Alerts & Notifications | OceanWatch</title>
        <meta 
          name="description" 
          content="Stay informed about coastal hazards in your area. Receive real-time alerts for tsunamis, storms, and floods." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Alerts & Notifications
                </h1>
                <p className="text-muted-foreground">
                  Stay informed about hazards in your monitored areas
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>

            {/* Active Hotspot Alerts */}
            <Card className="p-6 mb-6 border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Active Hotspots</h2>
                  <p className="text-sm text-muted-foreground">
                    {mockHotspots.length} areas with elevated risk
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {mockHotspots.map((hotspot) => {
                  const severity = SEVERITY_CONFIG[hotspot.severity];
                  return (
                    <div
                      key={hotspot.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-background border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full animate-pulse",
                          severity.bgColor
                        )} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              Hotspot Zone {hotspot.id.toUpperCase()}
                            </span>
                            <Badge className={cn(severity.bgColor, "text-white text-xs")}>
                              {severity.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {hotspot.latitude.toFixed(2)}, {hotspot.longitude.toFixed(2)}
                            </span>
                            <span>{hotspot.reportCount} reports</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Recent Alerts</h2>
                  <p className="text-sm text-muted-foreground">
                    Notifications from the last 24 hours
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {criticalReports.map((report) => {
                  const config = HAZARD_CONFIG[report.hazardType];
                  const severity = SEVERITY_CONFIG[report.severity];

                  return (
                    <div
                      key={report.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        config.bgColor
                      )}>
                        <span className="text-lg">{config.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">
                            {config.label} Reported
                          </span>
                          <Badge className={cn(severity.bgColor, "text-white text-xs")}>
                            {severity.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
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
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Empty State (would show when no alerts) */}
            {false && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <BellOff className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Active Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  You'll be notified when hazards are detected in your area
                </p>
                <Button variant="outline">Configure Alerts</Button>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Alerts;
