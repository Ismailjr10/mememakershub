import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Shield, Globe, CreditCard, Gift, Award, MessageSquare } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Developer Documentation</h1>
            <p className="text-xl text-neutral-700">
              Technical overview and implementation details for MemeMakers Hub platform
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Overview */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Overview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 text-lg">
                    MemeMakers Hub is a React + Firebase-powered Web3 marketing platform offering digital services 
                    for meme projects, NFT collections, DAOs, and startups.
                  </p>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Authentication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-700">Firebase Auth enabled</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Google Sign-In</Badge>
                    <Badge variant="secondary">Email/Password</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Firebase Config */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-warning" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Firebase Config</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>• <strong>Firestore:</strong> stores bookings, referrals, and admin data</li>
                    <li>• <strong>Auth:</strong> user registration, login, admin claims</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pages */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-success" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Pages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/</code>
                        <span className="text-neutral-700">Home</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/services</code>
                        <span className="text-neutral-700">Lists core offerings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/marketplace</code>
                        <span className="text-neutral-700">Interactive cards with booking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/membership</code>
                        <span className="text-neutral-700">Pricing tiers and subscription info</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/dashboard</code>
                        <span className="text-neutral-700">User's referral stats, bookings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/admin</code>
                        <span className="text-neutral-700">Task approvals, user management</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/terms</code>
                        <span className="text-neutral-700">Terms of Service</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/privacy</code>
                        <span className="text-neutral-700">Privacy Policy</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/help</code>
                        <span className="text-neutral-700">Help Center</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/contact</code>
                        <span className="text-neutral-700">Contact Us</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">/docs</code>
                        <span className="text-neutral-700">Developer Documentation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Booking Form</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-neutral-900 overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Community Growth",
  "referralCode": "abc123",
  "createdAt": "timestamp"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Payments */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Payments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-neutral-900">ETH address:</span>
                      <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">
                        0xD96870Eb59987688BcE09b2D3423a3665133B5cc
                      </code>
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-900">SOL address:</span>
                      <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm text-neutral-900">
                        9muDjFKPbyY6rvLnVAPrqCjtx5Eb4syy4WdRqb3yL8Bi
                      </code>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">MetaMask</Badge>
                    <Badge variant="secondary">Phantom</Badge>
                  </div>
                  <p className="text-neutral-700">Payment buttons trigger onClick wallet send, with toast feedback</p>
                </CardContent>
              </Card>

              {/* Referral Tracking */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Referral Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Referral code from <code className="bg-gray-100 px-1 rounded text-neutral-900">?ref=abc123</code> stored in localStorage</li>
                    <li>• Attached to booking form if user completes it</li>
                    <li>• Referral commissions tracked in <code className="bg-gray-100 px-1 rounded text-neutral-900">/referrals</code> collection in Firestore</li>
                  </ul>
                </CardContent>
              </Card>

              {/* NFT Badge */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-indigo-500" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">NFT Badge (Future)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Placeholder NFTBadge.tsx component exists</li>
                    <li>• Uses Thirdweb SDK</li>
                    <li>• Prepared for Polygon, Base, or BNB Chain</li>
                    <li>• Requires contract address to activate</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact & Support */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-orange-500" />
                    </div>
                    <CardTitle className="text-2xl text-neutral-900">Contact & Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Contact form submits to Firestore (or fallback to <a href="mailto:mememakershub@gmail.com" className="text-primary hover:text-primary/80">mememakershub@gmail.com</a>)</li>
                    <li>• Help Center is a static FAQ-style page</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}