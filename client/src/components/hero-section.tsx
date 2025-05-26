import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Users, Bitcoin, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background with crypto-inspired patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
      <div className="absolute inset-0">
        {/* Floating crypto icons */}
        <div className="absolute top-20 left-20 animate-pulse">
          <Bitcoin className="text-warning w-16 h-16 opacity-20" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-accent font-bold">Ξ</span>
          </div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse" style={{ animationDelay: '4s' }}>
          <TrendingUp className="text-success w-8 h-8 opacity-20" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  From Concept
                </span>
                <br />
                <span className="text-secondary">to Moon.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We build, You shine. The ultimate Web3 growth platform for meme projects and crypto communities.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Users className="w-5 h-5 mr-2" />
                  Join Now
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Projects Launched</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">$2M+</div>
                <div className="text-sm text-gray-600">Volume Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50K+</div>
                <div className="text-sm text-gray-600">Community Members</div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative">
            {/* Modern Web3 dashboard illustration */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-white/90">
              {/* Mock Dashboard Interface */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-secondary">Live Analytics</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-success">Live</span>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-end justify-between p-4">
                  <div className="w-4 bg-primary h-16 rounded-t"></div>
                  <div className="w-4 bg-accent h-24 rounded-t"></div>
                  <div className="w-4 bg-success h-20 rounded-t"></div>
                  <div className="w-4 bg-primary h-28 rounded-t"></div>
                  <div className="w-4 bg-accent h-12 rounded-t"></div>
                  <div className="w-4 bg-success h-32 rounded-t"></div>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">+127%</div>
                    <div className="text-xs text-gray-600">Growth Rate</div>
                  </div>
                  <div className="bg-success/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-success">2.4K</div>
                    <div className="text-xs text-gray-600">New Users</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-warning to-orange-400 rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-success to-emerald-400 rounded-full flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
