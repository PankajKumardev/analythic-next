'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, Users, Globe, Monitor, Smartphone, MapPin,
  Clock, ArrowRight, Zap
} from 'lucide-react';

// Simulate real-time data
const generateVisitor = () => ({
  id: Math.random().toString(36).substr(2, 9),
  page: ['/', '/pricing', '/features', '/blog', '/contact'][Math.floor(Math.random() * 5)],
  country: ['🇺🇸 US', '🇮🇳 IN', '🇬🇧 UK', '🇩🇪 DE', '🇨🇦 CA', '🇫🇷 FR'][Math.floor(Math.random() * 6)],
  device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
  browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
  time: 'Just now',
  duration: Math.floor(Math.random() * 300),
});

export default function RealtimePage() {
  const [visitors, setVisitors] = useState(() => 
    Array.from({ length: 8 }, generateVisitor)
  );
  const [activeCount, setActiveCount] = useState(24);
  const [pulse, setPulse] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add or remove visitors
      setVisitors(prev => {
        const newVisitors = [...prev];
        if (Math.random() > 0.5 && newVisitors.length < 15) {
          newVisitors.unshift(generateVisitor());
        } else if (newVisitors.length > 5) {
          newVisitors.pop();
        }
        return newVisitors;
      });
      
      // Update active count
      setActiveCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      
      // Trigger pulse animation
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-heading">Real-time</h1>
            <Badge className={`bg-green-100 text-green-700 rounded-none text-xs ${pulse ? 'animate-pulse' : ''}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-gray-500 text-sm">See visitors on your site right now</p>
        </div>
      </div>

      {/* Active Users Counter */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white p-8 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32 -mb-32" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform ${pulse ? 'scale-110' : 'scale-100'}`}>
              <Zap className="h-10 w-10" />
            </div>
            <div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">Active Right Now</div>
              <div className={`text-6xl font-bold font-heading transition-all ${pulse ? 'scale-105' : 'scale-100'}`}>
                {activeCount}
              </div>
              <div className="text-white/70 text-sm mt-1">visitors on your site</div>
            </div>
          </div>
          
          <div className="hidden md:grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.floor(activeCount * 0.6)}</div>
              <div className="text-white/70 text-sm">Desktop</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.floor(activeCount * 0.35)}</div>
              <div className="text-white/70 text-sm">Mobile</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.floor(activeCount * 0.05)}</div>
              <div className="text-white/70 text-sm">Tablet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#ff003d]" />
              Live Visitor Feed
            </CardTitle>
            <span className="text-sm text-gray-500">{visitors.length} active sessions</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {visitors.map((visitor, i) => (
              <div 
                key={visitor.id} 
                className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-all ${i === 0 && pulse ? 'bg-[#ff003d]/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center bg-gray-100 ${i === 0 && pulse ? 'animate-pulse bg-[#ff003d]/10' : ''}`}>
                    {visitor.device === 'Mobile' ? (
                      <Smartphone className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Monitor className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-medium bg-gray-100 px-2 py-0.5">{visitor.page}</code>
                      <span className="text-gray-400">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-gray-500">{visitor.browser}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{visitor.country}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(visitor.duration)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{visitor.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold font-heading">6</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold font-heading">{visitors.length}</div>
                <div className="text-sm text-gray-500">Active Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold font-heading">5</div>
                <div className="text-sm text-gray-500">Pages Viewed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
