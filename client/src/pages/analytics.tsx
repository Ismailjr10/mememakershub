import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnalyticsSection } from "@/components/analytics-section";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-secondary mb-6">Analytics Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analytics and insights to track your project's performance, 
              community growth, and ROI across all platforms and campaigns.
            </p>
          </div>
        </section>

        <AnalyticsSection />

        {/* Additional Analytics Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">Advanced Analytics Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Real-Time Monitoring</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Live user activity tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Instant alert notifications
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Performance anomaly detection
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Campaign optimization suggestions
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Predictive Insights</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    AI-powered growth predictions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Market trend analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Optimal timing recommendations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Risk assessment alerts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
