import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Palette, Megaphone, Users, Code, Zap, Target, Star, Crown } from "lucide-react";

const serviceCategories = [
  {
    id: "meme-creation",
    title: "Meme Creation",
    icon: Palette,
    color: "from-primary to-cyan-600",
    services: [
      { name: "Basic Pack", description: "3 memes", price: "$30", delivery: "24–48 hours" },
      { name: "Standard Pack", description: "5 memes", price: "$45", delivery: "24–48 hours" },
      { name: "Premium Pack", description: "10 memes", price: "$80", delivery: "24–48 hours" },
    ],
  },
  {
    id: "design-services",
    title: "Design Services",
    icon: Palette,
    color: "from-accent to-pink-600",
    services: [
      { name: "Logo Design", description: "Professional crypto project logo", price: "$100", delivery: "3-5 days" },
      { name: "Banner Design", description: "Social media & web banners", price: "$30", delivery: "24-48 hours" },
    ],
  },
  {
    id: "shilling-packages",
    title: "Shilling Packages",
    icon: Megaphone,
    color: "from-warning to-yellow-600",
    services: [
      { name: "Basic Push", description: "5 groups/accounts", price: "$40", delivery: "Same day" },
      { name: "Mid Push", description: "15 groups/accounts", price: "$100", delivery: "Same day" },
      { name: "Aggressive Push", description: "50+ outlets, includes memes", price: "Custom Quote", delivery: "24-48 hours" },
    ],
  },
  {
    id: "community-management",
    title: "Community Management",
    icon: Users,
    color: "from-success to-green-600",
    services: [
      { name: "Lite CM", description: "8 hrs/day coverage", price: "$80", delivery: "Daily" },
      { name: "Full CM", description: "24/7 coverage", price: "$250", delivery: "24/7" },
    ],
  },
  {
    id: "thread-writing",
    title: "Thread Writing",
    icon: Code,
    color: "from-blue-500 to-blue-600",
    services: [
      { name: "1 Thread", description: "5–8 tweets", price: "$50", delivery: "24-48 hours" },
      { name: "3 Threads Bundle", description: "Strategic timing", price: "$130", delivery: "3-5 days" },
    ],
  },
  {
    id: "raiding-services",
    title: "Raiding Services",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    services: [
      { name: "Starter Raid", description: "10 accounts, 3 hrs/day", price: "$25/day", delivery: "Daily" },
      { name: "Growth Raid", description: "25 accounts, 6 hrs/day", price: "$50/day", delivery: "Daily" },
      { name: "Viral Push", description: "50 accounts, 12 hrs/day", price: "$100/day", delivery: "Daily" },
      { name: "24H Takeover", description: "100 accounts, 16 hrs/day", price: "$200/day", delivery: "Daily" },
    ],
  },
  {
    id: "marketing-campaign",
    title: "Marketing Campaign",
    icon: Target,
    color: "from-indigo-500 to-indigo-600",
    services: [
      { name: "Custom Campaign", description: "Tailored strategy & execution", price: "Custom Quote", delivery: "2-4 weeks" },
    ],
  },
];

export default function Membership() {
  const { toast } = useToast();

  const handleSelectService = (categoryTitle: string, serviceName: string) => {
    toast({
      title: "Service Interest",
      description: `Interested in ${serviceName} from ${categoryTitle}. Redirecting to marketplace...`,
    });
  };

  const handleGetQuote = (serviceName: string) => {
    toast({
      title: "Quote Request",
      description: `Quote request for ${serviceName} submitted. We'll contact you within 24 hours.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Service Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transparent pricing for all Web3 marketing services. No hidden fees, instant booking, fast delivery.
            </p>
            
            {/* Discount Banner */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Crown className="w-6 h-6" />
                <span className="text-lg font-semibold">💡 30% discount available on 6- or 12-month packages</span>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {serviceCategories.map((category) => {
                const IconComponent = category.icon;
                
                return (
                  <Card key={category.id} className="overflow-hidden rounded-2xl shadow-lg">
                    <CardHeader className={`bg-gradient-to-r ${category.color} text-white py-8`}>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-white">{category.title}</CardTitle>
                          <p className="text-white/90">Professional services with guaranteed results</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.services.map((service, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-secondary mb-1">{service.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                <div className="text-xs text-gray-500">
                                  <span className="font-medium">Delivery:</span> {service.delivery}
                                </div>
                              </div>
                              <Badge variant="secondary" className="ml-2 shrink-0">
                                {service.price === "Custom Quote" ? "Quote" : service.price}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-xl font-bold text-primary">
                                {service.price}
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => 
                                  service.price === "Custom Quote" 
                                    ? handleGetQuote(service.name)
                                    : handleSelectService(category.title, service.name)
                                }
                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                              >
                                {service.price === "Custom Quote" ? "Get Quote" : "Book Now"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Package Deals */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">Package Deals</h2>
              <p className="text-xl text-gray-600">Save more with bundled services and long-term commitments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Package */}
              <Card className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-secondary mb-2">Starter Package</h3>
                    <p className="text-gray-600">Perfect for new projects</p>
                    <div className="text-3xl font-bold text-primary mt-4">$199</div>
                    <div className="text-sm text-gray-500">One-time</div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      5 Custom Memes
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      Logo Design
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      Basic Push Campaign
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      1 Thread
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Growth Package */}
              <Card className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border-2 border-primary">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white py-8">
                  <div className="text-center">
                    <Badge className="bg-white text-primary mb-2">Most Popular</Badge>
                    <h3 className="text-2xl font-bold text-white mb-2">Growth Package</h3>
                    <p className="text-white/90">Accelerate your project</p>
                    <div className="text-3xl font-bold text-white mt-4">$499</div>
                    <div className="text-sm text-white/80">One-time</div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      10 Custom Memes
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      Logo + Banner Design
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      Mid Push Campaign
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      3 Threads Bundle
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-2" />
                      7-day Growth Raid
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent">
                    Start Growing
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Package */}
              <Card className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-accent/10 to-purple-500/10 py-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-secondary mb-2">Enterprise</h3>
                    <p className="text-gray-600">Complete growth solution</p>
                    <div className="text-3xl font-bold text-accent mt-4">Custom</div>
                    <div className="text-sm text-gray-500">Contact us</div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      Unlimited Memes
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      Complete Design Suite
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      Aggressive Push Campaign
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      Full CM (24/7)
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      24H Takeover
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-6 border-accent text-accent hover:bg-accent hover:text-white">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">How do payments work?</h3>
                <p className="text-gray-600">All prices are in USD. We accept crypto payments (ETH, SOL, USDC) and traditional payment methods. Payment is required before work begins.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">What's included in delivery times?</h3>
                <p className="text-gray-600">Delivery times are business days from payment confirmation. Rush delivery available for additional 50% fee.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Do you offer revisions?</h3>
                <p className="text-gray-600">Yes! All services include 2 rounds of revisions. Additional revisions available at $25 per round.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">How do I get a custom quote?</h3>
                <p className="text-gray-600">Click "Get Quote" on any custom service, or contact us directly. We'll respond within 24 hours with a detailed proposal.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">What about the 30% discount?</h3>
                <p className="text-gray-600">Commit to 6+ months of recurring services and save 30%. Perfect for ongoing community management and marketing campaigns.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}