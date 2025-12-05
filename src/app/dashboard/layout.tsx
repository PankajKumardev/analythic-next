'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Settings, Activity, Users, Globe,
  ChevronDown, LogOut, Bell, Search, Menu, X,
  Folder, Plus, ArrowUpRight, ChevronRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

interface Project {
  id: string;
  name: string;
  domain: string | null;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/projects', icon: Folder, label: 'Projects' },
  { href: '/dashboard/realtime', icon: Activity, label: 'Real-time' },
  { href: '/dashboard/audience', icon: Users, label: 'Audience' },
  { href: '/dashboard/geography', icon: Globe, label: 'Geography' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const projectColors = ['#ff003d', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchProjects(token);
    setLoading(false);
  }, [router]);

  const fetchProjects = async (token: string) => {
    try {
      const response = await fetch('/api/dashboard/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-pulse border-t-transparent rounded-full animate-spin" />
          <p className="text-subtle text-sm font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-surface flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed with its own scroll */}
      <aside className={`
        fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="font-bold text-lg tracking-tighter">ANALYTHIC</span>
            <div className="w-2 h-2 rounded-full bg-pulse animate-pulse"></div>
          </Link>
          <button className="lg:hidden p-1 hover:bg-surface rounded-lg transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-subtle" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-mono text-subtle uppercase tracking-wider px-3 mb-3">
            Analytics
          </div>
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-pulse text-white'
                    : 'text-subtle hover:bg-surface hover:text-foreground'
                }`}
              >
                <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'group-hover:text-pulse'}`} />
                {item.label}
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <div className="text-xs font-mono text-subtle uppercase tracking-wider px-3 mb-3">
              Account
            </div>
            {navItems.slice(5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-pulse text-white'
                      : 'text-subtle hover:bg-surface hover:text-foreground'
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'group-hover:text-pulse'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Projects */}
          <div className="pt-6">
            <div className="flex items-center justify-between px-3 mb-3">
              <span className="text-xs font-mono text-subtle uppercase tracking-wider">Projects</span>
              <Link href="/dashboard/projects" className="p-1 hover:bg-surface rounded-lg transition-colors">
                <Plus className="h-3 w-3 text-subtle" />
              </Link>
            </div>
            <div className="space-y-1">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <div key={project.id} className="flex items-center gap-3 px-3 py-2 text-sm text-subtle hover:bg-surface rounded-lg cursor-pointer transition-colors group">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: projectColors[i % projectColors.length] }} 
                    />
                    <span className="flex-1 truncate">{project.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-subtle">
                  No projects yet
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Upgrade Banner */}
        <div className="p-4 border-t border-border">
          <div className="p-4 bg-gradient-to-br from-pulse/10 to-glow/10 border border-pulse/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-pulse" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-subtle mb-3">Get unlimited events and more features</p>
            <Button className="w-full h-8 bg-pulse hover:bg-pulse/90 text-white text-xs rounded-full transition-all hover:scale-[1.02]">
              Upgrade Now
            </Button>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-br from-pulse to-glow text-white rounded-full flex items-center justify-center font-bold text-sm transition-transform hover:scale-105">
              {user?.name?.[0] || user?.email?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-subtle truncate">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 text-subtle hover:text-foreground hover:bg-surface rounded-lg transition-all"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 h-screen">
        {/* Header - Fixed at top */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-subtle hover:bg-surface rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10 h-9 bg-surface border-border rounded-lg focus:border-pulse focus:ring-pulse/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Date Range */}
            <Button variant="outline" className="border-border text-subtle rounded-lg h-9 hidden sm:flex hover:bg-surface hover:border-foreground transition-all">
              Last 7 days
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Notifications */}
            <button className="relative p-2 text-subtle hover:text-foreground hover:bg-surface rounded-lg transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pulse rounded-full animate-pulse" />
            </button>

            {/* Upgrade */}
            <Button className="bg-gradient-to-r from-pulse to-glow text-white rounded-full h-9 hidden md:flex hover:opacity-90 transition-all hover:scale-[1.02] shadow-soft-red">
              Upgrade
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page Content - Scrollable area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}



