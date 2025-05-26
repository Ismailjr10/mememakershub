import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, BarChart3, Star, Rocket, Palette, Users } from "lucide-react";

const featuredServices = [
  {
    id: 1,
    title: "Meme Token Launch",
    description: "Complete token launch package including smart contract, website, and initial marketing push.",
    price: "$950",
    rating: 4.9,
    icon: Rocket,
    color: "from-primary to-blue-600",
  },
  {
    id: 2,
    title: "NFT Collection Design",
    description: "Custom NFT artwork and collection design with metadata generation and rarity distribution.",
    price: "$600",
    rating: 4.8,
    icon: Palette,
    color: "from-accent to-purple-600",
  },
  {
    id: 3,
    title: "Community Building",
    description: "30-day intensive community growth campaign with organic follower acquisition and engagement.",
    price: "$400",
    rating: 5.0,
    icon: Users,
    color: "from-success to-green-600",
  },
];

const marketplaceFeatures = [
  {
    icon: Search,
    title: "Browse Services",
    description: "Discover services from verified providers with ratings, reviews, and detailed portfolios.",
    color: "from-primary to-blue-600",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Pay with ETH, SOL, or stablecoins through our secure escrow system with milestone-based releases.",
    color: "from-success to-green-600",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor project progress in real-time with detailed analytics and milestone tracking.",
    color: "from-accent to-purple-600",
  },
];

interface MarketplaceSectionProps {
  onBookService?: (serviceId: number) => void;
  onViewAllServices?: () => void;
}

export function MarketplaceSection({ onBookService, onViewAllServices }: MarketplaceSectionProps) {
  const handleBookService = (serviceId: number) => {
    if (onBookService) {
      onBookService(serviceId);
    } else {
      console.log("Book service:", serviceId);
    }
  };

  const handleViewAllServices = () => {
    if (onViewAllServices) {
      onViewAllServices();
    } else {
      console.log("View all services");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-secondary">Service Marketplace</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse and book services from verified providers in our decentralized marketplace
          </p>
        </div>
        
        {/* Marketplace Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {marketplaceFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-secondary mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Featured Services */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-secondary">Featured Services</h3>
            <Button variant="outline" onClick={handleViewAllServices}>
              View All
            </Button>
          </div>
          
          {/* Service Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => {
              const IconComponent = service.icon;
              
              return (
                <Card key={service.id} className="bg-gray-50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary">{service.title}</h4>
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({service.rating})</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                      <Button 
                        size="sm"
                        onClick={() => handleBookService(service.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
