import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Rocket, BarChart3, Brain, FileText } from "lucide-react";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

const keyMetrics = [
  {
    id: "users",
    title: "Total Users",
    value: "24,651",
    change: "+12.5%",
    icon: Users,
    color: "primary",
  },
  {
    id: "engagement",
    title: "Engagement Rate",
    value: "87.3%",
    change: "+8.2%",
    icon: TrendingUp,
    color: "success",
  },
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$127K",
    change: "+23.1%",
    icon: DollarSign,
    color: "accent",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "156%",
    change: "+45.7%",
    icon: Rocket,
    color: "warning",
  },
];

const chartData = [
  { day: "Mon", height: "60%" },
  { day: "Tue", height: "80%" },
  { day: "Wed", height: "45%" },
  { day: "Thu", height: "90%" },
  { day: "Fri", height: "65%" },
  { day: "Sat", height: "75%" },
  { day: "Sun", height: "55%" },
  { day: "Today", height: "100%" },
];

const userAcquisition = [
  { platform: "Twitter", icon: FaTwitter, percentage: 75, color: "primary", label: "42%" },
  { platform: "Discord", icon: FaDiscord, percentage: 60, color: "accent", label: "28%" },
  { platform: "Telegram", icon: FaTelegram, percentage: 45, color: "success", label: "18%" },
  { platform: "Direct", percentage: 30, color: "warning", label: "12%" },
];

const analyticsFeatures = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor your project's performance with live data updates and instant notifications.",
    color: "from-primary to-blue-600",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Get intelligent recommendations and predictions based on your data patterns.",
    color: "from-accent to-purple-600",
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate detailed reports and export data for further analysis and decision making.",
    color: "from-success to-green-600",
  },
];

export function AnalyticsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-secondary">Real-Time Analytics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your project's performance with comprehensive analytics and insights
          </p>
        </div>
        
        {/* Analytics Dashboard Preview */}
        <Card className="p-8 mb-16">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-secondary">Analytics Dashboard</h3>
            <div className="flex items-center space-x-4">
              <Select defaultValue="7days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">Live</span>
              </div>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric) => {
              const IconComponent = metric.icon;
              
              return (
                <Card key={metric.id} className={`bg-gradient-to-br from-${metric.color}/5 to-${metric.color}/10`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${metric.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-secondary">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.title}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg text-secondary">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div 
                        className={`w-full max-w-6 rounded-t ${
                          index % 4 === 0 ? 'bg-primary' :
                          index % 4 === 1 ? 'bg-accent' :
                          index % 4 === 2 ? 'bg-success' : 'bg-warning'
                        }`}
                        style={{ height: data.height }}
                      ></div>
                      <span className="text-xs text-gray-600">{data.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* User Acquisition */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg text-secondary">User Acquisition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userAcquisition.map((source, index) => {
                  const IconComponent = source.icon || null;
                  
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${source.color} rounded-full flex items-center justify-center`}>
                          {IconComponent ? (
                            <IconComponent className="text-white text-xs" />
                          ) : (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium">{source.platform}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${source.color} h-2 rounded-full`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{source.label}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </Card>
        
        {/* Analytics Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {analyticsFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
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
      </div>
    </section>
  );
}
