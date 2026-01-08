import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  MapPin, 
  Clock,
  AlertTriangle,
  Activity,
  Loader2
} from 'lucide-react';
import { HAZARD_CONFIG, SEVERITY_CONFIG, HazardType, SeverityLevel } from '@/types/hazard';
import { useHazardReports } from '@/hooks/useHazardReports';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';

const Analysis = () => {
  const { reports, isLoading, error } = useHazardReports();

  const analytics = useMemo(() => {
    if (reports.length === 0) return null;

    // Hazard type distribution
    const hazardCounts: Record<string, number> = {};
    reports.forEach(r => {
      hazardCounts[r.hazardType] = (hazardCounts[r.hazardType] || 0) + 1;
    });

    // Severity distribution
    const severityCounts: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };
    reports.forEach(r => {
      severityCounts[r.severity] = (severityCounts[r.severity] || 0) + 1;
    });

    // Verification status
    const verificationCounts: Record<string, number> = {
      pending: 0,
      verified: 0,
      unverified: 0,
      false: 0
    };
    reports.forEach(r => {
      verificationCounts[r.verificationStatus] = (verificationCounts[r.verificationStatus] || 0) + 1;
    });

    // Time-based analysis (last 7 days vs previous 7 days)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const thisWeekReports = reports.filter(r => r.timestamp >= weekAgo);
    const lastWeekReports = reports.filter(r => r.timestamp >= twoWeeksAgo && r.timestamp < weekAgo);

    const trend = thisWeekReports.length - lastWeekReports.length;
    const trendPercentage = lastWeekReports.length > 0 
      ? ((trend / lastWeekReports.length) * 100).toFixed(0) 
      : thisWeekReports.length > 0 ? '+100' : '0';

    // Top hazard type
    const sortedHazards = Object.entries(hazardCounts).sort((a, b) => b[1] - a[1]);
    const topHazard = sortedHazards[0];

    // Critical alerts
    const criticalCount = severityCounts.critical + severityCounts.high;

    // Geographic clusters (simplified - group by rounded coordinates)
    const locationClusters: Record<string, number> = {};
    reports.forEach(r => {
      const key = `${r.latitude.toFixed(1)},${r.longitude.toFixed(1)}`;
      locationClusters[key] = (locationClusters[key] || 0) + 1;
    });
    const hotspotCount = Object.values(locationClusters).filter(c => c >= 2).length;

    return {
      hazardCounts,
      severityCounts,
      verificationCounts,
      thisWeekReports: thisWeekReports.length,
      lastWeekReports: lastWeekReports.length,
      trend,
      trendPercentage,
      topHazard,
      criticalCount,
      hotspotCount,
      totalReports: reports.length,
      sortedHazards
    };
  }, [reports]);

  return (
    <>
      <Helmet>
        <title>Analysis & Insights | OceanWatch</title>
        <meta 
          name="description" 
          content="View consolidated insights, trends, and summaries from coastal hazard data." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                Analysis & Insights
              </h1>
              <p className="text-muted-foreground">
                Consolidated data trends and patterns from all hazard reports
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
                <p className="text-destructive">Failed to load data: {error}</p>
              </Card>
            ) : !analytics || reports.length === 0 ? (
              <Card className="p-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Data Available</h3>
                <p className="text-muted-foreground">
                  Submit hazard reports to see analytics and insights
                </p>
              </Card>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reports</p>
                        <p className="text-2xl font-bold text-foreground">{analytics.totalReports}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        analytics.trend >= 0 ? "bg-destructive/10" : "bg-success/10"
                      )}>
                        {analytics.trend >= 0 ? (
                          <TrendingUp className="h-5 w-5 text-destructive" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weekly Trend</p>
                        <p className="text-2xl font-bold text-foreground">
                          {analytics.trend >= 0 ? '+' : ''}{analytics.trendPercentage}%
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Critical Alerts</p>
                        <p className="text-2xl font-bold text-foreground">{analytics.criticalCount}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Hotspots</p>
                        <p className="text-2xl font-bold text-foreground">{analytics.hotspotCount}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Hazard Type Distribution */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Hazard Type Distribution
                    </h3>
                    <div className="space-y-3">
                      {analytics.sortedHazards.map(([type, count]) => {
                        const config = HAZARD_CONFIG[type as HazardType];
                        const percentage = ((count / analytics.totalReports) * 100).toFixed(0);
                        return (
                          <div key={type} className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              config?.bgColor || 'bg-muted'
                            )}>
                              <span className="text-sm">{config?.icon || '⚠️'}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-foreground">
                                  {config?.label || type}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {count} ({percentage}%)
                                </span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={cn("h-full rounded-full", config?.bgColor || 'bg-primary')}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Severity Breakdown */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Severity Breakdown
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {(['critical', 'high', 'medium', 'low'] as SeverityLevel[]).map((level) => {
                        const count = analytics.severityCounts[level];
                        const config = SEVERITY_CONFIG[level];
                        return (
                          <div 
                            key={level} 
                            className="p-4 rounded-lg border border-border"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={cn("w-3 h-3 rounded-full", config.bgColor)} />
                              <span className="text-sm font-medium capitalize text-foreground">
                                {level}
                              </span>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{count}</p>
                            <p className="text-xs text-muted-foreground">
                              {analytics.totalReports > 0 
                                ? `${((count / analytics.totalReports) * 100).toFixed(0)}% of total`
                                : '0%'
                              }
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Verification Status */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Verification Status
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(analytics.verificationCounts).map(([status, count]) => {
                        const percentage = analytics.totalReports > 0 
                          ? ((count / analytics.totalReports) * 100).toFixed(0) 
                          : '0';
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                status === 'verified' ? 'default' : 
                                status === 'pending' ? 'secondary' : 'outline'
                              }>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{count}</span>
                              <span className="text-sm text-muted-foreground">({percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Weekly Comparison */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Weekly Comparison
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">This Week</p>
                        <p className="text-3xl font-bold text-foreground">
                          {analytics.thisWeekReports}
                        </p>
                        <p className="text-sm text-muted-foreground">reports submitted</p>
                      </div>
                      <div className="p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Previous Week</p>
                        <p className="text-3xl font-bold text-foreground">
                          {analytics.lastWeekReports}
                        </p>
                        <p className="text-sm text-muted-foreground">reports submitted</p>
                      </div>
                      {analytics.topHazard && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Most Reported Hazard</p>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              HAZARD_CONFIG[analytics.topHazard[0] as HazardType]?.bgColor || 'bg-primary'
                            )}>
                              <span>{HAZARD_CONFIG[analytics.topHazard[0] as HazardType]?.icon || '⚠️'}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {HAZARD_CONFIG[analytics.topHazard[0] as HazardType]?.label || analytics.topHazard[0]}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {analytics.topHazard[1]} reports
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Analysis;