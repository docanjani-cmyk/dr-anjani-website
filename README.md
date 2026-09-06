# Dr. Anjani Dixit - Professional Website

A modern, responsive website for Dr. Anjani Dixit's gynecology practice built with Next.js.

## Features

✅ Professional design optimized for medical practice
✅ Fully responsive (mobile, tablet, desktop)
✅ Easy to edit and customize
✅ Fast performance with Next.js
✅ SEO optimized
✅ Contact form and appointment booking

## Quick Start Guide

### Step 1: Clone This Repository to Your Computer

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/dr-anjani-website.git
cd dr-anjani-website
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website.

### Step 4: Make Changes

Edit the files in the `app/` folder. Your changes will refresh automatically!

### Step 5: Push Changes to GitHub

```bash
git add .
git commit -m "Your message here"
git push origin main
```

Once you push, **Vercel will automatically deploy** your website!

## File Structure

```
dr-anjani-website/
├── app/
│   ├── page.js          # Main homepage (edit this!)
│   ├── layout.js        # Page layout
│   └── globals.css      # Styling
├── package.json         # Project dependencies
├── tailwind.config.js   # Styling configuration
└── README.md            # This file
```

## How to Edit Content

Open `app/page.js` and look for these sections:

- **Hero Section**: Change the main headline and description
- **About Section**: Update Dr. Anjani's bio
- **Services**: Add or remove services
- **Testimonials**: Update patient reviews
- **Contact**: Update clinic information

Just find the text and change it!

## Customize Colors

Colors are in `tailwind.config.js`. Change the `teal` color to your preference.

## Add Your Photos

1. Replace `[Professional Photo]` placeholders with actual images
2. Upload images to the `public/` folder (create it if it doesn't exist)
3. Update the image paths in `app/page.js`

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your website goes live!

## Tell search engines a page changed (IndexNow)

Bing, Yandex, Seznam and Naver accept a ping when a page is new or has changed,
instead of waiting to re-crawl. Google does not participate — for Google, use
Search Console.

```bash
npm run indexnow                      # every URL in the sitemap
npm run indexnow -- /hysterectomy     # just the pages you name
npm run indexnow -- --dry-run         # print what would be sent
```

Run it **after** deploying, not before: the search engine fetches
`public/<key>.txt` from the live site to verify ownership, so a URL that is not
yet live wastes the ping. The key is public by design; it lives in
`scripts/indexnow.mjs` and must match the filename of the key file in `public/`.

## Need Help?

Contact: doc.anjani@gmail.com
Phone: +91 8826734047

---

**Happy coding! 🚀**
