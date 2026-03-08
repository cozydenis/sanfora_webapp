// Site configuration
export const siteConfig = {
  whatsapp: {
    // WhatsApp number in international format (without + or spaces)
    // To change: update this number
    phoneNumber: '41799173326',
  },
  company: {
    name: 'Sanfora Time Pieces',
    email: 'info@sanfora-timepieces.de',
    phone: '+41 79 917 33 26',
  },
} as const;

// Generate WhatsApp link with pre-filled message
export function getWhatsAppLink(productTitle: string, productUrl: string): string {
  const message = `Hi, I'm interested in ${productTitle} — ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodedMessage}`;
}
