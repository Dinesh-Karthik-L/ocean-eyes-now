import { Link } from 'react-router-dom';
import { AlertTriangle, Github, Twitter, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display text-lg font-bold">
                  OceanWatch
                </span>
                <span className="block text-xs text-primary-foreground/70 -mt-1">
                  {language === 'hi' ? 'तटीय खतरा रिपोर्टिंग' : 'Coastal Hazard Reporting'}
                </span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/map" className="hover:text-primary-foreground transition-colors">
                  {language === 'hi' ? 'लाइव मैप' : 'Live Map'}
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-primary-foreground transition-colors">
                  {language === 'hi' ? 'रिपोर्ट जमा करें' : 'Submit Report'}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-foreground transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-primary-foreground transition-colors">
                  {t.nav.alerts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {language === 'hi' ? 'सुरक्षा दिशानिर्देश' : 'Safety Guidelines'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {t.footer.emergency}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {language === 'hi' ? 'INCOIS डेटा' : 'INCOIS Data'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {language === 'hi' ? 'API दस्तावेज़' : 'API Documentation'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
