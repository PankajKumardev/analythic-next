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

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/projects', icon: Folder, label: 'Projects' },
  { href: '/dashboard/realtime', icon: Activity, label: 'Real-time' },
  { href: '/dashboard/audience', icon: Users, label: 'Audience' },
  { href: '/dashboard/geography', icon: Globe, label: 'Geography' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
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
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#ff003d] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#FAFAFA] flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed with its own scroll */}
      <aside className={`
        fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="font-heading text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity">
            ANALYTHIC<span className="text-[#ff003d]">.</span>
          </Link>
          <button className="lg:hidden p-1 hover:bg-gray-100 rounded transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-3">
            Analytics
          </div>
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? '' : 'group-hover:text-[#ff003d]'}`} />
                {item.label}
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-[#ff003d] rounded-full" />
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-3">
              Account
            </div>
            {navItems.slice(5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? '' : 'group-hover:text-[#ff003d]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Projects */}
          <div className="pt-6">
            <div className="flex items-center justify-between px-3 mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Projects</span>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Plus className="h-3 w-3 text-gray-400" />
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
                <div className="w-2 h-2 rounded-full bg-[#ff003d]" />
                <span className="flex-1 truncate">My Website</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors group">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="flex-1 truncate">SaaS App</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </nav>

        {/* Upgrade Banner */}
        <div className="p-4 border-t border-gray-100">
          <div className="p-4 bg-gradient-to-br from-[#ff003d]/5 to-[#ff4d8d]/5 border border-[#ff003d]/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[#ff003d]" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Get unlimited events and more features</p>
            <Button className="w-full h-8 bg-black hover:bg-gray-800 text-white text-xs rounded-none transition-all hover:scale-[1.02]">
              Upgrade Now
            </Button>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] text-white flex items-center justify-center font-bold text-sm transition-transform hover:scale-105">
              {user?.name?.[0] || user?.email?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
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
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10 h-9 bg-gray-50 border-gray-200 rounded-none focus:border-[#ff003d] focus:ring-[#ff003d]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range */}
            <Button variant="outline" className="border-gray-200 text-gray-600 rounded-none h-9 hidden sm:flex hover:bg-gray-50 transition-all">
              Last 7 days
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff003d] rounded-full animate-pulse" />
            </button>

            {/* Upgrade */}
            <Button className="bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white rounded-none h-9 hidden md:flex hover:opacity-90 transition-all hover:scale-[1.02]">
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
