'use client';

import { useState } from 'react';
import { Send, Loader2, Check, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { submitContactForm } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-red text-sm tracking-wider uppercase">Get In Touch</span>
        <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl text-cream tracking-wider mt-2">
          CONTACT US
        </h1>
        <p className="text-cream/60 mt-4 max-w-xl mx-auto">
          Questions, feedback, or just want to say what&apos;s up? We&apos;re here for it.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass p-8 rounded-lg">
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-cream tracking-wider mb-6">
              SEND A MESSAGE
            </h2>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl text-cream mb-2">
                  MESSAGE SENT
                </h3>
                <p className="text-cream/60">We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 glass-light text-cream hover:bg-cream/10 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-cream/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-red transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-cream/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-red transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-cream/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-red transition-colors resize-none"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red text-sm">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-red text-cream font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:bg-red/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-lg">
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-cream tracking-wider mb-6">
                INFO
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-red rounded">
                    <Mail size={20} className="text-red" />
                  </div>
                  <div>
                    <h3 className="text-cream font-medium">Email</h3>
                    <a href="mailto:hello@sleazeapparel.com" className="text-cream/60 hover:text-red transition-colors">
                      hello@sleazeapparel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 glass-red rounded">
                    <MapPin size={20} className="text-red" />
                  </div>
                  <div>
                    <h3 className="text-cream font-medium">Location</h3>
                    <p className="text-cream/60">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-lg">
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-cream tracking-wider mb-6">
                FOLLOW US
              </h2>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/sleazeapparel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass-light hover:bg-cream/10 transition-colors group"
                >
                  <Instagram size={24} className="text-cream/60 group-hover:text-red transition-colors" />
                  <span className="text-cream/60 group-hover:text-cream transition-colors">@sleazeapparel</span>
                </a>
                <a
                  href="https://twitter.com/sleazeapparel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass-light hover:bg-cream/10 transition-colors group"
                >
                  <Twitter size={24} className="text-cream/60 group-hover:text-red transition-colors" />
                  <span className="text-cream/60 group-hover:text-cream transition-colors">@sleazeapparel</span>
                </a>
              </div>
            </div>

            <div className="glass p-8 rounded-lg">
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-cream tracking-wider mb-4">
                BUSINESS HOURS
              </h2>
              <div className="space-y-2 text-cream/60">
                <p>Monday - Friday: 9am - 6pm PST</p>
                <p>Saturday: 10am - 4pm PST</p>
                <p>Sunday: Closed</p>
              </div>
              <p className="text-cream/40 text-sm mt-4">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

