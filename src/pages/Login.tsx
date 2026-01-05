import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Mail, 
  Lock, 
  User, 
  Phone,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/i18n/LanguageContext';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  const { t, language } = useLanguage();
  
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: language === 'hi' ? 'सत्यापन त्रुटि' : 'Validation Error',
          description: err.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsLoading(false);

    if (error) {
      let message = error.message;
      if (message.includes('Invalid login credentials')) {
        message = language === 'hi' 
          ? 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।'
          : 'Invalid email or password. Please try again.';
      }
      toast({
        title: language === 'hi' ? 'साइन इन विफल' : 'Sign In Failed',
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t.auth.welcomeBack,
        description: t.auth.signedInSuccess,
      });
      navigate('/');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    try {
      emailSchema.parse(registerEmail);
      passwordSchema.parse(registerPassword);
      if (!registerName.trim()) {
        throw new Error(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      }
    } catch (err) {
      toast({
        title: language === 'hi' ? 'सत्यापन त्रुटि' : 'Validation Error',
        description: err instanceof z.ZodError ? err.errors[0].message : (err as Error).message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(registerEmail, registerPassword, registerName, registerPhone);
    setIsLoading(false);

    if (error) {
      let message = error.message;
      if (message.includes('already registered')) {
        message = language === 'hi'
          ? 'यह ईमेल पहले से पंजीकृत है। कृपया साइन इन करें।'
          : 'This email is already registered. Please sign in instead.';
      }
      toast({
        title: language === 'hi' ? 'पंजीकरण विफल' : 'Registration Failed',
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t.auth.accountCreated,
        description: t.auth.welcomeMessage,
      });
      navigate('/');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.auth.signIn} | OceanWatch</title>
        <meta 
          name="description" 
          content={language === 'hi' 
            ? 'अपने तटीय क्षेत्र के लिए खतरों की रिपोर्ट करने और अलर्ट प्राप्त करने के लिए OceanWatch में साइन इन करें।'
            : 'Sign in to OceanWatch to report hazards and receive alerts for your coastal area.'
          } 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Back Link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.auth.backToHome}
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl ocean-gradient flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-foreground">
                OceanWatch
              </span>
              <span className="block text-sm text-muted-foreground">
                {language === 'hi' ? 'तटीय खतरा रिपोर्टिंग' : 'Coastal Hazard Reporting'}
              </span>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="p-6 md:p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.auth.signIn}</TabsTrigger>
                <TabsTrigger value="register">{t.auth.register}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {t.auth.signingIn}
                      </>
                    ) : (
                      t.auth.signIn
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.auth.fullName}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                        className="pl-10"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-email" 
                        type="email" 
                        placeholder="you@example.com"
                        className="pl-10"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.auth.phone}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {t.auth.creatingAccount}
                      </>
                    ) : (
                      t.auth.createAccount
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-center text-muted-foreground mt-6">
              {t.auth.termsText}{' '}
              <a href="#" className="text-primary hover:underline">{t.auth.termsOfService}</a>
              {' '}{t.auth.and}{' '}
              <a href="#" className="text-primary hover:underline">{t.auth.privacyPolicy}</a>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
