import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  CreditCard, 
  Share2, 
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye
} from "lucide-react";
import type { Booking, User } from "@shared/schema";

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: dashboardStats } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
    queryFn: () => fetch("/api/analytics/dashboard").then(res => res.json()),
  });

  const { data: allBookings = [] } = useQuery({
    queryKey: ["/api/admin/bookings"],
    queryFn: () => fetch("/api/admin/bookings").then(res => res.json()),
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/bookings/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      toast({
        title: "Booking Updated",
        description: "Booking status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    },
  });

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-secondary mb-2">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to access the admin panel.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning";
      case "approved":
      case "in_progress":
        return "bg-primary/10 text-primary";
      case "completed":
        return "bg-success/10 text-success";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const pendingBookings = allBookings.filter((b: Booking) => b.status === "pending");
  const totalRevenue = dashboardStats?.totalRevenue || "0";
  const totalUsers = dashboardStats?.totalUsers || 0;
  const totalBookings = dashboardStats?.totalBookings || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Admin Header */}
        <section className="py-8 bg-gradient-to-r from-red-500/5 to-orange-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
                <p className="text-gray-600">Manage users, bookings, and platform operations</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-primary">{totalUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <p className="text-2xl font-bold text-success">{totalBookings}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-accent">{parseFloat(totalRevenue).toFixed(4)} ETH</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pending Reviews</p>
                        <p className="text-2xl font-bold text-warning">{pendingBookings.length}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                      Pending Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pendingBookings.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">No pending bookings</p>
                    ) : (
                      <div className="space-y-3">
                        {pendingBookings.slice(0, 5).map((booking: Booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Booking #{booking.id}</p>
                              <p className="text-sm text-gray-600">{booking.amount} {booking.currency}</p>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => setActiveTab("bookings")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-success" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Project Value</span>
                      <span className="font-medium">2.5 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Users (30d)</span>
                      <span className="font-medium">+247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue Growth</span>
                      <span className="font-medium text-success">+23.4%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {allBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allBookings.map((booking: Booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">Booking #{booking.id}</h4>
                              <p className="text-sm text-gray-600">
                                User ID: {booking.userId} • Service ID: {booking.serviceId}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                              {booking.status === "pending" && (
                                <Select 
                                  onValueChange={(status) => 
                                    updateBookingMutation.mutate({ id: booking.id, status })
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Update" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="approved">Approve</SelectItem>
                                    <SelectItem value="cancelled">Cancel</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="ml-2 font-medium">{booking.amount} {booking.currency}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Created:</span>
                              <span className="ml-2">{new Date(booking.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Payment:</span>
                              <span className="ml-2">{booking.paymentTxHash ? "Confirmed" : "Pending"}</span>
                            </div>
                          </div>
                          
                          {booking.requirements && (
                            <div className="mt-3 p-3 bg-gray-50 rounded">
                              <span className="text-sm font-medium text-gray-700">Requirements:</span>
                              <p className="text-sm mt-1">{booking.requirements}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">User Management</h3>
                    <p className="text-gray-500">User management features coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-secondary mb-2">Performance Metrics</h3>
                      <p className="text-sm text-gray-600">Track platform performance and user engagement</p>
                    </div>
                    
                    <div className="text-center p-6 bg-success/5 rounded-lg">
                      <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
                      <h3 className="font-semibold text-secondary mb-2">Growth Analytics</h3>
                      <p className="text-sm text-gray-600">Monitor user acquisition and revenue growth</p>
                    </div>
                    
                    <div className="text-center p-6 bg-accent/5 rounded-lg">
                      <Share2 className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="font-semibold text-secondary mb-2">Referral Tracking</h3>
                      <p className="text-sm text-gray-600">Analyze referral program effectiveness</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
