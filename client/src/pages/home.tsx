import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { MarketplaceSection } from "@/components/marketplace-section";
import { MembershipSection } from "@/components/membership-section";
import { AnalyticsSection } from "@/components/analytics-section";
import { Footer } from "@/components/footer";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleBookService = (serviceId: string | number) => {
    // Navigate to marketplace or booking page
    setLocation(`/marketplace?service=${serviceId}`);
  };

  const handleSelectMembership = (tier: string) => {
    // Navigate to membership page
    setLocation(`/membership?tier=${tier}`);
  };

  const handleViewAllServices = () => {
    setLocation('/marketplace');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection onBookService={handleBookService} />
        <MarketplaceSection 
          onBookService={handleBookService}
          onViewAllServices={handleViewAllServices}
        />
        <MembershipSection onSelectMembership={handleSelectMembership} />
        <AnalyticsSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Launch Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful projects that have used MemeMakers Hub to achieve their goals. From concept to moon, we're here to help you shine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setLocation('/auth')}
                className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Get Started Now
              </button>
              <button 
                onClick={() => setLocation('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-primary transition-all"
              >
                Book Consultation
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm">Projects Launched</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$2M+</div>
                <div className="text-sm">Total Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
