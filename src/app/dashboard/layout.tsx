'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Settings, PieChart, Activity, Users, Globe,
  BarChart3, ChevronDown, LogOut, Bell, Search, Menu, X,
  Folder, Plus, ArrowUpRight
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
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview', active: true },
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
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    setCurrentPath(window.location.pathname);
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
        <div className="w-8 h-8 border-2 border-[#ff003d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter">
            ANALYTHIC<span className="text-[#ff003d]">.</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-none focus:border-[#ff003d] focus:ring-[#ff003d]/20"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                currentPath === item.href
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          <div className="pt-6">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">
              Projects
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#ff003d]" />
                My Website
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                SaaS App
              </div>
              <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-gray-600 w-full">
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] text-white flex items-center justify-center font-bold text-sm">
              {user?.name?.[0] || user?.email?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 flex items-center justify-end gap-4">
            {/* Date Range Picker Placeholder */}
            <Button variant="outline" className="border-gray-200 text-gray-600 rounded-none h-9 hidden sm:flex">
              Last 7 days
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Notifications */}
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff003d] rounded-full" />
            </button>

            {/* Upgrade Button */}
            <Button className="bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white rounded-none h-9 hidden sm:flex">
              Upgrade Plan
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
