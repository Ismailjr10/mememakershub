import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { HelpCircle, MessageSquare, Book, Users } from "lucide-react";

export default function Help() {
  const [, setLocation] = useLocation();

  const faqData = [
    {
      question: "How do I book a service?",
      answer: "Simply browse our marketplace, select the service you need, and click 'Book Now'. You'll need to sign in first, then fill out the booking form with your project details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept crypto payments through MetaMask (ETH) and Phantom (SOL) wallets. All prices are listed in USD for transparency."
    },
    {
      question: "How long does service delivery take?",
      answer: "Delivery times vary by service: Meme packs (24-48 hours), Design services (24 hours to 5 days), Community management (ongoing), Raiding services (daily). Each service page shows specific delivery times."
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes! All services include 2 rounds of revisions. Additional revisions are available for $25 per round."
    },
    {
      question: "How does the referral program work?",
      answer: "Share your referral code with others. When they book services using your code, you earn commissions. Pro members earn 5% and Enterprise members earn 10%."
    },
    {
      question: "Can I get a refund?",
      answer: "All payments are generally non-refundable unless there's a service delivery failure on our end. Contact us if you have concerns about service quality."
    },
    {
      question: "What's included in the membership plans?",
      answer: "Pro Plan ($300/month) includes 15% discounts and priority support. Enterprise Plan ($1200/month) includes 25% discounts, dedicated account manager, and 24/7 support."
    },
    {
      question: "How do I connect my wallet?",
      answer: "Click the 'Connect Wallet' button in the navigation. We support MetaMask for Ethereum and Phantom for Solana. Make sure you have one of these wallets installed."
    },
    {
      question: "Do you provide custom marketing campaigns?",
      answer: "Yes! We offer fully customized marketing campaigns tailored to your project's needs. Contact us for a custom quote and strategy consultation."
    },
    {
      question: "What if I need rush delivery?",
      answer: "Rush delivery is available for most services with a 50% additional fee. Contact us before booking to confirm availability and timeline."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-secondary mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions and get the help you need.
            </p>
          </div>
        </section>

        {/* Quick Help Cards */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setLocation('/contact')}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Get personalized help from our support team within 24 hours.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setLocation('/marketplace')}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Book className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Browse Services</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Explore our full range of Web3 marketing and growth services.
                  </p>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                    View Marketplace
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-success" />
                  </div>
                  <CardTitle className="text-xl">Join Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Connect with other creators and get community support.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-success text-success hover:bg-success hover:text-white"
                    onClick={() => window.open('https://t.me/+xmr1qGCVdAc5YThk', '_blank')}
                  >
                    Join Telegram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Quick answers to the most common questions about our services.
              </p>
            </div>

            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="font-semibold text-secondary">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed ml-8">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">Getting Started Guide</h2>
              <p className="text-xl text-gray-600">
                New to MemeMakers Hub? Follow these steps to get the most out of our platform.
              </p>
            </div>

            <div className="space-y-8">
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <CardTitle className="text-xl">Create Your Account</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sign up using Google or email/password. Connect your MetaMask or Phantom wallet to enable crypto payments and access exclusive features.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <CardTitle className="text-xl">Browse Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Explore our marketplace to find the perfect services for your project. Use filters to narrow down by category, price, or delivery time.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-success text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <CardTitle className="text-xl">Book & Pay</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Fill out the booking form with your project details and pay securely using your connected wallet. Track your order progress in your dashboard.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-warning text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <CardTitle className="text-xl">Receive & Review</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Get your completed work within the specified delivery time. Request revisions if needed, and leave a review to help other users.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team is here to help you succeed. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => setLocation('/contact')}
              >
                Contact Support
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.open('https://t.me/+xmr1qGCVdAc5YThk', '_blank')}
              >
                Join Telegram Community
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}