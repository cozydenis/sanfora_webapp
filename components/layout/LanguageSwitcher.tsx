'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`uppercase tracking-wider transition-colors ${
            locale === loc
              ? 'text-luxury-black font-normal border-b border-luxury-black'
              : 'text-luxury-gray-400 font-light hover:text-luxury-gray-700'
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
