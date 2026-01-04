import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="ocean-gradient rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Join Our Coastal Safety Network
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Be part of the community protecting our coastlines. Report hazards, 
              receive alerts, and help save lives during ocean emergencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button 
                  size="xl" 
                  className="gap-3 min-w-[200px] bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/map">
                <Button 
                  variant="glass" 
                  size="xl" 
                  className="gap-3 min-w-[200px] border-primary-foreground/20"
                >
                  <MapPin className="h-5 w-5" />
                  Explore Map
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-primary-foreground/20">
              <p className="text-sm text-primary-foreground/60 mb-4">
                Trusted by disaster management authorities
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/40">
                <span className="text-sm font-medium">INCOIS Compatible</span>
                <span className="text-primary-foreground/20">•</span>
                <span className="text-sm font-medium">NDRF Ready</span>
                <span className="text-primary-foreground/20">•</span>
                <span className="text-sm font-medium">State Emergency Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
