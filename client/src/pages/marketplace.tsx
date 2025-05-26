import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Search, Filter, Star, Users, Palette, Megaphone, Handshake, Code } from "lucide-react";
import type { Service } from "@shared/schema";

const categoryIcons = {
  community: Users,
  design: Palette,
  marketing: Megaphone,
  advisory: Handshake,
  technical: Code,
  complete: Star,
};

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services", selectedCategory],
    queryFn: () => {
      const url = selectedCategory === "all" 
        ? "/api/services" 
        : `/api/services?category=${selectedCategory}`;
      return fetch(url).then(res => res.json());
    },
  });

  const filteredServices = services.filter((service: Service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      serviceId: selectedService.id,
      userId: 1, // This should come from auth context
      amount: selectedService.price,
      currency: selectedService.currency,
      requirements: formData.get('requirements') as string,
    };

    try {
      await apiRequest('POST', '/api/bookings', bookingData);
      toast({
        title: "Booking Submitted",
        description: "Your service booking has been submitted successfully!",
      });
      setIsBookingOpen(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-secondary mb-6">Service Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and book services from verified providers in our decentralized marketplace. 
              Secure payments, milestone tracking, and guaranteed results.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="community">Community Growth</SelectItem>
                  <SelectItem value="design">Design & Branding</SelectItem>
                  <SelectItem value="marketing">Marketing & PR</SelectItem>
                  <SelectItem value="advisory">Strategic Advisory</SelectItem>
                  <SelectItem value="technical">Technical Development</SelectItem>
                  <SelectItem value="complete">Complete Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service: Service) => {
                  const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons] || Star;
                  
                  return (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({Number(service.rating).toFixed(1)})</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">{service.description}</p>
                        
                        {service.features && Array.isArray(service.features) && (
                          <ul className="space-y-1">
                            {(service.features as string[]).slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-2xl font-bold text-primary">
                            {service.price} {service.currency}
                          </div>
                          <Button onClick={() => handleBookService(service)}>
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Service: {selectedService?.title}</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <div className="text-2xl font-bold text-primary">
                  {selectedService.price} {selectedService.currency}
                </div>
              </div>
              
              <div>
                <Label htmlFor="requirements">Project Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Describe your project requirements, goals, and timeline..."
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  Submit Booking
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsBookingOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
