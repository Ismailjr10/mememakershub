import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Palette, Megaphone, Handshake, Code, Star, Check } from "lucide-react";

const services = [
  {
    id: "community",
    title: "Community Growth",
    description: "Build engaged communities with organic growth strategies, social media management, and influencer partnerships.",
    icon: Users,
    color: "from-primary to-blue-600",
    features: ["Social Media Management", "Community Building", "Influencer Outreach"],
    buttonColor: "primary",
  },
  {
    id: "design",
    title: "Design & Branding",
    description: "Create memorable brand identities with custom logos, NFT art, website design, and marketing materials.",
    icon: Palette,
    color: "from-accent to-purple-600",
    features: ["Logo & Brand Identity", "NFT Art Creation", "Website Design"],
    buttonColor: "accent",
  },
  {
    id: "marketing",
    title: "Marketing & PR",
    description: "Amplify your reach with strategic marketing campaigns, PR outreach, and viral content creation.",
    icon: Megaphone,
    color: "from-warning to-yellow-600",
    features: ["Viral Content Strategy", "PR & Media Outreach", "Paid Advertising"],
    buttonColor: "warning",
  },
  {
    id: "advisory",
    title: "Strategic Advisory",
    description: "Expert guidance on tokenomics, launch strategies, partnerships, and long-term growth planning.",
    icon: Handshake,
    color: "from-success to-green-600",
    features: ["Tokenomics Design", "Launch Strategy", "Partnership Development"],
    buttonColor: "success",
  },
  {
    id: "technical",
    title: "Technical Development",
    description: "Full-stack development including smart contracts, dApps, websites, and blockchain integrations.",
    icon: Code,
    color: "from-secondary to-gray-600",
    features: ["Smart Contract Development", "dApp Development", "Web3 Integration"],
    buttonColor: "secondary",
  },
  {
    id: "complete",
    title: "Complete Growth Package",
    description: "Full-service solution combining all our expertise for maximum impact and guaranteed results.",
    icon: Star,
    color: "from-primary to-accent",
    features: ["All Services Included", "Dedicated Project Manager", "24/7 Priority Support"],
    buttonColor: "primary",
    popular: true,
  },
];

interface ServicesSectionProps {
  onBookService?: (serviceId: string) => void;
}

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  const handleBookService = (serviceId: string) => {
    if (onBookService) {
      onBookService(serviceId);
    } else {
      console.log("Book service:", serviceId);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-secondary">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Web3 growth solutions tailored for meme projects and crypto communities
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <Card 
                key={service.id}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  service.popular ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    POPULAR
                  </Badge>
                )}
                
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-secondary mb-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-600">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full"
                    variant={service.popular ? "default" : "outline"}
                    onClick={() => handleBookService(service.id)}
                  >
                    {service.popular ? "Get Started" : "Book Service"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
