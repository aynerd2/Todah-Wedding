# TODAH Wedding Website - Quick Start Guide 🎉

## Welcome!

This is a **world-class wedding website** for Taibat & Oluwasegun (TODAH) featuring:
- ✨ Stunning teal and onion pink theme
- 💍 Two wedding events (Traditional & Church)
- 📸 Guest photo upload with wishes
- 💝 Registry and gift information
- ❤️ Beautiful "How We Met" story section
- 📍 Complete venue details and program
- 🎨 Global standard animations and design

## Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

## What's Included

### Pages & Sections:
1. **Hero** - TODAH trademark with wedding dates
2. **Our Story** - How Taibat & Oluwasegun met
3. **Wedding Details** - Both ceremonies with venues
4. **Guest Wishes** - Photo upload + messages
5. **Registry** - Gift registry and bank details
6. **Footer** - Contact and social links

### Key Features:
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Teal (#14b8a6) and Onion Pink (#ec4899) colors
- ✨ Smooth animations with Framer Motion
- 📸 Cloudinary image optimization ready
- 💳 Payment details section
- 🎁 Registry information

## Color Codes

### Traditional Wedding (June 18th):
- **Primary**: Onion Pink (#ec4899)
- **Secondary**: Teal (#14b8a6)

### Church Wedding (July 4th):
- **Theme**: All Shades of Blue

## Customization

### Add Photos:
1. Place images in `public/images/`
2. Update image paths in components
3. For "How We Met" section, add to `public/images/story/`

### Update Content:
- **Couple info**: Edit `components/Hero.tsx`
- **Story**: Edit `components/OurStory.tsx`
- **Venues**: Edit `components/WeddingDetails.tsx`
- **Registry**: Edit `components/Registry.tsx`

### Add Cloudinary:
1. Get credentials from cloudinary.com
2. Create `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

## Deployment

### Deploy to Vercel:
```bash
# Push to GitHub first
git init
git add .
git commit -m "TODAH wedding website"
git push

# Then import to Vercel
# Visit vercel.com and import your repo
```

## Project Structure
```
todah-wedding/
├── app/
│   ├── globals.css          # Styles with teal/pink theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Hero.tsx             # Landing with TODAH
│   ├── Navigation.tsx       # Menu
│   ├── OurStory.tsx         # Love story
│   ├── WeddingDetails.tsx   # Event info
│   ├── GuestWishes.tsx      # Photo upload
│   ├── Registry.tsx         # Gifts
│   └── Footer.tsx           # Footer
├── public/
│   └── images/              # Add photos here
└── package.json             # Dependencies
```

## Support

Need help? Check the full documentation files included:
- `SETUP_GUIDE.md` - Detailed setup
- `DEPLOYMENT.md` - Deploy to Vercel
- `CUSTOMIZATION.md` - Customize colors & content

## Features Checklist

- [x] TODAH branding
- [x] Dual wedding events
- [x] Teal and onion pink colors
- [x] Guest photo uploads
- [x] Wishes/messages section
- [x] Registry information
- [x] Bank account details
- [x] Venue information
- [x] Wedding program
- [x] Responsive design
- [x] Smooth animations
- [x] SEO optimized

## Wedding Details

### Traditional Wedding:
- **Date**: Thursday, June 18th, 2025
- **Time**: 10:00 AM
- **Venue**: The Amazing Place Event Centre
- **Address**: Opp. 1st Weli-Weli Block Industry, Oda Road, Akure
- **Colors**: Onion Pink & Teal
- **Reception**: Follows afterwards

### Church Wedding:
- **Date**: Friday, July 4th, 2025
- **Time**: 11:00 AM
- **Venue**: RCCG Church Without Walls
- **Address**: PL2 2BR
- **Colors**: All Shades of Blue
- **After Party**: Praise party follows

## Trademark

**TODAH** - Taibat & Oluwasegun's special wedding brand! 💍

---

**Your beautiful wedding website is ready!** 🎉💕
