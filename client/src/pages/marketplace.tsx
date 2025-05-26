import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Search, Star, Users, Palette, Megaphone, Code, Zap, Target } from "lucide-react";

const realServices = [
  // Meme Creation
  {
    id: 1,
    title: "Basic Meme Pack",
    description: "3 custom memes for your project. Delivery: 24–48 hours",
    price: "$30",
    category: "meme-creation",
    rating: 4.9,
    icon: Palette,
    color: "from-primary to-cyan-600",
  },
  {
    id: 2,
    title: "Standard Meme Pack",
    description: "5 custom memes with trending formats. Delivery: 24–48 hours",
    price: "$45",
    category: "meme-creation",
    rating: 4.8,
    icon: Palette,
    color: "from-primary to-cyan-600",
  },
  {
    id: 3,
    title: "Premium Meme Pack",
    description: "10 high-quality custom memes with viral potential. Delivery: 24–48 hours",
    price: "$80",
    category: "meme-creation",
    rating: 5.0,
    icon: Palette,
    color: "from-primary to-cyan-600",
  },
  // Design Services
  {
    id: 4,
    title: "Logo Design",
    description: "Professional logo design for your crypto project with multiple concepts and revisions",
    price: "$100",
    category: "design",
    rating: 4.9,
    icon: Palette,
    color: "from-accent to-pink-600",
  },
  {
    id: 5,
    title: "Banner Design",
    description: "Eye-catching banner design for social media, websites, and marketing materials",
    price: "$30",
    category: "design",
    rating: 4.7,
    icon: Palette,
    color: "from-accent to-pink-600",
  },
  // Shilling Packages
  {
    id: 6,
    title: "Basic Push",
    description: "Strategic promotion across 5 targeted groups and accounts",
    price: "$40",
    category: "shilling",
    rating: 4.6,
    icon: Megaphone,
    color: "from-warning to-yellow-600",
  },
  {
    id: 7,
    title: "Mid Push",
    description: "Comprehensive promotion across 15 groups and accounts with engagement tracking",
    price: "$100",
    category: "shilling",
    rating: 4.8,
    icon: Megaphone,
    color: "from-warning to-yellow-600",
  },
  {
    id: 8,
    title: "Aggressive Push",
    description: "Full-scale promotion across 50+ outlets with memes, tag & keyword seeding",
    price: "Custom Quote",
    category: "shilling",
    rating: 5.0,
    icon: Megaphone,
    color: "from-warning to-yellow-600",
  },
  // Community Management
  {
    id: 9,
    title: "Lite CM",
    description: "Community management coverage for 8 hours/day with basic moderation and engagement",
    price: "$80",
    category: "community",
    rating: 4.5,
    icon: Users,
    color: "from-success to-green-600",
  },
  {
    id: 10,
    title: "Full CM",
    description: "Complete 24/7 community management with dedicated team and advanced strategies",
    price: "$250",
    category: "community",
    rating: 4.9,
    icon: Users,
    color: "from-success to-green-600",
  },
  // Thread Writing
  {
    id: 11,
    title: "Single Thread",
    description: "1 professionally written thread with 5–8 engaging tweets for maximum impact",
    price: "$50",
    category: "content",
    rating: 4.7,
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 12,
    title: "Thread Bundle",
    description: "3 high-quality threads with strategic timing and engagement optimization",
    price: "$130",
    category: "content",
    rating: 4.8,
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  // Raiding Services
  {
    id: 13,
    title: "Starter Raid",
    description: "10 accounts, 3 hrs/day strategic engagement and promotion",
    price: "$25/day",
    category: "raiding",
    rating: 4.4,
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 14,
    title: "Growth Raid",
    description: "25 accounts, 6 hrs/day coordinated raids for maximum visibility",
    price: "$50/day",
    category: "raiding",
    rating: 4.6,
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 15,
    title: "Viral Push",
    description: "50 accounts, 12 hrs/day intensive raiding for viral breakthrough",
    price: "$100/day",
    category: "raiding",
    rating: 4.8,
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 16,
    title: "24H Takeover",
    description: "100 accounts, 16 hrs/day domination strategy for maximum impact",
    price: "$200/day",
    category: "raiding",
    rating: 5.0,
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  // Marketing Campaign
  {
    id: 17,
    title: "Custom Marketing Campaign",
    description: "Tailored marketing strategy and execution based on your specific needs and goals",
    price: "Custom Quote",
    category: "marketing",
    rating: 4.9,
    icon: Target,
    color: "from-indigo-500 to-indigo-600",
  },
];

const categories = [
  { value: "all", label: "All Services" },
  { value: "meme-creation", label: "Meme Creation" },
  { value: "design", label: "Design Services" },
  { value: "shilling", label: "Shilling Packages" },
  { value: "community", label: "Community Management" },
  { value: "content", label: "Thread Writing" },
  { value: "raiding", label: "Raiding Services" },
  { value: "marketing", label: "Marketing Campaign" },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const filteredServices = realServices.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (service: any) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to book services",
        variant: "destructive",
      });
      return;
    }
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;

    const formData = new FormData(e.currentTarget);
    
    toast({
      title: "Booking Submitted",
      description: `Your booking for ${selectedService.title} has been submitted! We'll contact you within 24 hours.`,
    });
    
    setIsBookingOpen(false);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Service Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional Web3 marketing services with transparent pricing. 
              Book instantly and get results within 24-48 hours.
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
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
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
                {filteredServices.map((service) => {
                  const IconComponent = service.icon;
                  
                  return (
                    <Card key={service.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-secondary">{service.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({service.rating})</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-2xl font-bold text-primary">
                            {service.price}
                          </div>
                          <Button 
                            onClick={() => handleBookService(service)}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200"
                          >
                            {service.price === "Custom Quote" ? "Get Quote" : "Book Now"}
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
                  {selectedService.price}
                </div>
              </div>
              
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="projectLink">Project Link</Label>
                <Input
                  id="projectLink"
                  name="projectLink"
                  placeholder="https://your-project.com"
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select name="serviceType" defaultValue={selectedService.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  placeholder="Enter referral code for discount"
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Project Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Describe your project requirements, goals, and timeline..."
                  required
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
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