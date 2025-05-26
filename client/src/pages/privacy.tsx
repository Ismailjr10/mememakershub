import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-bold text-secondary">Privacy Policy</CardTitle>
                <p className="text-gray-600 mt-2">Effective: May 26, 2025</p>
              </CardHeader>

              <CardContent className="prose prose-lg max-w-none">
                <div className="space-y-8">
                  <div>
                    <p className="text-lg text-gray-700 mb-6">
                      MemeMakers Hub respects your privacy. This Privacy Policy explains how we collect, use, and protect your data when you use our website or services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">1. Information We Collect</h3>
                    <p className="text-gray-700 mb-4">We collect:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Basic account info (email, wallet address)</li>
                      <li>Booking form data (name, project, email)</li>
                      <li>Referral code if provided</li>
                      <li>Technical info (browser type, IP, timestamps)</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      We do not collect your private wallet keys, nor do we store payment details directly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">2. Use of Information</h3>
                    <p className="text-gray-700 mb-4">We use your data to:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Deliver services you request</li>
                      <li>Contact you about your bookings</li>
                      <li>Improve platform functionality</li>
                      <li>Track referrals and usage trends</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">3. Data Storage</h3>
                    <p className="text-gray-700">
                      All data is securely stored on Google Firebase infrastructure. Firestore security rules are applied to protect against unauthorized access.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">4. Sharing of Information</h3>
                    <p className="text-gray-700 mb-4">
                      We do not sell or rent your data. We may share limited data:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>With service partners to fulfill your orders</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">5. Cookies & Analytics</h3>
                    <p className="text-gray-700">
                      We may use cookies and analytics tools to track usage and improve user experience. You can control cookie settings through your browser.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">6. Your Rights</h3>
                    <p className="text-gray-700 mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Request access to your data</li>
                      <li>Request deletion of your data</li>
                      <li>Unsubscribe from communications</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      To exercise these rights, email us at{" "}
                      <a href="mailto:mememakershub@gmail.com" className="text-primary hover:text-primary/80">
                        mememakershub@gmail.com
                      </a>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">7. Changes to this Policy</h3>
                    <p className="text-gray-700">
                      We may update this Privacy Policy from time to time. Changes will be reflected here with an updated date.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}