'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Monitor, Smartphone, Tablet, Globe, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';

const browsers = [
  { name: 'Chrome', value: 62, color: '#ff003d' },
  { name: 'Safari', value: 21, color: '#ff4d8d' },
  { name: 'Firefox', value: 10, color: '#ffb3c9' },
  { name: 'Edge', value: 5, color: '#e5e5e5' },
  { name: 'Other', value: 2, color: '#f4f4f5' },
];

const operatingSystems = [
  { name: 'Windows', value: 45 },
  { name: 'macOS', value: 28 },
  { name: 'iOS', value: 15 },
  { name: 'Android', value: 10 },
  { name: 'Linux', value: 2 },
];

const devices = [
  { name: 'Desktop', value: 58, icon: Monitor, change: 5.2 },
  { name: 'Mobile', value: 35, icon: Smartphone, change: -2.1 },
  { name: 'Tablet', value: 7, icon: Tablet, change: 12.3 },
];

const screenSizes = [
  { size: '1920x1080', count: 4520, percentage: 32 },
  { size: '1366x768', count: 2840, percentage: 20 },
  { size: '390x844', count: 2100, percentage: 15 },
  { size: '1536x864', count: 1680, percentage: 12 },
  { size: '414x896', count: 1400, percentage: 10 },
];

const languages = [
  { lang: 'English', code: 'en', count: 8420, percentage: 59 },
  { lang: 'Hindi', code: 'hi', count: 2100, percentage: 15 },
  { lang: 'Spanish', code: 'es', count: 1260, percentage: 9 },
  { lang: 'German', code: 'de', count: 980, percentage: 7 },
  { lang: 'French', code: 'fr', count: 700, percentage: 5 },
];

export default function AudiencePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Audience</h1>
        <p className="text-gray-500 text-sm">Understand who visits your website</p>
      </div>

      {/* Device Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {devices.map((device, i) => (
          <Card key={i} className="border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-default">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#ff003d]/10 flex items-center justify-center transition-colors">
                    <device.icon className="h-7 w-7 text-gray-600 group-hover:text-[#ff003d] transition-colors" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">{device.value}%</div>
                    <div className="text-sm text-gray-500">{device.name}</div>
                  </div>
                </div>
                <div className={`flex items-center text-sm font-medium ${device.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {device.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(device.change)}%
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] transition-all group-hover:opacity-80"
                  style={{ width: `${device.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Browsers */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="font-heading text-lg">Browsers</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-8">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browsers}
                      innerRadius={45}
                      outerRadius={70}
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
              <div className="flex-1 space-y-3">
                {browsers.map((browser, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 transition-transform group-hover:scale-125" style={{ backgroundColor: browser.color }} />
                      <span className="text-sm group-hover:font-medium transition-all">{browser.name}</span>
                    </div>
                    <span className="font-bold text-sm">{browser.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Systems */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="font-heading text-lg">Operating Systems</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={operatingSystems} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={80} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e5e5',
                      borderRadius: '0px'
                    }}
                  />
                  <Bar dataKey="value" fill="#ff003d" radius={0} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Screen Sizes & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Screen Sizes */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="font-heading text-lg">Screen Sizes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {screenSizes.map((screen, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-default">
                  <div className="flex items-center gap-3">
                    <code className="text-sm bg-gray-100 px-2 py-1 group-hover:bg-gray-200 transition-colors">{screen.size}</code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-[#ff003d]"
                        style={{ width: `${screen.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-14 text-right">{screen.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="font-heading text-lg">Languages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-default">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-none text-xs uppercase">{lang.code}</Badge>
                    <span className="font-medium text-sm">{lang.lang}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-14 text-right">{lang.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
