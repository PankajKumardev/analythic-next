'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, TrendingUp, TrendingDown, MapPin
} from 'lucide-react';

const countries = [
  { country: 'United States', code: 'US', flag: '🇺🇸', views: 15200, visitors: 8400, percentage: 32, change: 12.5 },
  { country: 'India', code: 'IN', flag: '🇮🇳', views: 12800, visitors: 7200, percentage: 27, change: 8.3 },
  { country: 'United Kingdom', code: 'GB', flag: '🇬🇧', views: 6400, visitors: 3800, percentage: 14, change: -2.1 },
  { country: 'Germany', code: 'DE', flag: '🇩🇪', views: 4800, visitors: 2900, percentage: 10, change: 5.6 },
  { country: 'Canada', code: 'CA', flag: '🇨🇦', views: 3200, visitors: 1800, percentage: 7, change: 15.2 },
  { country: 'France', code: 'FR', flag: '🇫🇷', views: 2400, visitors: 1400, percentage: 5, change: -1.3 },
  { country: 'Australia', code: 'AU', flag: '🇦🇺', views: 1600, visitors: 900, percentage: 3, change: 22.1 },
  { country: 'Japan', code: 'JP', flag: '🇯🇵', views: 940, visitors: 520, percentage: 2, change: 8.7 },
];

const cities = [
  { city: 'New York', country: '🇺🇸', views: 4200, percentage: 28 },
  { city: 'Mumbai', country: '🇮🇳', views: 3800, percentage: 25 },
  { city: 'London', country: '🇬🇧', views: 2900, percentage: 19 },
  { city: 'Berlin', country: '🇩🇪', views: 1800, percentage: 12 },
  { city: 'Toronto', country: '🇨🇦', views: 1200, percentage: 8 },
  { city: 'Paris', country: '🇫🇷', views: 900, percentage: 6 },
];

export default function GeographyPage() {
  const totalViews = countries.reduce((sum, c) => sum + c.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Geography</h1>
        <p className="text-gray-500 text-sm">See where your visitors come from</p>
      </div>

      {/* World Map Placeholder */}
      <Card className="border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gray-50 h-[300px] flex items-center justify-center">
            {/* Simple World Map Illustration */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <ellipse cx="500" cy="250" rx="450" ry="200" fill="none" stroke="#d4d4d8" strokeWidth="1" />
                <ellipse cx="500" cy="250" rx="300" ry="150" fill="none" stroke="#d4d4d8" strokeWidth="1" />
                <ellipse cx="500" cy="250" rx="150" ry="100" fill="none" stroke="#d4d4d8" strokeWidth="1" />
                <line x1="50" y1="250" x2="950" y2="250" stroke="#d4d4d8" strokeWidth="1" />
                <line x1="500" y1="50" x2="500" y2="450" stroke="#d4d4d8" strokeWidth="1" />
              </svg>
            </div>
            
            {/* Country Dots */}
            <div className="absolute" style={{ top: '35%', left: '22%' }}>
              <div className="w-6 h-6 bg-[#ff003d] rounded-full animate-ping opacity-30 absolute" />
              <div className="w-4 h-4 bg-[#ff003d] rounded-full relative flex items-center justify-center text-white text-[8px] font-bold">
                US
              </div>
            </div>
            <div className="absolute" style={{ top: '40%', left: '65%' }}>
              <div className="w-5 h-5 bg-[#ff4d8d] rounded-full animate-ping opacity-30 absolute" />
              <div className="w-3 h-3 bg-[#ff4d8d] rounded-full relative" />
            </div>
            <div className="absolute" style={{ top: '30%', left: '48%' }}>
              <div className="w-4 h-4 bg-[#ff003d]/70 rounded-full animate-ping opacity-30 absolute" />
              <div className="w-2.5 h-2.5 bg-[#ff003d]/70 rounded-full relative" />
            </div>
            
            <div className="relative z-10 text-center">
              <Globe className="h-16 w-16 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">Interactive map coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">{countries.length}</div>
            <div className="text-sm text-gray-500">Countries</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">{cities.length}</div>
            <div className="text-sm text-gray-500">Cities</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">{(totalViews / 1000).toFixed(1)}k</div>
            <div className="text-sm text-gray-500">Total Views</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">🇺🇸</div>
            <div className="text-sm text-gray-500">Top Country</div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Countries */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg">Countries</CardTitle>
              <Globe className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {countries.map((country, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs text-gray-400">{country.visitors.toLocaleString()} visitors</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center text-xs font-medium ${country.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {country.change >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                      {Math.abs(country.change)}%
                    </div>
                    <div className="w-20 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-14 text-right">{country.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cities */}
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg">Top Cities</CardTitle>
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {cities.map((city, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-[#ff003d]/10 flex items-center justify-center text-sm transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{city.city}</div>
                      <div className="text-xs text-gray-400">{city.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-[#ff003d]"
                        style={{ width: `${city.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-14 text-right">{city.views.toLocaleString()}</span>
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
