import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MembershipSection } from "@/components/membership-section";
import { useToast } from "@/hooks/use-toast";

export default function Membership() {
  const { toast } = useToast();

  const handleSelectMembership = (tier: string) => {
    toast({
      title: "Membership Selection",
      description: `You selected the ${tier} membership tier. Redirecting to payment...`,
    });
    
    // Here you would integrate with payment processing
    console.log("Selected membership tier:", tier);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-secondary mb-6">Membership Tiers</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock exclusive benefits, discounts, and priority access with our membership program. 
              Choose the tier that best fits your project's needs and budget.
            </p>
          </div>
        </section>

        <MembershipSection onSelectMembership={handleSelectMembership} />

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">How do I upgrade my membership?</h3>
                <p className="text-gray-600">You can upgrade your membership at any time from your dashboard. The upgrade takes effect immediately and you'll be charged the prorated amount.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept payments in ETH, SOL, USDC, and other major cryptocurrencies. All payments are processed securely through our blockchain integration.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Can I cancel my membership anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your membership at any time. Your benefits will remain active until the end of your current billing period.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">How do referral commissions work?</h3>
                <p className="text-gray-600">You earn a percentage of the booking value when someone uses your referral link to book a service. Commissions are paid out weekly in your preferred cryptocurrency.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
