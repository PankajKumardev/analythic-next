'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, Monitor, Smartphone, MapPin, Clock, Loader2, Zap
} from 'lucide-react';

// This page shows a message that real-time requires WebSocket/SSE which isn't implemented yet
export default function RealtimePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#ff003d]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-heading">Real-time</h1>
            <Badge className="bg-yellow-100 text-yellow-700 rounded-lg text-xs">
              Coming Soon
            </Badge>
          </div>
          <p className="text-subtle text-sm">Live visitor tracking</p>
        </div>
      </div>

      {/* Feature Preview */}
      <Card className="border-[#ff003d]/20 bg-gradient-to-br from-[#ff003d]/5 to-white">
        <CardContent className="py-16 text-center">
          <div className="w-20 h-20 bg-[#ff003d]/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="h-10 w-10 text-[#ff003d]" />
          </div>
          
          <h3 className="text-2xl font-bold font-heading mb-3">Real-time Analytics Coming Soon</h3>
          <p className="text-subtle mb-8 max-w-lg mx-auto">
            Real-time visitor tracking requires WebSocket or Server-Sent Events (SSE) implementation. 
            This feature is on our roadmap.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white border border-neutral-100 rounded-lg">
              <Activity className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-sm">Live Visitors</h4>
              <p className="text-xs text-subtle mt-1">See who's on your site right now</p>
            </div>
            <div className="p-4 bg-white border border-neutral-100 rounded-lg">
              <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-sm">Live Locations</h4>
              <p className="text-xs text-subtle mt-1">Track visitor locations in real-time</p>
            </div>
            <div className="p-4 bg-white border border-neutral-100 rounded-lg">
              <Clock className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-sm">Session Duration</h4>
              <p className="text-xs text-subtle mt-1">Monitor active sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-neutral-200">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-bold font-heading text-gray-200">—</div>
            <div className="text-sm text-subtle mt-2">Active Now</div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-bold font-heading text-gray-200">—</div>
            <div className="text-sm text-subtle mt-2">Pages/min</div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-bold font-heading text-gray-200">—</div>
            <div className="text-sm text-subtle mt-2">Avg Duration</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
