# VR Realm - Landing Page

A sophisticated, engaging landing page for VR Realm - an immersive virtual reality experience business.

## 🚀 Features

- **Modern Design**: Sleek dark theme with elegant glassmorphism effects
- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Tracking Built-in**: 
  - UTM parameter tracking (source, medium, campaign)
  - Visitor location detection (country, city, region)
  - Event tracking for CTAs
  - Session management
  - Vercel Analytics integration
- **Responsive**: Fully responsive design for all devices
- **Performance Optimized**: Next.js with automatic optimizations

## 📦 Getting Started

### Installation

```bash
cd VR
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## 🎨 Customization

### Booking Link

Update the booking link in `app/page.tsx`:

```typescript
const BOOKING_LINK = 'https://calendly.com/your-booking-link'
```

### Video Section

Replace the video placeholder in the `VideoSection` component with your actual video embed:

```tsx
<iframe 
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
  allowFullScreen 
/>
```

### Social Links

Update the footer social media links in the `Footer` component.

### Reviews

Customize the testimonials in the `ReviewsSection` component's `reviews` array.

## 📊 Tracking

### UTM Parameters

The site automatically tracks these UTM parameters:
- `utm_source` - Traffic source (e.g., instagram, facebook)
- `utm_medium` - Marketing medium (e.g., social, cpc)
- `utm_campaign` - Campaign name

Example URL:
```
https://yoursite.com?utm_source=instagram&utm_medium=social&utm_campaign=launch
```

### Location Tracking

Visitor location is automatically detected using IP geolocation.

### Viewing Analytics

- **Vercel Analytics**: View in your Vercel dashboard after deployment
- **Local Storage**: Event and visit data stored in browser's localStorage
  - `vr_visits` - Page visit history
  - `vr_events` - Event tracking history

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🎯 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Background | `#2a2d3a` | Primary background |
| Gray | `#6b7280` | Secondary text |
| White | `#ffffff` | Primary text |
| CTA Orange | `#FF6B35` | Call-to-action buttons |

## 📁 Project Structure

```
VR/
├── app/
│   ├── globals.css      # Global styles & Tailwind
│   ├── layout.tsx       # Root layout with fonts & analytics
│   └── page.tsx         # Main landing page
├── components/
│   └── TrackingProvider.tsx  # Tracking context & utilities
├── public/              # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 📝 License

Private - All rights reserved.

