import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ReportForm } from '@/components/report/ReportForm';
import { Helmet } from 'react-helmet-async';

const Report = () => {
  return (
    <>
      <Helmet>
        <title>Report a Hazard | OceanWatch</title>
        <meta 
          name="description" 
          content="Submit a hazard report to help protect your coastal community. Report tsunamis, floods, high waves, and more." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <ReportForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Report;
