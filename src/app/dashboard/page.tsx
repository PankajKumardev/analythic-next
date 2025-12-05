'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Users, Globe, TrendingUp, ArrowUpRight, ArrowDownRight,
  Copy, Check, Clock, MousePointer, Monitor, Smartphone, Tablet,
  MapPin, ExternalLink, RefreshCw, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
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
  { page: '/blog', title: 'Blog', views: 4230, change: 24.8 },
  { page: '/contact', title: 'Contact', views: 2890, change: 5.6 },
];

const topCountries = [
  { country: 'United States', code: 'US', views: 15200, flag: '🇺🇸', percentage: 32 },
  { country: 'India', code: 'IN', views: 12800, flag: '🇮🇳', percentage: 27 },
  { country: 'United Kingdom', code: 'UK', views: 6400, flag: '🇬🇧', percentage: 14 },
  { country: 'Germany', code: 'DE', views: 4800, flag: '🇩🇪', percentage: 10 },
  { country: 'Canada', code: 'CA', views: 3200, flag: '🇨🇦', percentage: 7 },
];

const devices = [
  { name: 'Desktop', value: 58, icon: Monitor },
  { name: 'Mobile', value: 35, icon: Smartphone },
  { name: 'Tablet', value: 7, icon: Tablet },
];

const realtimeUsers = 24;

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-heading">Overview</h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-none text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-gray-500 text-sm">My Website • Last 7 days</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-2 pl-3 hover:border-gray-300 transition-colors">
            <code className="text-xs text-gray-600 font-mono">{writeKey}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 hover:bg-gray-200 transition-all"
              onClick={copyWriteKey}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-gray-400" />}
            </Button>
          </div>
          <Button variant="outline" size="sm" className="rounded-none border-gray-200 hover:bg-gray-50 transition-all hover:scale-[1.02]">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Real-time Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white p-6 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <div className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Real-time visitors</div>
              <div className="text-4xl font-bold font-heading">{realtimeUsers}</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold">8</div>
              <div className="text-white/70 text-xs">/pricing</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">12</div>
              <div className="text-white/70 text-xs">/features</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">4</div>
              <div className="text-white/70 text-xs">/blog</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Views', value: totalViews.toLocaleString(), change: '+12.5%', positive: true, icon: Eye, color: 'text-[#ff003d]' },
          { title: 'Unique Visitors', value: totalVisitors.toLocaleString(), change: '+8.3%', positive: true, icon: Users, color: 'text-purple-500' },
          { title: 'Avg. Duration', value: '2m 34s', change: '+15.2%', positive: true, icon: Clock, color: 'text-blue-500' },
          { title: 'Bounce Rate', value: '42.3%', change: '-2.1%', positive: true, icon: MousePointer, color: 'text-orange-500' },
        ].map((stat, i) => (
          <Card key={i} className="border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">{stat.value}</div>
              <div className="flex items-center mt-2 text-sm">
                <span className={`flex items-center font-medium px-1.5 py-0.5 text-xs ${stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2 text-xs">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-gray-100">
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
          </div>
        </CardContent>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg">Top Pages</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black text-xs">
                View All <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-mono w-5">{i + 1}</span>
                    <div>
                      <code className="text-sm text-gray-900 bg-gray-100 px-2 py-0.5 group-hover:bg-gray-200 transition-colors">{page.page}</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium ${page.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {page.change >= 0 ? '+' : ''}{page.change}%
                    </span>
                    <span className="font-bold text-sm w-16 text-right">{page.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg">Top Countries</CardTitle>
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{country.flag}</span>
                    <span className="font-medium text-sm">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] transition-all group-hover:opacity-80"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-16 text-right">{country.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices */}
      <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-heading text-lg">Devices</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-default">
                <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#ff003d]/30 transition-colors">
                  <device.icon className="h-6 w-6 text-gray-600 group-hover:text-[#ff003d] transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{device.name}</span>
                    <span className="font-bold text-lg">{device.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 overflow-hidden">
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
      <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-heading text-lg">Install Tracking Script</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-500 mb-4 text-sm">Add this script to your website's <code className="bg-gray-100 px-1.5 py-0.5 text-xs">&lt;head&gt;</code> tag:</p>
          <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-x-auto group relative">
            <pre>{`<script defer src="https://analythic.io/tracker.js" data-key="${writeKey}"></script>`}</pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-8 text-gray-400 hover:text-white hover:bg-gray-800"
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
