'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, MapPin, Loader2
} from 'lucide-react';

interface DashboardData {
  stats: {
    topCountries: Array<{ name: string; count: number }>;
  } | null;
}

const countryFlags: Record<string, string> = {
  'US': '🇺🇸', 'IN': '🇮🇳', 'UK': '🇬🇧', 'GB': '🇬🇧', 'DE': '🇩🇪', 
  'CA': '🇨🇦', 'FR': '🇫🇷', 'AU': '🇦🇺', 'JP': '🇯🇵', 'BR': '🇧🇷',
  'ES': '🇪🇸', 'IT': '🇮🇹', 'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴',
  'RU': '🇷🇺', 'CN': '🇨🇳', 'KR': '🇰🇷', 'MX': '🇲🇽', 'SG': '🇸🇬'
};

const countryNames: Record<string, string> = {
  'US': 'United States', 'IN': 'India', 'UK': 'United Kingdom', 'GB': 'United Kingdom',
  'DE': 'Germany', 'CA': 'Canada', 'FR': 'France', 'AU': 'Australia',
  'JP': 'Japan', 'BR': 'Brazil', 'ES': 'Spain', 'IT': 'Italy',
  'NL': 'Netherlands', 'SE': 'Sweden', 'NO': 'Norway', 'RU': 'Russia',
  'CN': 'China', 'KR': 'South Korea', 'MX': 'Mexico', 'SG': 'Singapore'
};

export default function GeographyPage() {
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

  const countries = data?.stats?.topCountries || [];
  const totalViews = countries.reduce((a, b) => a + b.count, 0);
  const hasData = countries.length > 0;

  // No data state
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Geography</h1>
          <p className="text-gray-500 text-sm">See where your visitors come from</p>
        </div>

        {/* Empty Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['Countries', 'Total Views', 'Top Country', 'Time Range'].map((label, i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold font-heading text-gray-200">
                  {i === 3 ? '30d' : '—'}
                </div>
                <div className="text-sm text-gray-400">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="py-16 text-center">
            <Globe className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">No Geographic Data Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start tracking visitors to see where they come from.
              Geographic data is collected automatically with each page view.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Has real data
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Geography</h1>
        <p className="text-gray-500 text-sm">Where your visitors come from • Last 30 days</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {countries.length}
            </div>
            <div className="text-sm text-gray-500">Countries</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
            </div>
            <div className="text-sm text-gray-500">Total Views</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              {countryFlags[countries[0]?.name] || '🌍'}
            </div>
            <div className="text-sm text-gray-500">Top Country</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 hover:shadow-lg transition-all group cursor-default">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold font-heading group-hover:text-[#ff003d] transition-colors">
              30d
            </div>
            <div className="text-sm text-gray-500">Time Range</div>
          </CardContent>
        </Card>
      </div>

      {/* Countries List */}
      <Card className="border-gray-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg">Countries</CardTitle>
            <Globe className="h-4 w-4 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {countries.map((country, i) => {
              const percentage = Math.round((country.count / totalViews) * 100);
              return (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {countryFlags[country.name] || '🌍'}
                    </span>
                    <div>
                      <div className="font-medium text-sm">
                        {countryNames[country.name] || country.name}
                      </div>
                      <div className="text-xs text-gray-400">{percentage}% of total</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm w-16 text-right">
                      {country.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
