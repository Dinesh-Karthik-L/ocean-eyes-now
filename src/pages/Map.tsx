import { Navbar } from '@/components/layout/Navbar';
import { HazardMap } from '@/components/map/HazardMap';
import { Helmet } from 'react-helmet-async';

const Map = () => {
  return (
    <>
      <Helmet>
        <title>Live Hazard Map | OceanWatch</title>
        <meta 
          name="description" 
          content="View real-time ocean hazard reports on an interactive map. Track coastal dangers and hotspots in your area." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <HazardMap />
        </main>
      </div>
    </>
  );
};

export default Map;
