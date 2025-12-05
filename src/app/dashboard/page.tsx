'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Users, Globe, ArrowUpRight, ArrowDownRight,
  Copy, Check, Clock, MousePointer, Monitor, Smartphone, Tablet,
  MapPin, ExternalLink, RefreshCw, Zap, AlertCircle, BarChart3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface DashboardData {
  projects: Array<{
    id: string;
    name: string;
    domain: string | null;
    writeKey: string;
  }>;
  stats: {
    summary: {
      totalPageViews: number;
      totalVisitors: number;
    };
    dailyData: Array<{
      date: string;
      pageViews: number;
      visitors: number;
    }>;
    topPages: Array<{ name: string; count: number }>;
    topCountries: Array<{ name: string; count: number }>;
    topBrowsers: Array<{ name: string; count: number }>;
    devices: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
  } | null;
}

const countryFlags: Record<string, string> = {
  'US': '🇺🇸', 'IN': '🇮🇳', 'UK': '🇬🇧', 'GB': '🇬🇧', 'DE': '🇩🇪', 
  'CA': '🇨🇦', 'FR': '🇫🇷', 'AU': '🇦🇺', 'JP': '🇯🇵', 'BR': '🇧🇷'
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/dashboard?days=7', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyWriteKey = () => {
    if (data?.projects[0]?.writeKey) {
      navigator.clipboard.writeText(data.projects[0].writeKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#ff003d] border-t-transparent rounded-full animate-spin" />
          <p className="text-subtle text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="border-red-200 bg-red-50 max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Error Loading Data</h3>
            <p className="text-subtle mb-4">{error}</p>
            <Button onClick={fetchDashboardData} className="bg-red-500 hover:bg-red-600">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasData = data?.stats && data.stats.summary.totalPageViews > 0;
  const writeKey = data?.projects[0]?.writeKey || '';

  // No data yet - show empty state with setup instructions
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Overview</h1>
          <p className="text-subtle text-sm">Get started with analytics</p>
        </div>

        {/* Stats Cards - All zeros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Views', icon: Eye, color: 'text-[#ff003d]' },
            { title: 'Unique Visitors', icon: Users, color: 'text-purple-500' },
            { title: 'Countries', icon: Globe, color: 'text-blue-500' },
            { title: 'Pages Tracked', icon: BarChart3, color: 'text-orange-500' },
          ].map((stat, i) => (
            <Card key={i} className="border-neutral-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-subtle">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading text-neutral-300">0</div>
                <div className="text-xs text-subtle mt-2">No data yet</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Instructions */}
        <Card className="border-[#ff003d]/20 bg-gradient-to-br from-[#ff003d]/5 to-white">
          <CardContent className="py-12 text-center">
            <Zap className="h-16 w-16 text-[#ff003d] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">Start Tracking Analytics</h3>
            <p className="text-subtle mb-6 max-w-md mx-auto">
              Add the tracking script to your website to start collecting real analytics data.
            </p>
            
            {writeKey ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-ink text-gray-100 p-4 font-mono text-sm text-left overflow-x-auto rounded-lg">
                  <pre className="whitespace-pre-wrap">{`<script defer src="${typeof window !== 'undefined' ? window.location.origin : ''}/tracker.js" 
  data-key="${writeKey}">
</script>`}</pre>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <Button 
                    onClick={copyWriteKey}
                    className="bg-black hover:bg-neutral-800"
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Script'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={fetchDashboardData}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                
                {/* Seed Sample Data for Testing */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-subtle text-sm mb-3">Or load sample data for testing:</p>
                  <Button 
                    variant="outline"
                    className="border-[#ff003d]/30 text-[#ff003d] hover:bg-[#ff003d]/10"
                    onClick={async () => {
                      const token = localStorage.getItem('token');
                      try {
                        const res = await fetch('/api/dashboard/seed', {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (res.ok) {
                          fetchDashboardData();
                        } else {
                          alert('Failed to seed data. Make sure you have a project first.');
                        }
                      } catch (e) {
                        alert('Error seeding data');
                      }
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Load Sample Data
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-subtle mb-4">First, create a project to get your tracking key.</p>
                <Button 
                  className="bg-[#ff003d] hover:bg-[#ff4d8d]"
                  onClick={() => window.location.href = '/dashboard/projects'}
                >
                  Create Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Has real data - show it
  const { stats, projects } = data!;
  const totalViews = stats!.summary.totalPageViews;
  const totalVisitors = stats!.summary.totalVisitors;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-heading">Overview</h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-lg text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-subtle text-sm">{projects[0]?.name || 'All Projects'} • Last 7 days</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface border border-neutral-200 p-2 pl-3 hover:border-neutral-300 transition-colors">
            <code className="text-xs text-subtle font-mono truncate max-w-[200px]">{writeKey}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 hover:bg-neutral-200 transition-all"
              onClick={copyWriteKey}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-subtle" />}
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg border-[#ff003d]/30 text-[#ff003d] hover:bg-[#ff003d]/10 transition-all"
            onClick={async () => {
              const token = localStorage.getItem('token');
              try {
                await fetch('/api/dashboard/sync', {
                  method: 'POST',
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchDashboardData();
              } catch (e) {
                console.error('Sync failed:', e);
              }
            }}
            title="Sync events from MongoDB"
          >
            <Zap className="h-4 w-4 mr-1" />
            Sync
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg border-neutral-200 hover:bg-surface transition-all hover:scale-[1.02]"
            onClick={fetchDashboardData}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards - Real Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 group cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-subtle">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-[#ff003d] group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-xs text-subtle mt-2">Last 7 days</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 group cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-subtle">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {totalVisitors.toLocaleString()}
            </div>
            <div className="text-xs text-subtle mt-2">Last 7 days</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 group cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-subtle">Countries</CardTitle>
            <Globe className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {stats!.topCountries.length}
            </div>
            <div className="text-xs text-subtle mt-2">Unique locations</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 group cursor-default">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-subtle">Pages Tracked</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {stats!.topPages.length}
            </div>
            <div className="text-xs text-subtle mt-2">Unique pages</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg">Traffic Overview</CardTitle>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ff003d]" />
                Page Views
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ff4d8d]" />
                Visitors
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px]">
            {stats!.dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats!.dailyData}>
                  <defs>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff003d" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff003d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d8d" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff4d8d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e5e5',
                      borderRadius: '0px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="pageViews" stroke="#ff003d" strokeWidth={2} fill="url(#colorPageViews)" />
                  <Area type="monotone" dataKey="visitors" stroke="#ff4d8d" strokeWidth={2} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-subtle">
                No chart data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-neutral-100">
            <CardTitle className="font-heading text-lg">Top Pages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {stats!.topPages.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {stats!.topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-subtle text-sm font-mono w-5">{i + 1}</span>
                      <code className="text-sm text-ink bg-surface px-2 py-0.5 group-hover:bg-neutral-200 transition-colors truncate max-w-[200px]">
                        {page.name}
                      </code>
                    </div>
                    <span className="font-bold text-sm">{page.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-subtle">No page data</div>
            )}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-neutral-100">
            <CardTitle className="font-heading text-lg">Top Countries</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {stats!.topCountries.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {stats!.topCountries.slice(0, 5).map((country, i) => {
                  const total = stats!.topCountries.reduce((a, b) => a + b.count, 0);
                  const percentage = Math.round((country.count / total) * 100);
                  return (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-surface transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {countryFlags[country.name] || '🌍'}
                        </span>
                        <span className="font-medium text-sm">{country.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-2 bg-surface overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-sm w-16 text-right">{country.count.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-subtle">No country data</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Devices - Real data */}
      <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-neutral-100">
          <CardTitle className="font-heading text-lg">Devices</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Desktop', value: stats!.devices.desktop, icon: Monitor },
              { name: 'Mobile', value: stats!.devices.mobile, icon: Smartphone },
              { name: 'Tablet', value: stats!.devices.tablet, icon: Tablet },
            ].map((device, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface hover:bg-surface transition-colors group cursor-default">
                <div className="w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center group-hover:border-[#ff003d]/30 transition-colors">
                  <device.icon className="h-6 w-6 text-subtle group-hover:text-[#ff003d] transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{device.name}</span>
                    <span className="font-bold text-lg">{device.value}%</span>
                  </div>
                  <div className="h-2 bg-neutral-200 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                      style={{ width: `${device.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Script Installation */}
      <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-neutral-100">
          <CardTitle className="font-heading text-lg">Install Tracking Script</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-subtle mb-4 text-sm">
            Add this script to your website's <code className="bg-surface px-1.5 py-0.5 text-xs">&lt;head&gt;</code> tag:
          </p>
          <div className="bg-ink text-gray-100 p-4 font-mono text-sm overflow-x-auto group relative">
            <pre>{`<script defer src="${typeof window !== 'undefined' ? window.location.origin : ''}/tracker.js" 
  data-key="${writeKey}">
</script>`}</pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-8 text-subtle hover:text-white hover:bg-neutral-800"
              onClick={copyWriteKey}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
