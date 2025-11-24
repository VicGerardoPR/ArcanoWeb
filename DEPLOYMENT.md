# Deployment Guide - Arcano Intelligence Website

## Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18.17 or later installed locally
- Account on chosen hosting platform

---

## Option 1: Vercel (Recommended) ⚡

Vercel is made by the creators of Next.js and offers the best performance and easiest deployment.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

**Build Settings (Auto-detected):**
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

---

## Option 2: Netlify 🌐

### Steps:

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Configure Next.js on Netlify**
   Create `netlify.toml` in root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

---

## Option 3: Docker Deployment 🐳

### Steps:

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

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

2. **Build and Run**
   ```bash
   docker build -t arcano-intelligence .
   docker run -p 3000:3000 arcano-intelligence
   ```

---

## Option 4: Traditional VPS (DigitalOcean, AWS, etc.) 💻

### Steps:

1. **Server Setup**
   ```bash
   # SSH into your server
   ssh user@your-server-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 (Process Manager)
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone your-repo-url
   cd arcano-next

   # Install dependencies
   npm install

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "arcano-intelligence" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Option 5: GitHub Pages (Static Export) 📄

**Note:** Requires static export, some features will be limited.

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true }
   }
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   # Files will be in 'out' directory
   ```

3. **GitHub Pages Setup**
   - Push 'out' folder to gh-pages branch
   - Enable GitHub Pages in repository settings

---

## Environment Variables 🔐

For production, set these environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_CONTACT_EMAIL=your_email
NODE_ENV=production
```

### Vercel/Netlify:
- Add in dashboard under "Environment Variables"

### Docker:
- Use `-e` flag: `docker run -e NEXT_PUBLIC_API_URL=value`

### VPS:
- Create `.env.local` file in project root

---

## Performance Optimization ⚡

### 1. Enable Compression
Already configured in Next.js

### 2. CDN Setup (Vercel/Netlify)
Automatic with these platforms

### 3. Image Optimization
Images are automatically optimized by Next.js

### 4. Caching Headers
Configured in `next.config.js`

---

## SSL/HTTPS Setup 🔒

### Vercel/Netlify:
- Automatic SSL certificates
- No configuration needed

### VPS with Certbot:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Monitoring & Analytics 📊

### Add Google Analytics:
1. Get tracking ID from Google Analytics
2. Add to `app/layout.js`:
   ```javascript
   <Script src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`} />
   ```

### Vercel Analytics:
- Automatically available in Vercel dashboard

---

## Troubleshooting 🔧

### Build Fails:
- Check Node.js version (18.17+)
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`

### Port Already in Use:
```bash
# Find process
lsof -i :3000
# Kill process
kill -9 PID
```

### Production Build Test:
```bash
npm run build
npm start
# Test at http://localhost:3000
```

---

## Post-Deployment Checklist ✅

- [ ] Site loads correctly
- [ ] All links work
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] DNS configured
- [ ] Analytics tracking
- [ ] Performance tested (PageSpeed Insights)
- [ ] SEO metadata verified
- [ ] Social media previews working

---

## Support

For deployment issues:
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Community: [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

**Recommended Platform:** Vercel for best performance and easiest setup
**Estimated Deploy Time:** 5-10 minutes
**Cost:** Free tier available on Vercel and Netlify
