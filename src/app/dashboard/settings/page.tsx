'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Key, Globe, Bell, Shield, Trash2, 
  Copy, Check, RefreshCw, Eye, EyeOff, Save, AlertTriangle, Loader2
} from 'lucide-react';

interface UserData {
  id: string;
  name: string | null;
  email: string;
}

interface ProjectData {
  id: string;
  name: string;
  domain: string | null;
  writeKey: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({ name: parsed.name || '', email: parsed.email || '' });
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const apiKey = projects[0]?.writeKey || 'No project created';

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update local storage for now
      const updatedUser = { ...user, name: formData.name, email: formData.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser as UserData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#ff003d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card className="border-gray-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <CardTitle className="font-heading text-lg">Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] text-white flex items-center justify-center font-bold text-2xl">
              {formData.name?.[0]?.toUpperCase() || formData.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <Button variant="outline" className="rounded-none text-sm">
                Change Avatar
              </Button>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input 
                id="name"
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-none border-gray-200 focus:border-[#ff003d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-none border-gray-200 focus:border-[#ff003d]"
              />
            </div>
          </div>

          <Button 
            className="bg-black hover:bg-gray-800 text-white rounded-none transition-all hover:scale-[1.02]"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* API Key */}
      <Card className="border-gray-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-gray-400" />
            <CardTitle className="font-heading text-lg">API Key</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-gray-500">Use this key to authenticate your tracking script.</p>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 p-3">
              <code className="flex-1 text-sm font-mono">
                {showKey ? apiKey : '••••••••-••••-••••-••••-••••••••••••'}
              </code>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="rounded-none h-12"
              onClick={copyKey}
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <p className="text-xs text-gray-400">
            This key is tied to your first project. Create multiple projects for separate tracking keys.
          </p>
        </CardContent>
      </Card>

      {/* Website Settings */}
      {projects.length > 0 && (
        <Card className="border-gray-200 hover:shadow-lg transition-all">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <CardTitle className="font-heading text-lg">Website</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Project Name</Label>
              <Input 
                value={projects[0]?.name || ''} 
                className="rounded-none border-gray-200 focus:border-[#ff003d]"
                readOnly
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Website Domain</Label>
              <Input 
                value={projects[0]?.domain || 'Not set'} 
                className="rounded-none border-gray-200 focus:border-[#ff003d]"
                readOnly
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <Card className="border-gray-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <CardTitle className="font-heading text-lg">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {[
            { label: 'Weekly report', desc: 'Get a summary of your analytics every Monday', defaultChecked: true },
            { label: 'Traffic spikes', desc: 'Notify when traffic increases significantly', defaultChecked: false },
            { label: 'Quota alerts', desc: 'Warn when approaching event limits', defaultChecked: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ff003d]/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff003d]"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plan */}
      <Card className="border-gray-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-400" />
            <CardTitle className="font-heading text-lg">Plan & Billing</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Hobby Plan</span>
                <Badge className="bg-green-100 text-green-700 rounded-none text-xs">Active</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">5,000 events/month • 30-day retention</p>
            </div>
            <span className="text-2xl font-bold font-heading">$0</span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Events used this month</span>
              <span className="font-medium">0 / 5,000</span>
            </div>
            <div className="h-2 bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]" style={{ width: '0%' }} />
            </div>
          </div>

          <Button className="bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white rounded-none transition-all hover:opacity-90 hover:scale-[1.02]">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 hover:shadow-lg transition-all">
        <CardHeader className="border-b border-red-100 bg-red-50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle className="font-heading text-lg text-red-700">Danger Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Delete Project</div>
              <div className="text-xs text-gray-500">Remove this project and all its data</div>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-none">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="font-medium text-sm">Delete Account</div>
              <div className="text-xs text-gray-500">Permanently delete your account and all data</div>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-none">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
