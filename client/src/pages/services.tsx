import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ServicesSection } from "@/components/services-section";
import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();

  const handleBookService = (serviceId: string) => {
    setLocation(`/marketplace?service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-secondary mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Web3 growth solutions designed to take your meme project from concept to moon. 
              Our expert team provides end-to-end services to ensure your project's success.
            </p>
          </div>
        </section>

        <ServicesSection onBookService={handleBookService} />

        {/* Service Categories Deep Dive */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-secondary mb-16">Why Choose Our Services?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Proven Track Record</h3>
                <p className="text-gray-600">Over 500 successful projects launched with an average growth rate of 300%</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Expert Team</h3>
                <p className="text-gray-600">Industry veterans with deep experience in Web3, crypto, and viral marketing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">End-to-End Support</h3>
                <p className="text-gray-600">From initial concept to post-launch scaling, we're with you every step</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
