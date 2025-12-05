'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, MoreVertical, ExternalLink, Settings, Trash2, 
  BarChart3, Eye, TrendingUp, Globe, Copy, Check
} from 'lucide-react';

const projects = [
  { 
    id: '1', 
    name: 'My Website', 
    url: 'mywebsite.com', 
    color: '#ff003d',
    views: 45200,
    visitors: 12800,
    change: 12.5,
    status: 'active'
  },
  { 
    id: '2', 
    name: 'SaaS App', 
    url: 'saasapp.io', 
    color: '#3b82f6',
    views: 28400,
    visitors: 8200,
    change: -2.3,
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Landing Page', 
    url: 'landing.dev', 
    color: '#10b981',
    views: 15600,
    visitors: 5400,
    change: 45.2,
    status: 'active'
  },
];

export default function ProjectsPage() {
  const [showNewProject, setShowNewProject] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyKey = (id: string) => {
    navigator.clipboard.writeText(`ak_live_${id}_xxxxx`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Projects</h1>
          <p className="text-gray-500 text-sm">Manage your tracked websites and applications</p>
        </div>
        <Button 
          className="bg-black hover:bg-gray-800 text-white rounded-none transition-all hover:scale-[1.02]"
          onClick={() => setShowNewProject(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* New Project Form */}
      {showNewProject && (
        <Card className="border-[#ff003d]/20 bg-[#ff003d]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Project name" 
                className="flex-1 rounded-none border-gray-200 focus:border-[#ff003d]"
              />
              <Input 
                placeholder="Website URL" 
                className="flex-1 rounded-none border-gray-200 focus:border-[#ff003d]"
              />
              <div className="flex gap-2">
                <Button className="bg-[#ff003d] hover:bg-[#ff4d8d] text-white rounded-none">
                  Create
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-none"
                  onClick={() => setShowNewProject(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-heading">{project.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Globe className="h-3 w-3" />
                      {project.url}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className={`rounded-none text-xs ${project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 my-4">
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading">{(project.views / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading">{(project.visitors / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-gray-500">Visitors</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold font-heading ${project.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {project.change >= 0 ? '+' : ''}{project.change}%
                  </div>
                  <div className="text-xs text-gray-500">Change</div>
                </div>
              </div>

              {/* API Key */}
              <div className="flex items-center gap-2 mb-4">
                <code className="flex-1 text-xs bg-gray-100 px-2 py-1.5 font-mono text-gray-600 truncate">
                  ak_live_{project.id}_xxxxx
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={() => copyKey(project.id)}
                >
                  {copiedId === project.id ? 
                    <Check className="h-3.5 w-3.5 text-green-600" /> : 
                    <Copy className="h-3.5 w-3.5 text-gray-400" />
                  }
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-none text-sm h-9 hover:bg-gray-50 transition-all">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Stats
                </Button>
                <Button variant="outline" className="rounded-none h-9 w-9 p-0 hover:bg-gray-50 transition-all">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Project Card */}
        <Card 
          className="border-dashed border-2 border-gray-200 hover:border-[#ff003d]/50 transition-all duration-300 cursor-pointer group"
          onClick={() => setShowNewProject(true)}
        >
          <CardContent className="h-full flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-[#ff003d]/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="h-8 w-8 text-gray-400 group-hover:text-[#ff003d] transition-colors" />
            </div>
            <h3 className="font-medium text-gray-600 group-hover:text-black transition-colors">Add New Project</h3>
            <p className="text-sm text-gray-400 mt-1">Track a new website</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
