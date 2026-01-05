import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle, Users, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export const Hero = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: MapPin, value: '156+', label: language === 'hi' ? 'सक्रिय रिपोर्ट' : 'Active Reports' },
    { icon: AlertTriangle, value: '3', label: language === 'hi' ? 'सक्रिय हॉटस्पॉट' : 'Active Hotspots' },
    { icon: Users, value: '2.5K+', label: language === 'hi' ? 'समुदाय सदस्य' : 'Community Members' },
    { icon: Shield, value: '89%', label: language === 'hi' ? 'सत्यापित रिपोर्ट' : 'Verified Reports' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 ocean-gradient opacity-95" />
      
      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg 
          className="absolute bottom-0 w-full h-64"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="currentColor" 
            fillOpacity="0.3"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="wave-animation"
          />
          <path 
            fill="currentColor" 
            fillOpacity="0.2"
            d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,245.3C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="wave-animation"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-accent/10 float-animation" />
        <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-accent/10 float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-accent/10 float-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm font-medium text-primary-foreground">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {language === 'hi' ? (
              <>
                तटों की रक्षा,
                <br />
                <span className="text-accent">जीवन की रक्षा</span>
              </>
            ) : (
              <>
                Protecting Coasts,
                <br />
                <span className="text-accent">Saving Lives</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/map">
              <Button variant="glass" size="xl" className="gap-3 min-w-[200px]">
                <MapPin className="h-5 w-5" />
                {t.hero.viewMap}
              </Button>
            </Link>
            <Link to="/report">
              <Button 
                size="xl" 
                className="gap-3 min-w-[200px] bg-destructive hover:bg-destructive/90"
              >
                <AlertTriangle className="h-5 w-5" />
                {t.hero.reportHazard}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-4 md:p-6 bg-primary-foreground/5 border-primary-foreground/10"
                >
                  <Icon className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-primary-foreground/60">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};
