import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  User, 
  Wallet, 
  BarChart3, 
  Share2, 
  Medal, 
  CreditCard, 
  Copy,
  ExternalLink,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import type { Booking, Referral } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { wallet } = useWallet();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/bookings", user?.id],
    queryFn: () => fetch(`/api/bookings?userId=${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });

  const { data: referrals = [] } = useQuery({
    queryKey: ["/api/referrals/user", user?.id],
    queryFn: () => fetch(`/api/referrals/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });

  const shareReferralMutation = useMutation({
    mutationFn: async () => {
      const referralUrl = `${window.location.origin}?ref=${user?.referralCode}`;
      await navigator.clipboard.writeText(referralUrl);
      return referralUrl;
    },
    onSuccess: () => {
      toast({
        title: "Referral Link Copied",
        description: "Your referral link has been copied to clipboard",
      });
    },
  });

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-secondary mb-2">Please Sign In</h2>
              <p className="text-gray-600">You need to be signed in to access your dashboard.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const activeBookings = bookings.filter((b: Booking) => 
    ["pending", "approved", "in_progress"].includes(b.status)
  );
  const completedBookings = bookings.filter((b: Booking) => b.status === "completed");
  const totalSpent = completedBookings.reduce((sum: number, b: Booking) => 
    sum + parseFloat(b.amount), 0
  );
  const referralEarnings = parseFloat(user.referralEarnings || "0");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Dashboard Header */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user.username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-secondary">Welcome back, {user.username}!</h1>
                  <p className="text-gray-600">
                    {user.membershipTier.charAt(0).toUpperCase() + user.membershipTier.slice(1)} Member
                    {user.isVerified && <Badge className="ml-2 bg-success text-white">Verified</Badge>}
                  </p>
                </div>
              </div>
              
              {wallet && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Connected Wallet</p>
                  <p className="font-mono text-primary">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Bookings</p>
                        <p className="text-2xl font-bold text-primary">{activeBookings.length}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-success">{totalSpent.toFixed(4)} ETH</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Referral Earnings</p>
                        <p className="text-2xl font-bold text-accent">{referralEarnings.toFixed(4)} ETH</p>
                      </div>
                      <Share2 className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">NFT Badges</p>
                        <p className="text-2xl font-bold text-warning">
                          {Array.isArray(user.nftBadges) ? user.nftBadges.length : 0}
                        </p>
                      </div>
                      <Medal className="w-8 h-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">No bookings yet</p>
                    ) : (
                      <div className="space-y-3">
                        {bookings.slice(0, 5).map((booking: Booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Booking #{booking.id}</p>
                              <p className="text-sm text-gray-600">{booking.amount} {booking.currency}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Referral Program</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Referrals</span>
                      <span className="font-medium">{user.totalReferrals || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Earnings</span>
                      <span className="font-medium">{referralEarnings.toFixed(4)} ETH</span>
                    </div>
                    <Button 
                      onClick={() => shareReferralMutation.mutate()}
                      className="w-full"
                      disabled={shareReferralMutation.isPending}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Referral Link
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings yet</h3>
                      <p className="text-gray-500">Start by exploring our marketplace</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking: Booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Booking #{booking.id}</h4>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="ml-2 font-medium">{booking.amount} {booking.currency}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Created:</span>
                              <span className="ml-2">{new Date(booking.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {booking.requirements && (
                            <div className="mt-2">
                              <span className="text-gray-600 text-sm">Requirements:</span>
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

            <TabsContent value="referrals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Your Referral Link</h3>
                    <div className="flex items-center space-x-2">
                      <Input 
                        value={`${window.location.origin}?ref=${user.referralCode}`}
                        readOnly
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => shareReferralMutation.mutate()}
                        disabled={shareReferralMutation.isPending}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {referrals.length === 0 ? (
                    <div className="text-center py-8">
                      <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No referrals yet</h3>
                      <p className="text-gray-500">Share your link to start earning commissions</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {referrals.map((referral: Referral) => (
                        <div key={referral.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Referral #{referral.id}</p>
                              <p className="text-sm text-gray-600">
                                Commission: {referral.commissionAmount} ETH ({(parseFloat(referral.commissionRate) * 100).toFixed(1)}%)
                              </p>
                            </div>
                            <Badge className={getStatusColor(referral.status)}>
                              {referral.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nfts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>NFT Badge Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  {!user.nftBadges || (Array.isArray(user.nftBadges) && user.nftBadges.length === 0) ? (
                    <div className="text-center py-8">
                      <Medal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFT badges yet</h3>
                      <p className="text-gray-500">Complete achievements to earn exclusive NFT badges</p>
                      <Button className="mt-4" disabled>
                        <Medal className="w-4 h-4 mr-2" />
                        Claim Badge (Coming Soon)
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(user.nftBadges as any[]).map((badge, index) => (
                        <div key={index} className="aspect-square bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <Medal className="w-8 h-8 text-white" />
                        </div>
                      ))}
                    </div>
                  )}
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
