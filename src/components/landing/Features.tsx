import { 
  MapPin, 
  Camera, 
  Radio, 
  BarChart3, 
  Bell, 
  Globe,
  Wifi,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: MapPin,
    title: 'Interactive Hazard Map',
    description: 'Real-time visualization of reported hazards with color-coded pins and dynamic hotspot detection.',
    color: 'bg-hazard-waves',
  },
  {
    icon: Camera,
    title: 'Media-Rich Reports',
    description: 'Submit photos and videos with your hazard reports to provide visual evidence for verification.',
    color: 'bg-hazard-flood',
  },
  {
    icon: Wifi,
    title: 'Offline Mode',
    description: 'Report hazards even without internet. Data automatically syncs when connectivity is restored.',
    color: 'bg-hazard-storm',
  },
  {
    icon: Radio,
    title: 'Social Intelligence',
    description: 'AI-powered analysis of social media posts to detect emerging hazards and public sentiment.',
    color: 'bg-hazard-damage',
  },
  {
    icon: BarChart3,
    title: 'Situation Dashboard',
    description: 'Comprehensive analytics for officials with filters, trends, and exportable reports.',
    color: 'bg-hazard-tides',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Push notifications when new hotspots emerge or risk levels increase in your area.',
    color: 'bg-hazard-tsunami',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Report and receive alerts in English, Tamil, Telugu, or Hindi for broader accessibility.',
    color: 'bg-accent',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Different dashboards for citizens, volunteers, officials, and analysts with appropriate permissions.',
    color: 'bg-success',
  },
];

export const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Empowering Communities with{' '}
            <span className="text-primary">Real-Time Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive platform bridging the gap between satellite warnings 
            and ground-level observations for effective disaster response.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  feature.color
                )}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
