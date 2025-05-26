import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-bold text-secondary">Terms of Service</CardTitle>
                <p className="text-gray-600 mt-2">Effective: May 26, 2025</p>
              </CardHeader>

              <CardContent className="prose prose-lg max-w-none">
                <div className="space-y-8">
                  <div>
                    <p className="text-lg text-gray-700 mb-6">
                      Welcome to MemeMakers Hub! By accessing or using our website or services, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please do not use MemeMakers Hub.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">1. Use of Services</h3>
                    <p className="text-gray-700">
                      MemeMakers Hub offers digital services including but not limited to meme creation, community management, NFT design, smart contract deployment, social media marketing, and growth advisory. You agree to use these services for lawful purposes only.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">2. User Accounts</h3>
                    <p className="text-gray-700">
                      To access certain services, you may be required to register an account. You agree to provide accurate and complete information, keep your credentials secure, and notify us immediately of any unauthorized use.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">3. Payments</h3>
                    <p className="text-gray-700">
                      All prices are listed in USD. Payments for services are made via integrated crypto wallets (ETH and SOL) or through our booking interface. All payments are non-refundable unless otherwise stated.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">4. Service Delivery</h3>
                    <p className="text-gray-700">
                      Turnaround time varies by service and is stated on each service page. While we strive to meet deadlines, delays caused by third parties, blockchain congestion, or user-side issues are not the responsibility of MemeMakers Hub.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">5. Referrals & Rewards</h3>
                    <p className="text-gray-700">
                      Referral codes are optional. Users are entitled to commissions only if referrals meet the criteria outlined in the referral program page.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">6. NFT Badges</h3>
                    <p className="text-gray-700">
                      We may issue exclusive NFT badges to users. These are non-transferable, symbolic achievements and do not represent ownership or financial rights.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">7. Limitation of Liability</h3>
                    <p className="text-gray-700">
                      MemeMakers Hub shall not be liable for any indirect, incidental, or consequential damages, including loss of profits or data, arising out of the use or inability to use our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">8. Modifications</h3>
                    <p className="text-gray-700">
                      We reserve the right to modify these Terms at any time. Updates will be posted on this page. Continued use of our services after changes constitutes acceptance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-secondary mb-4">9. Contact</h3>
                    <p className="text-gray-700">
                      For questions regarding these Terms, contact us at{" "}
                      <a href="mailto:mememakershub@gmail.com" className="text-primary hover:text-primary/80">
                        mememakershub@gmail.com
                      </a>.
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