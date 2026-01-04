import { Navbar } from '@/components/layout/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentReports } from '@/components/dashboard/RecentReports';
import { SocialFeed } from '@/components/dashboard/SocialFeed';
import { HazardChart } from '@/components/dashboard/HazardChart';
import { LocationStats } from '@/components/dashboard/LocationStats';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Radio,
  TrendingUp
} from 'lucide-react';
import { dashboardStats } from '@/data/mockData';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Situation Dashboard | OceanWatch</title>
        <meta 
          name="description" 
          content="Monitor coastal hazards in real-time. View statistics, trends, and social intelligence for disaster management." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                Situation Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time coastal hazard monitoring and intelligence
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Total Reports"
                value={dashboardStats.totalReports}
                subtitle="Last 24 hours"
                icon={FileText}
                trend={{ value: 12, isPositive: true }}
                variant="primary"
              />
              <StatsCard
                title="Active Hotspots"
                value={dashboardStats.activeHotspots}
                subtitle="Monitored zones"
                icon={AlertTriangle}
                variant="warning"
              />
              <StatsCard
                title="Verified Reports"
                value={dashboardStats.verifiedReports}
                subtitle={`${dashboardStats.pendingVerification} pending`}
                icon={CheckCircle2}
                variant="success"
              />
              <StatsCard
                title="Social Mentions"
                value={dashboardStats.socialMentions}
                subtitle="Hazard-related posts"
                icon={Radio}
                trend={{ value: 28, isPositive: true }}
                variant="default"
              />
            </div>

            {/* Critical Alert Banner */}
            {dashboardStats.criticalAlerts > 0 && (
              <div className="mb-8 p-4 rounded-xl danger-gradient text-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {dashboardStats.criticalAlerts} Critical Alert{dashboardStats.criticalAlerts > 1 ? 's' : ''} Active
                  </h3>
                  <p className="text-sm text-white/80">
                    Immediate attention required for high-severity reports
                  </p>
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <RecentReports />
                <SocialFeed />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <HazardChart />
                <LocationStats />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
