import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HazardTypes } from '@/components/landing/HazardTypes';
import { CallToAction } from '@/components/landing/CallToAction';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>OceanWatch - Crowdsourced Ocean Hazard Reporting Platform</title>
        <meta 
          name="description" 
          content="Report coastal hazards in real-time. Track tsunamis, storms, and floods. Help protect your community with crowdsourced ocean intelligence." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HazardTypes />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
