'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, MoreVertical, ExternalLink, Settings, Trash2, 
  BarChart3, Eye, TrendingUp, Globe, Copy, Check, Loader2, AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  domain: string | null;
  writeKey: string;
  orgId: string;
  orgName: string;
  stats: {
    views: number;
    visitors: number;
    change: number;
  };
  createdAt: string;
}

const colors = ['#ff003d', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', domain: '' });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/dashboard/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      setCreating(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/dashboard/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      setNewProject({ name: '', domain: '' });
      setShowNewProject(false);
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/dashboard/projects?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const copyKey = (writeKey: string, id: string) => {
    navigator.clipboard.writeText(writeKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#ff003d] border-t-transparent rounded-full animate-spin" />
          <p className="text-subtle text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Projects</h1>
          <p className="text-subtle text-sm">Manage your tracked websites and applications</p>
        </div>
        <Button 
          className="bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-all hover:scale-[1.02]"
          onClick={() => setShowNewProject(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="py-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-500">{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
              className="ml-auto"
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      )}

      {/* New Project Form */}
      {showNewProject && (
        <Card className="border-[#ff003d]/20 bg-[#ff003d]/5">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Project name" 
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="flex-1 rounded-lg border-border focus:border-[#ff003d]"
              />
              <Input 
                placeholder="Website URL (optional)" 
                value={newProject.domain}
                onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
                className="flex-1 rounded-lg border-border focus:border-[#ff003d]"
              />
              <div className="flex gap-2">
                <Button 
                  className="bg-[#ff003d] hover:bg-[#ff4d8d] text-white rounded-lg"
                  onClick={createProject}
                  disabled={creating || !newProject.name.trim()}
                >
                  {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create'}
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-lg"
                  onClick={() => {
                    setShowNewProject(false);
                    setNewProject({ name: '', domain: '' });
                  }}
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
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            className="border-border hover:border-border hover:shadow-xl transition-all duration-300 group"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  >
                    {project.name[0].toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-heading">{project.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-subtle">
                      <Globe className="h-3 w-3" />
                      {project.domain || 'No domain set'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="rounded-lg text-xs bg-green-500/20 text-green-500">
                    active
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-500 hover:bg-red-500/200/10"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border my-4">
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading">
                    {project.stats.views >= 1000 
                      ? `${(project.stats.views / 1000).toFixed(1)}k` 
                      : project.stats.views}
                  </div>
                  <div className="text-xs text-subtle">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading">
                    {project.stats.visitors >= 1000 
                      ? `${(project.stats.visitors / 1000).toFixed(1)}k` 
                      : project.stats.visitors}
                  </div>
                  <div className="text-xs text-subtle">Visitors</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold font-heading ${project.stats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {project.stats.change >= 0 ? '+' : ''}{project.stats.change}%
                  </div>
                  <div className="text-xs text-subtle">Change</div>
                </div>
              </div>

              {/* API Key */}
              <div className="flex items-center gap-2 mb-4">
                <code className="flex-1 text-xs bg-surface px-2 py-1.5 font-mono text-subtle truncate">
                  {project.writeKey}
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={() => copyKey(project.writeKey, project.id)}
                >
                  {copiedId === project.id ? 
                    <Check className="h-3.5 w-3.5 text-green-600" /> : 
                    <Copy className="h-3.5 w-3.5 text-subtle" />
                  }
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-lg text-sm h-9 hover:bg-surface transition-all">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Stats
                </Button>
                <Button variant="outline" className="rounded-lg h-9 w-9 p-0 hover:bg-surface transition-all">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Project Card */}
        <Card 
          className="border-dashed border-2 border-border hover:border-[#ff003d]/50 transition-all duration-300 cursor-pointer group"
          onClick={() => setShowNewProject(true)}
        >
          <CardContent className="h-full flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-surface group-hover:bg-[#ff003d]/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="h-8 w-8 text-subtle group-hover:text-[#ff003d] transition-colors" />
            </div>
            <h3 className="font-medium text-subtle group-hover:text-black transition-colors">Add New Project</h3>
            <p className="text-sm text-subtle mt-1">Track a new website</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {projects.length === 0 && !showNewProject && (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="py-16 text-center">
            <BarChart3 className="h-16 w-16 text-subtle mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">No Projects Yet</h3>
            <p className="text-subtle mb-6">Create your first project to start tracking analytics.</p>
            <Button 
              className="bg-[#ff003d] hover:bg-[#ff4d8d] text-white rounded-lg"
              onClick={() => setShowNewProject(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}



