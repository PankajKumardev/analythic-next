'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Monitor, Smartphone, Tablet, Loader2
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

interface DashboardData {
  stats: {
    topBrowsers: Array<{ name: string; count: number }>;
    devices: { desktop: number; mobile: number; tablet: number };
  } | null;
}

const browserColors = ['#ff003d', '#ff4d8d', '#ffb3c9', '#e5e5e5', '#f4f4f5'];

export default function AudiencePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard?days=30', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#ff003d]" />
      </div>
    );
  }

  const hasData = data?.stats && (data.stats.topBrowsers.length > 0 || 
    data.stats.devices.desktop > 0 || data.stats.devices.mobile > 0);

  // No data state
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Audience</h1>
          <p className="text-subtle text-sm">Understand who visits your website</p>
        </div>

        {/* Empty Device Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Desktop', icon: Monitor },
            { name: 'Mobile', icon: Smartphone },
            { name: 'Tablet', icon: Tablet },
          ].map((device, i) => (
            <Card key={i} className="border-neutral-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-surface flex items-center justify-center">
                    <device.icon className="h-7 w-7 text-gray-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-heading text-gray-200">0%</div>
                    <div className="text-sm text-subtle">{device.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="py-16 text-center">
            <Users className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">No Audience Data Yet</h3>
            <p className="text-subtle max-w-md mx-auto">
              Start tracking visitors to see device, browser, and audience insights.
              Add the tracking script to your website to begin collecting data.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Has real data
  const browsers = data!.stats!.topBrowsers;
  const devices = data!.stats!.devices;
  const totalBrowsers = browsers.reduce((a, b) => a + b.count, 0);

  const deviceList = [
    { name: 'Desktop', value: devices.desktop, icon: Monitor },
    { name: 'Mobile', value: devices.mobile, icon: Smartphone },
    { name: 'Tablet', value: devices.tablet, icon: Tablet },
  ];

  const browserData = browsers.map((b, i) => ({
    name: b.name,
    value: Math.round((b.count / totalBrowsers) * 100),
    count: b.count,
    color: browserColors[i % browserColors.length]
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Audience</h1>
        <p className="text-subtle text-sm">Understand who visits your website • Last 30 days</p>
      </div>

      {/* Device Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {deviceList.map((device, i) => (
          <Card key={i} className="border-neutral-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-default">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-surface group-hover:bg-[#ff003d]/10 flex items-center justify-center transition-colors">
                  <device.icon className="h-7 w-7 text-subtle group-hover:text-[#ff003d] transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
                    {device.value}%
                  </div>
                  <div className="text-sm text-subtle">{device.name}</div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-surface overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                  style={{ width: `${device.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Browsers */}
      <Card className="border-neutral-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-neutral-100">
          <CardTitle className="font-heading text-lg">Browsers</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center gap-8">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {browserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {browserData.map((browser, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 transition-transform group-hover:scale-125" 
                      style={{ backgroundColor: browser.color }} 
                    />
                    <span className="text-sm group-hover:font-medium transition-all">{browser.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm">{browser.value}%</span>
                    <span className="text-xs text-subtle ml-2">({browser.count.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
