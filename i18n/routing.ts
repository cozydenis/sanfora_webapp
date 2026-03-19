import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always',
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
