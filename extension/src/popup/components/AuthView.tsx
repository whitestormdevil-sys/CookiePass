import React, { useState } from 'react';
import type { User } from '@/types';
import { auth as authApi } from '@/lib/api';
import { setUser } from '@/lib/auth';
import { isValidEmail } from '@/utils/validators';

interface AuthViewProps {
  onComplete: (user: User) => void;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

export default function AuthView({ onComplete, onClose }: AuthViewProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      let response;
      if (mode === 'login') {
        response = await authApi.login({ email, password });
      } else {
        response = await authApi.register({ email, password, name: name || undefined });
      }

      await setUser(response.user);
      onComplete(response.user);
    } catch (err: unknown) {
      console.error('[CookiePass Auth Error]', err);
      let msg = 'Authentication failed';
      if (err instanceof Error) {
        msg = err.message;
        if (msg === 'Failed to fetch') {
          msg = 'Cannot reach server (localhost:3001). Is the API running?';
        }
      }
      if (typeof err === 'object' && err !== null && 'status' in err) {
        msg += ` (HTTP ${(err as { status: number }).status})`;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-surface-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-sm font-semibold text-surface-900 dark:text-white">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        <button onClick={onClose} className="btn-ghost btn-sm p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-surface-900 dark:text-white">CookiePass</h3>
          <p className="text-xs text-surface-500 mt-1">
            {mode === 'login'
              ? 'Welcome back! Sign in to your account.'
              : 'Create an account to start sharing securely.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="label">Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError(null);
            }}
            className="text-xs text-primary-500 hover:text-primary-600"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
