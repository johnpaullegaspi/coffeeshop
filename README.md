# The Brew Haven

A premium, fully responsive multi-page coffee and milk tea shop website built with HTML, CSS, and JavaScript. Integrated with Sveltia CMS for easy content management via a single JSON file.

## Features

- **Single CMS Entry**: All content lives in `content/site.json`. One publish updates every page.
- **9 Pages**: Home, About, Menu, Reservations, Order Online, Promotions, Gallery, Reviews, Contact
- **Netlify Forms**: Ready for reservation and order submissions
- **Responsive Design**: Optimized for mobile, tablet, laptop, and desktop
- **Premium Design**: Warm, luxurious atmosphere with smooth animations
- **SEO Ready**: Editable meta titles, descriptions, keywords, and Open Graph images
- **Cart System**: Add to cart with customization (sweetness, ice, add-ons)
- **Gallery Lightbox**: Full-screen image viewing with navigation
- **Accessibility**: Semantic HTML, focus states, reduced motion support

## File Structure

```
/
├── index.html
├── about.html
├── menu.html
├── reservation.html
├── order.html
├── promotions.html
├── gallery.html
├── reviews.html
├── contact.html
├── 404.html
├── thank-you.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── components.js
│       └── main.js
├── content/
│   └── site.json
├── admin/
│   ├── index.html
│   └── config.yml
├── netlify.toml
└── README.md
```

## Deployment to Netlify

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your Git repository
5. Build command: leave empty (static site)
6. Publish directory: `/` (root)
7. Click "Deploy site"

### Enable Netlify Identity & Git Gateway

1. In Netlify, go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Go to **Services** → **Git Gateway** and click **Enable Git Gateway**
4. Invite yourself as a user to access `/admin`

### Enable Netlify Forms

Netlify Forms work automatically. The forms in `reservation.html`, `order.html`, and `contact.html` are already configured with `data-netlify="true"`.

## CMS Usage

1. Visit `https://your-site.netlify.app/admin`
2. Log in with Netlify Identity
3. Edit **Site Content** → **All Site Content**
4. Make changes to any section (menu, promotions, SEO, etc.)
5. Click **Publish** once
6. All pages update automatically

## Customization

All editable content is centralized in `content/site.json`. The JavaScript loader (`assets/js/components.js`) reads this file and populates every page dynamically. No HTML content duplication.

## Performance

- Lazy loading on all images
- Optimized CSS with CSS variables
- Semantic HTML for SEO
- Smooth scroll-triggered animations
