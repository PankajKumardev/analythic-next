'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Users, Globe, TrendingUp, ArrowUpRight, ArrowDownRight,
  Copy, Check, Clock, MousePointer, Monitor, Smartphone, Tablet,
  Chrome, MapPin, ExternalLink, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Mock data
const dailyStats = [
  { date: 'Dec 1', pageViews: 4200, visitors: 2100 },
  { date: 'Dec 2', pageViews: 3800, visitors: 1900 },
  { date: 'Dec 3', pageViews: 5100, visitors: 2550 },
  { date: 'Dec 4', pageViews: 4600, visitors: 2300 },
  { date: 'Dec 5', pageViews: 6200, visitors: 3100 },
  { date: 'Dec 6', pageViews: 5800, visitors: 2900 },
  { date: 'Dec 7', pageViews: 7100, visitors: 3550 },
];

const topPages = [
  { page: '/', title: 'Home', views: 12520, change: 12.5 },
  { page: '/pricing', title: 'Pricing', views: 8340, change: 8.2 },
  { page: '/features', title: 'Features', views: 6890, change: -2.1 },
  { page: '/blog/analytics-guide', title: 'Analytics Guide', views: 4230, change: 24.8 },
  { page: '/contact', title: 'Contact', views: 2890, change: 5.6 },
];

const topCountries = [
  { country: 'United States', code: 'US', views: 15200, flag: '🇺🇸', percentage: 32 },
  { country: 'India', code: 'IN', views: 12800, flag: '🇮🇳', percentage: 27 },
  { country: 'United Kingdom', code: 'UK', views: 6400, flag: '🇬🇧', percentage: 14 },
  { country: 'Germany', code: 'DE', views: 4800, flag: '🇩🇪', percentage: 10 },
  { country: 'Canada', code: 'CA', views: 3200, flag: '🇨🇦', percentage: 7 },
];

const browsers = [
  { name: 'Chrome', value: 62, color: '#ff003d' },
  { name: 'Safari', value: 21, color: '#ff4d8d' },
  { name: 'Firefox', value: 10, color: '#ffb3c9' },
  { name: 'Edge', value: 5, color: '#e5e5e5' },
  { name: 'Other', value: 2, color: '#f4f4f5' },
];

const devices = [
  { name: 'Desktop', value: 58, icon: Monitor },
  { name: 'Mobile', value: 35, icon: Smartphone },
  { name: 'Tablet', value: 7, icon: Tablet },
];

const referrers = [
  { source: 'Google', visits: 8420, type: 'search' },
  { source: 'Twitter/X', visits: 4200, type: 'social' },
  { source: 'Direct', visits: 3650, type: 'direct' },
  { source: 'LinkedIn', visits: 2100, type: 'social' },
  { source: 'ProductHunt', visits: 1850, type: 'referral' },
];

const realtimeUsers = 247;

export default function DashboardPage() {
  const [writeKey] = useState('ak_live_7f3x9m2k4n1p5q8r');
  const [copied, setCopied] = useState(false);

  const copyWriteKey = () => {
    navigator.clipboard.writeText(writeKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalViews = dailyStats.reduce((sum, day) => sum + day.pageViews, 0);
  const totalVisitors = dailyStats.reduce((sum, day) => sum + day.visitors, 0);
  const avgSessionDuration = '2m 34s';
  const bounceRate = 42.3;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-heading">Dashboard Overview</h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-none">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-gray-500">My Website • Last 7 days</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 pl-4">
            <code className="text-sm text-gray-600 font-mono">{writeKey}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={copyWriteKey}
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
          <Button variant="outline" size="sm" className="rounded-none border-gray-200 h-10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Banner */}
      <div className="bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="text-white/70 text-sm font-medium mb-1">REAL-TIME VISITORS</div>
          <div className="text-5xl font-bold font-heading">{realtimeUsers}</div>
          <div className="text-white/80 text-sm mt-1">People on your site right now</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold">48</div>
            <div className="text-white/70 text-sm">/pricing</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">32</div>
            <div className="text-white/70 text-sm">/features</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">167</div>
            <div className="text-white/70 text-sm">/home</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-[#ff003d]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">{totalViews.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="flex items-center text-green-600 font-medium bg-green-50 px-1.5 py-0.5">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                12.5%
              </span>
              <span className="text-gray-500 ml-2">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">{totalVisitors.toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="flex items-center text-green-600 font-medium bg-green-50 px-1.5 py-0.5">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                8.3%
              </span>
              <span className="text-gray-500 ml-2">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">{avgSessionDuration}</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="flex items-center text-green-600 font-medium bg-green-50 px-1.5 py-0.5">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                15.2%
              </span>
              <span className="text-gray-500 ml-2">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">{bounceRate}%</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="flex items-center text-red-600 font-medium bg-red-50 px-1.5 py-0.5">
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
                2.1%
              </span>
              <span className="text-gray-500 ml-2">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="border-gray-200 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-xl">Traffic Overview</CardTitle>
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
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyStats}>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
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
          </div>
        </CardContent>
      </Card>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <Card className="border-gray-200 shadow-sm bg-white lg:col-span-2">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading">Top Pages</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
                View All <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-mono w-6">{i + 1}</span>
                    <div>
                      <code className="text-sm text-gray-900 bg-gray-100 px-2 py-0.5">{page.page}</code>
                      <p className="text-sm text-gray-500 mt-0.5">{page.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{page.views.toLocaleString()}</div>
                    <span className={`text-sm ${page.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {page.change >= 0 ? '+' : ''}{page.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browsers & Devices */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="font-heading">Browsers</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[140px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browsers}
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {browsers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {browsers.slice(0, 3).map((browser, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3" style={{ backgroundColor: browser.color }} />
                      {browser.name}
                    </div>
                    <span className="font-medium">{browser.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="font-heading">Devices</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {devices.map((device, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <device.icon className="h-4 w-4 text-gray-500" />
                        {device.name}
                      </div>
                      <span className="font-medium">{device.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                        style={{ width: `${device.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Countries */}
        <Card className="border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading">Top Countries</CardTitle>
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold w-16 text-right">{country.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referrers */}
        <Card className="border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading">Top Referrers</CardTitle>
              <Globe className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {referrers.map((referrer, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {referrer.source[0]}
                    </div>
                    <div>
                      <span className="font-medium">{referrer.source}</span>
                      <p className="text-xs text-gray-500 capitalize">{referrer.type}</p>
                    </div>
                  </div>
                  <span className="font-bold">{referrer.visits.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Script Installation */}
      <Card className="border-gray-200 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-heading">Install Tracking Script</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-500 mb-4">Add this script to your website's <code className="bg-gray-100 px-1">&lt;head&gt;</code> tag:</p>
          <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-x-auto">
            <pre>{`<script defer src="https://analythic.io/tracker.js" data-key="${writeKey}"></script>`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
