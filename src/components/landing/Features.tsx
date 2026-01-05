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
import { useLanguage } from '@/i18n/LanguageContext';

export const Features = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t.features.items.map.title,
      description: t.features.items.map.description,
      color: 'bg-hazard-waves',
    },
    {
      icon: Camera,
      title: language === 'hi' ? 'मीडिया-समृद्ध रिपोर्ट' : 'Media-Rich Reports',
      description: language === 'hi' 
        ? 'सत्यापन के लिए दृश्य साक्ष्य प्रदान करने हेतु अपनी खतरे की रिपोर्ट के साथ फ़ोटो और वीडियो सबमिट करें।'
        : 'Submit photos and videos with your hazard reports to provide visual evidence for verification.',
      color: 'bg-hazard-flood',
    },
    {
      icon: Wifi,
      title: t.features.items.offline.title,
      description: t.features.items.offline.description,
      color: 'bg-hazard-storm',
    },
    {
      icon: Radio,
      title: language === 'hi' ? 'सोशल इंटेलिजेंस' : 'Social Intelligence',
      description: language === 'hi'
        ? 'उभरते खतरों और जनता की भावना का पता लगाने के लिए सोशल मीडिया पोस्ट का AI-संचालित विश्लेषण।'
        : 'AI-powered analysis of social media posts to detect emerging hazards and public sentiment.',
      color: 'bg-hazard-damage',
    },
    {
      icon: BarChart3,
      title: language === 'hi' ? 'स्थिति डैशबोर्ड' : 'Situation Dashboard',
      description: language === 'hi'
        ? 'फ़िल्टर, रुझान और निर्यात योग्य रिपोर्ट के साथ अधिकारियों के लिए व्यापक विश्लेषण।'
        : 'Comprehensive analytics for officials with filters, trends, and exportable reports.',
      color: 'bg-hazard-tides',
    },
    {
      icon: Bell,
      title: t.features.items.alerts.title,
      description: t.features.items.alerts.description,
      color: 'bg-hazard-tsunami',
    },
    {
      icon: Globe,
      title: t.features.items.multilingual.title,
      description: t.features.items.multilingual.description,
      color: 'bg-accent',
    },
    {
      icon: Users,
      title: language === 'hi' ? 'भूमिका-आधारित पहुंच' : 'Role-Based Access',
      description: language === 'hi'
        ? 'उचित अनुमतियों के साथ नागरिकों, स्वयंसेवकों, अधिकारियों और विश्लेषकों के लिए अलग-अलग डैशबोर्ड।'
        : 'Different dashboards for citizens, volunteers, officials, and analysts with appropriate permissions.',
      color: 'bg-success',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {language === 'hi' ? 'प्लेटफ़ॉर्म सुविधाएं' : 'Platform Features'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {language === 'hi' ? (
              <>
                समुदायों को{' '}
                <span className="text-primary">रीयल-टाइम इंटेलिजेंस</span>
                {' '}से सशक्त बनाना
              </>
            ) : (
              <>
                Empowering Communities with{' '}
                <span className="text-primary">Real-Time Intelligence</span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.features.subtitle}
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
