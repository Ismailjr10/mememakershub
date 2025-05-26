import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, User, Crown, Building, Percent, Coins, Medal, Headphones } from "lucide-react";

const membershipTiers = [
  {
    id: "basic",
    title: "Basic",
    description: "Perfect for individuals and small projects",
    price: "Free",
    icon: User,
    color: "from-gray-400 to-gray-600",
    features: [
      "Access to marketplace",
      "Basic analytics dashboard",
      "Community support",
      "Standard service booking",
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "Ideal for growing projects and teams",
    price: "0.5 ETH",
    period: "/month",
    icon: Crown,
    color: "from-primary to-blue-600",
    features: [
      "Everything in Basic",
      "15% discount on all services",
      "Advanced analytics & insights",
      "Priority support",
      "Referral commission: 5%",
      "Exclusive NFT badges",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large projects and organizations",
    price: "2 ETH",
    period: "/month",
    icon: Building,
    color: "from-accent to-purple-600",
    features: [
      "Everything in Pro",
      "25% discount on all services",
      "Dedicated account manager",
      "24/7 priority support",
      "Referral commission: 10%",
      "Custom integrations",
    ],
  },
];

const membershipBenefits = [
  {
    icon: Percent,
    title: "Service Discounts",
    description: "Save up to 25% on all services",
    color: "from-primary to-blue-600",
  },
  {
    icon: Coins,
    title: "Referral Rewards",
    description: "Earn commissions on referrals",
    color: "from-success to-green-600",
  },
  {
    icon: Medal,
    title: "NFT Badges",
    description: "Exclusive membership NFTs",
    color: "from-accent to-purple-600",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Fast-track customer service",
    color: "from-warning to-yellow-600",
  },
];

interface MembershipSectionProps {
  onSelectMembership?: (tier: string) => void;
}

export function MembershipSection({ onSelectMembership }: MembershipSectionProps) {
  const handleSelectMembership = (tier: string) => {
    if (onSelectMembership) {
      onSelectMembership(tier);
    } else {
      console.log("Select membership:", tier);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-secondary">Membership Tiers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your membership level and unlock exclusive benefits, discounts, and priority access
          </p>
        </div>
        
        {/* Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {membershipTiers.map((tier) => {
            const IconComponent = tier.icon;
            
            return (
              <Card 
                key={tier.id}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  tier.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    MOST POPULAR
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-secondary mb-2">
                    {tier.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-4xl font-bold text-secondary">
                    {tier.price}
                    {tier.period && <span className="text-lg text-gray-600">{tier.period}</span>}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => handleSelectMembership(tier.id)}
                  >
                    {tier.id === "basic" ? "Get Started" : tier.id === "enterprise" ? "Contact Sales" : "Upgrade to Pro"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Membership Benefits */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 p-8">
          <h3 className="text-2xl font-bold text-center text-secondary mb-8">Membership Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-secondary mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
