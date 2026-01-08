import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  MapPin, 
  AlertTriangle,
  Activity,
  Loader2,
  PieChart as PieChartIcon
} from 'lucide-react';
import { HAZARD_CONFIG, SEVERITY_CONFIG, HazardType, SeverityLevel } from '@/types/hazard';
import { useHazardReports } from '@/hooks/useHazardReports';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from 'recharts';

const SEVERITY_COLORS = {
  critical: 'hsl(0, 84%, 60%)',
  high: 'hsl(20, 90%, 55%)',
  medium: 'hsl(45, 93%, 47%)',
  low: 'hsl(142, 71%, 45%)'
};

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

    // Time-based analysis (last 7 days)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const thisWeekReports = reports.filter(r => r.timestamp >= weekAgo);
    const lastWeekReports = reports.filter(r => r.timestamp >= twoWeeksAgo && r.timestamp < weekAgo);

    const trend = thisWeekReports.length - lastWeekReports.length;
    const trendPercentage = lastWeekReports.length > 0 
      ? ((trend / lastWeekReports.length) * 100).toFixed(0) 
      : thisWeekReports.length > 0 ? '+100' : '0';

    // Daily reports for line chart (last 7 days)
    const dailyData: { date: string; reports: number; critical: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const dayReports = reports.filter(r => r.timestamp >= dayStart && r.timestamp <= dayEnd);
      const criticalReports = dayReports.filter(r => r.severity === 'critical' || r.severity === 'high');
      
      dailyData.push({
        date: dateStr,
        reports: dayReports.length,
        critical: criticalReports.length
      });
    }

    // Hazard bar chart data
    const hazardChartData = Object.entries(hazardCounts).map(([type, count]) => ({
      name: HAZARD_CONFIG[type as HazardType]?.label || type,
      count,
      fill: getHazardColor(type as HazardType)
    }));

    // Severity pie chart data
    const severityChartData = Object.entries(severityCounts)
      .filter(([, count]) => count > 0)
      .map(([level, count]) => ({
        name: level.charAt(0).toUpperCase() + level.slice(1),
        value: count,
        color: SEVERITY_COLORS[level as SeverityLevel]
      }));

    // Top hazard type
    const sortedHazards = Object.entries(hazardCounts).sort((a, b) => b[1] - a[1]);
    const topHazard = sortedHazards[0];

    // Critical alerts
    const criticalCount = severityCounts.critical + severityCounts.high;

    // Geographic clusters
    const locationClusters: Record<string, number> = {};
    reports.forEach(r => {
      const key = `${r.latitude.toFixed(1)},${r.longitude.toFixed(1)}`;
      locationClusters[key] = (locationClusters[key] || 0) + 1;
    });
    const hotspotCount = Object.values(locationClusters).filter(c => c >= 2).length;

    return {
      hazardCounts,
      severityCounts,
      thisWeekReports: thisWeekReports.length,
      lastWeekReports: lastWeekReports.length,
      trend,
      trendPercentage,
      topHazard,
      criticalCount,
      hotspotCount,
      totalReports: reports.length,
      sortedHazards,
      dailyData,
      hazardChartData,
      severityChartData
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

                {/* Charts Row 1 */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Daily Reports Line Chart */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Reports Over Last 7 Days
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.dailyData}>
                          <defs>
                            <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="date" 
                            className="text-xs fill-muted-foreground"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            className="text-xs fill-muted-foreground"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="reports" 
                            stroke="hsl(var(--primary))" 
                            fill="url(#colorReports)"
                            name="All Reports"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="critical" 
                            stroke="hsl(var(--destructive))" 
                            fill="url(#colorCritical)"
                            name="Critical/High"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Severity Pie Chart */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-primary" />
                      Severity Distribution
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.severityChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.severityChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Hazard Type Bar Chart */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Hazard Type Distribution
                    </h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={analytics.hazardChartData} 
                          layout="vertical"
                          margin={{ left: 20, right: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            type="number"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={100}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            radius={[0, 4, 4, 0]}
                            fill="hsl(var(--primary))"
                          >
                            {analytics.hazardChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Weekly Comparison */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Weekly Comparison
                    </h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={[
                            { name: 'Previous Week', count: analytics.lastWeekReports },
                            { name: 'This Week', count: analytics.thisWeekReports }
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="name"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--primary))"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {analytics.topHazard && (
                      <div className="mt-4 pt-4 border-t border-border">
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

function getHazardColor(type: HazardType): string {
  const colors: Record<HazardType, string> = {
    tsunami: 'hsl(200, 80%, 50%)',
    storm_surge: 'hsl(270, 70%, 55%)',
    high_waves: 'hsl(190, 75%, 45%)',
    coastal_flooding: 'hsl(220, 70%, 55%)',
    abnormal_tides: 'hsl(260, 60%, 50%)',
    coastal_damage: 'hsl(35, 90%, 50%)'
  };
  return colors[type] || 'hsl(var(--primary))';
}

export default Analysis;