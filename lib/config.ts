// Site configuration
export const siteConfig = {
  whatsapp: {
    // Multiple WhatsApp numbers for load balancing
    // Format: international format without + or spaces
    phoneNumbers: [
      { number: '41763763655', display: '+41 76 376 36 55' },
      { number: '41798841212', display: '+41 79 884 12 12' },
    ],
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

// Get a random phone number (load balancing)
export function getRandomPhoneNumber() {
  const randomIndex = Math.floor(Math.random() * siteConfig.whatsapp.phoneNumbers.length);
  return siteConfig.whatsapp.phoneNumbers[randomIndex];
}

// Generate WhatsApp link with pre-filled message
export function getWhatsAppLink(productTitle: string, productUrl: string, phoneNumber?: string): string {
  const number = phoneNumber || getRandomPhoneNumber().number;
  const message = `Hi, I'm interested in ${productTitle} — ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}
