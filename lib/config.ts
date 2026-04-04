// Site configuration
export const siteConfig = {
  whatsapp: {
    // WhatsApp contact number
    // Format: international format without + or spaces
    number: '41762000159',
    display: '+41 76 200 01 59',
  },
  company: {
    name: 'Sanfora Time Pieces',
    email: 'Info@sanfora.ch',
    address: {
      street: 'Furtbachstrasse 16',
      city: '8107 Buchs ZH',
      country: 'Schweiz',
    },
  },
} as const;

// Generate WhatsApp link with pre-filled message
export function getWhatsAppLink(productTitle: string, productUrl: string, locale: 'de' | 'en' = 'de'): string {
  const messages = {
    de: `Hallo, ich interessiere mich für ${productTitle} — ${productUrl}`,
    en: `Hi, I'm interested in ${productTitle} — ${productUrl}`,
  };

  const message = messages[locale];
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
}
