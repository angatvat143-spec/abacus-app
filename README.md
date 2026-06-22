# To Go Coffee — Website

Production-ready static site. Vanilla HTML/CSS/JS, no build step, no paid libraries.

## ✅ Real brand assets now integrated

- **Logo**: your uploaded sticker-style koala mark, background removed (transparent PNG), used in nav, footer, and all favicons/PWA icons.
  - `assets/images/logo/logo-transparent.png` → full lockup (koala + wordmark), used in nav
  - `assets/images/logo/logo-mark.png` → koala icon only, used for footer + favicons
- **Menu**: full 12-category menu from your physical menu cards is now live in the Menu section — Black Coffee, Cold Coffee, Cold Brew, Hot Brew, Matcha, Iced Coffee, Frappe, Coffee + Tonic, Mocktails, Non-Coffee, Brownies, Add On. All prices match your cards exactly (including dual hot/iced and warm/ice-cream pricing where applicable).
- Original menu card photos kept at `assets/menu-reference/` for your own record — not loaded on the site.

## 📁 What's here

```
index.html       → Home page (all sections)
style.css        → Full design system + responsive + dark mode
script.js        → Theme toggle, scroll reveals, counters, menu tabs
manifest.json    → PWA config
sitemap.xml      → SEO sitemap
robots.txt       → SEO crawl rules
assets/
  images/hero/    → hero background, og-cover.jpg
  images/about/   → founder-cart.jpg
  images/drinks/  → 5 signature drink photos
  images/gallery/ → 6 Instagram-style gallery photos
  icons/          → favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
```

## ⚠️ BEFORE YOU DEPLOY — Required Assets

The site currently references images that don't exist yet. Add these to `assets/`:

| File | Purpose | Suggested size |
|---|---|---|
| `images/hero/og-cover.jpg` | Social share preview | 1200×630 |
| `images/about/founder-cart.jpg` | About section photo | 800×1000 |
| `images/drinks/vietnamese-coffee.jpg` | Drink card (Vietnamese Cold Brew) | 800×600 |
| `images/drinks/cold-brew.jpg` | Drink card (Cold Brew Latte) | 800×600 |
| `images/drinks/frappe.jpg` | Drink card (Classic Frappe) | 800×600 |
| `images/drinks/blueberry-mocha.jpg` | Drink card (Iced Blueberry Mocha) | 800×600 |
| `images/drinks/tonic-coffee.jpg` | Drink card (Espresso Tonic) | 800×600 |
| `images/gallery/g1.jpg` – `g6.jpg` | Instagram grid | 600×600 (square) |

Logo and favicons/PWA icons are already done — generated from your uploaded logo, no action needed there.

Compress all photos (TinyPNG / Squoosh) before upload — keep under ~200KB each for the 95+ Lighthouse target.

## 🔧 Update before going live

1. Replace `https://togocoffee.in/` in `index.html`, `sitemap.xml`, `robots.txt` with your real domain once finalized.
2. WhatsApp links use `918347023216` (i.e. +91 83470 23216) — already wired into every Order button.
3. Google Map embed currently centers on "Vesu, Surat" generically — swap the iframe `src` with the exact Google Maps share-embed link for Phoniex Market once you generate it from Google Maps (Share → Embed a map).
4. Review cards under `#reviews` are placeholder/illustrative — swap in real customer review text once you have permission to use them.
5. Instagram gallery is a static curated grid (not a live feed) — update `g1.jpg`–`g6.jpg` manually whenever you want fresh posts shown. A live auto-syncing feed would need Instagram's Graph API + a backend, which falls outside the zero-cost static stack.

## 🚀 Deploy to GitHub Pages

```bash
# 1. Create a new repo (or use existing) and push this folder
git init
git add .
git commit -m "To Go Coffee — initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/to-go-coffee.git
git push -u origin main

# 2. Enable Pages
# GitHub repo → Settings → Pages → Source: "Deploy from a branch"
# Branch: main, folder: / (root) → Save

# 3. Your site goes live at:
# https://<your-username>.github.io/to-go-coffee/
```

### Using a custom domain (togocoffee.in)
1. In repo → Settings → Pages → Custom domain → enter `togocoffee.in`.
2. At your domain registrar, add:
   - `A` records pointing `@` to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record pointing `www` to `<your-username>.github.io`
3. Wait for DNS propagation (up to 24h), then enable "Enforce HTTPS" in Pages settings.

## 🎨 Design system reference

- **Colors**: dark-dominant theme (`#111827` base) with `#8B0000`/`#B8132C` red accent, `#C89B3C` gold for highlights/numbers, `#4A2C2A` brown, `#FFF8F0` cream (used in light mode).
- **Type**: Bebas Neue (display/headlines) + Archivo (body/UI) — loaded via Google Fonts.
- **Dark/Light toggle**: persists via `localStorage('togo-theme')`, defaults to dark, respects `prefers-color-scheme` on first visit.
- **Signature element**: animated rising "steam" trails in the hero — pure CSS, no JS cost.

## ✅ What's already wired

- Fully responsive: 320px → 4K
- Dark/light mode with smooth transition + saved preference
- Scroll-reveal animations (IntersectionObserver, respects `prefers-reduced-motion`)
- Animated stat counters (4.7★, 58+, 15yrs, 12+)
- Menu category tabs (7 categories, no reload)
- Sticky mobile "Order Now" CTA bar (appears after hero)
- WhatsApp deep-links pre-filled per drink
- Local Business JSON-LD schema for Google
- Open Graph + Twitter Card meta tags
- PWA manifest (installable on mobile)

## 📌 Next phases (not yet built)
- Additional pages (Full Menu page, individual drink pages) if needed beyond the home page
- Real photography integration (currently placeholder paths)
- GSAP/AOS upgrade for more advanced scroll choreography (current implementation uses vanilla IntersectionObserver — already smooth and zero-dependency)
- Swiper.js for touch-swipe review carousel (current grid works on all devices without it)
