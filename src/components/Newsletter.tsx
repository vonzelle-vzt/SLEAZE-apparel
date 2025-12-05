'use client';

import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/supabase';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setMessage('Welcome to the crew!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red/10 via-dark-gray to-red/10">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-red text-sm tracking-wider uppercase">Stay Connected</span>
        <h2 className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl text-cream tracking-wider mt-2">
          JOIN THE CREW
        </h2>
        <p className="text-cream/60 mt-4 max-w-xl mx-auto">
          Get exclusive drops, early access, and 10% off your first order.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-cream/5 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-red transition-colors"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-4 bg-red text-cream font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:bg-red/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
            {status === 'success' && <Check size={20} />}
            {status === 'idle' || status === 'error' ? <Send size={20} /> : null}
            {status === 'success' ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red'}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

