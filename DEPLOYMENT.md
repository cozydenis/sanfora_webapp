# Deployment Guide

## Building for Production

### 1. Build the Application

```bash
npm run build
```

This will:
- Generate static pages for all routes
- Optimize images and assets
- Create production bundles
- Type-check TypeScript

### 2. Test Production Build Locally

```bash
npm start
```

Visit `http://localhost:3000` to test the production build.

## Deployment Options

### Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Production Deployment:**
   ```bash
   vercel --prod
   ```

**Auto-Deployment:**
- Connect your GitHub repository to Vercel
- Automatic deployments on every push to main
- Preview deployments for pull requests

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run:**
```bash
docker build -t sanfora-timepieces .
docker run -p 3000:3000 sanfora-timepieces
```

### Static Export

For static hosting (GitHub Pages, AWS S3, etc.):

1. **Update next.config.mjs:**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true
     }
   };
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy `out/` directory** to your static host

## Environment Variables

Currently, the app doesn't require environment variables. If you add any:

1. **Create `.env.local`:**
   ```
   NEXT_PUBLIC_SITE_URL=https://sanfora-timepieces.com
   ```

2. **Add to `.gitignore`:**
   ```
   .env*.local
   ```

3. **Configure in hosting platform:**
   - Vercel: Project Settings > Environment Variables
   - Netlify: Site Settings > Build & Deploy > Environment

## Pre-Deployment Checklist

- [ ] Update product data in `data/products.json`
- [ ] Add real product images to `public/products/`
- [ ] Update company information in About and Contact pages
- [ ] Update Impressum with legal details
- [ ] Test all pages in production build
- [ ] Verify translations (DE/EN)
- [ ] Test responsive design on mobile/tablet
- [ ] Check all links work correctly
- [ ] Add analytics (if needed)
- [ ] Add meta tags for SEO (if needed)
- [ ] Configure custom domain
- [ ] Test language switching
- [ ] Verify product detail pages load correctly

## Custom Domain

### Vercel

1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for verification

### Netlify

1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

## Performance Optimization

The app is already optimized with:
- Static generation (SSG)
- Automatic code splitting
- Font optimization (Google Fonts)
- Image optimization ready (add Next.js Image components)

### Additional Optimizations

1. **Add Images:**
   - Use Next.js `<Image>` component
   - Serve WebP/AVIF formats
   - Lazy load images

2. **CDN:**
   - Vercel and Netlify include CDN automatically
   - Alternatively, use Cloudflare

3. **Analytics:**
   - Add Vercel Analytics
   - Or use Google Analytics
   - Consider privacy-focused alternatives (Plausible, Fathom)

## Monitoring

### Vercel Analytics
```bash
npm i @vercel/analytics
```

Add to layout:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking

Consider adding Sentry or similar:
```bash
npm i @sentry/nextjs
```

## Maintenance

### Updating Products

1. Edit `data/products.json`
2. Commit changes
3. Push to repository (auto-deploys on Vercel/Netlify)

### Updating Translations

1. Edit `messages/de.json` or `messages/en.json`
2. Commit and push

### Adding New Languages

1. Add new locale to `i18n/routing.ts`
2. Create `messages/[locale].json`
3. Update middleware configuration
4. Rebuild and deploy

## Troubleshooting

### Build Fails

1. Check Node.js version (18+ required)
2. Delete `.next` and `node_modules`
3. Run `npm install` again
4. Try `npm run build` locally

### Images Not Loading

1. Ensure images are in `public/` directory
2. Use paths starting with `/` (e.g., `/products/watch.jpg`)
3. Check Next.js Image configuration

### Translations Missing

1. Verify all keys exist in both `de.json` and `en.json`
2. Check console for missing translation warnings
3. Ensure `setRequestLocale()` is called in server components
