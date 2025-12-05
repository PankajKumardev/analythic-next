'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, ArrowRight, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' 
        ? { email, password } 
        : { email, password, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex">
      
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <span className="font-bold text-2xl tracking-tighter">ANALYTHIC</span>
            <div className="w-2 h-2 rounded-full bg-pulse animate-pulse"></div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-subtle text-lg">
              {mode === 'login' 
                ? 'Enter your credentials to access your dashboard.' 
                : 'Start your 14-day free trial. No credit card required.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-pulse/5 border border-pulse/20 text-pulse text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-ink">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-12 pl-12 bg-surface border-neutral-200 focus:bg-white focus:border-pulse focus:ring-pulse/20 rounded-lg transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-ink">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 pl-12 bg-surface border-neutral-200 focus:bg-white focus:border-pulse focus:ring-pulse/20 rounded-lg transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-ink">
                  Password
                </Label>
                {mode === 'login' && (
                  <Link href="/forgot-password" className="text-sm text-pulse hover:underline font-medium">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-subtle" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="h-12 pl-12 pr-12 bg-surface border-neutral-200 focus:bg-white focus:border-pulse focus:ring-pulse/20 rounded-lg transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle hover:text-ink transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {mode === 'register' && (
                <p className="text-xs text-subtle">Must be at least 8 characters</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-pulse hover:bg-[#d90034] text-white font-medium text-base rounded-full shadow-soft-red transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-subtle font-mono text-xs uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <Button 
            type="button"
            variant="outline"
            className="w-full h-12 border-neutral-200 hover:border-ink hover:bg-surface text-ink font-medium rounded-full transition-all hover:-translate-y-0.5"
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>

          {/* Toggle Mode */}
          <p className="mt-8 text-center text-subtle">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-1 text-pulse font-medium hover:underline"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center relative overflow-hidden">
        {/* Giant Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-glow opacity-30 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-lg px-8">
          {/* The Circle Visual */}
          <div className="relative mb-12 inline-block">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] flex items-center justify-center shadow-2xl shadow-[#ff003d]/30 mx-auto">
              <span className="text-white text-5xl font-light tracking-tighter font-heading">Aa</span>
            </div>
            <div className="absolute -right-4 top-2 bg-white border border-gray-100 px-3 py-2 shadow-lg text-xs font-medium">
              Privacy-First
            </div>
            <div className="absolute -left-4 bottom-4 bg-white border border-gray-100 px-3 py-2 shadow-lg text-xs font-medium">
              Zero Cookies
            </div>
          </div>

          <h2 className="text-3xl font-bold font-heading mb-4">
            Privacy-first analytics for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]">
              modern teams
            </span>
          </h2>
          <p className="text-gray-500 text-lg">
            Join 10,000+ companies using Analythic to understand their users without compromising privacy.
          </p>

          {/* Trusted By Logos */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
            <span className="font-bold text-xl">vercel</span>
            <span className="font-bold text-xl">stripe</span>
            <span className="font-bold text-xl">linear</span>
          </div>
        </div>
      </div>
    </div>
  );
}
