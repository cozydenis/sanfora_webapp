'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a showcase site, so we'll just show an alert
    alert('Vielen Dank für Ihre Nachricht! (Dies ist eine Demo-Website)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-light tracking-wider uppercase text-luxury-gray-700 mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-luxury-gray-300 focus:border-luxury-black focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-light tracking-wider uppercase text-luxury-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-luxury-gray-300 focus:border-luxury-black focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-light tracking-wider uppercase text-luxury-gray-700 mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-luxury-gray-300 focus:border-luxury-black focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-black text-luxury-white py-4 text-sm tracking-wider uppercase hover:bg-luxury-gray-800 transition-colors"
            >
              {t('send')}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-luxury-gray-200 text-center">
            <h3 className="font-serif text-2xl text-luxury-black mb-6">Kontaktinformationen</h3>
            <div className="space-y-2 text-luxury-gray-700 font-light">
              <p>Sanfora Time Pieces</p>
              <p>Furtbachstrasse 16</p>
              <p>8107 Buchs ZH</p>
              <p>Schweiz</p>
              <p className="pt-4">
                <a href="mailto:Info@sanfora.ch" className="hover:text-luxury-black transition-colors">
                  Info@sanfora.ch
                </a>
              </p>
              <p>
                <a href="https://wa.me/41798841212" className="hover:text-luxury-black transition-colors">
                  +41 79 884 12 12 (WhatsApp)
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
