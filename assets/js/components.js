
// ============================================
// THE BREW HAVEN - Shared Components
// ============================================

const SITE_DATA_KEY = 'brewHavenSiteData';
let siteData = null;

// SVG Icons
const ICONS = {
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  zoom: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
  arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  shoppingBag: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
};

// ============================================
// DATA LOADER
// ============================================

async function loadSiteData() {
  try {
    const response = await fetch('/content/site.json');
    if (!response.ok) throw new Error('Failed to load site data');
    siteData = await response.json();
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(siteData));
    return siteData;
  } catch (error) {
    console.warn('Using cached or fallback data:', error);
    const cached = localStorage.getItem(SITE_DATA_KEY);
    if (cached) {
      siteData = JSON.parse(cached);
      return siteData;
    }
    return null;
  }
}

function getSiteData() {
  if (siteData) return siteData;
  const cached = localStorage.getItem(SITE_DATA_KEY);
  if (cached) {
    siteData = JSON.parse(cached);
    return siteData;
  }
  return null;
}

// ============================================
// HEADER COMPONENT
// ============================================

function renderHeader() {
  const data = getSiteData();
  if (!data) return;

  const navItems = data.navigation?.items || [];
  const business = data.business || {};

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const headerHTML = `
    <div class="announcement-bar" id="announcement-bar" style="display:none;"></div>
    <header class="header" id="main-header">
      <div class="header-inner">
        <a href="index.html" class="logo" aria-label="${business.name || 'The Brew Haven'} Home">
          <div class="logo-icon">☕</div>
          <span>${business.name || 'The Brew Haven'}</span>
        </a>

        <nav class="nav-desktop" aria-label="Main Navigation">
          ${navItems.map(item => {
            const isActive = currentPage === item.url || (currentPage === '' && item.url === 'index.html');
            return `<a href="${item.url}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
          }).join('')}
        </nav>

        <div class="nav-actions">
          <a href="order.html" class="cart-btn" aria-label="Shopping Cart">
            ${ICONS.cart}
            <span class="cart-count" id="cart-count" style="display:none;">0</span>
          </a>
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile Navigation">
      ${navItems.map(item => {
        const isActive = currentPage === item.url || (currentPage === '' && item.url === 'index.html');
        return `<a href="${item.url}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
      }).join('')}
    </nav>
  `;

  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
    initMobileMenu();
    initHeaderScroll();
    updateCartCount();
    renderAnnouncements();
  }
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('active');
    nav.classList.toggle('active');
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      nav.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

function renderAnnouncements() {
  const data = getSiteData();
  const bar = document.getElementById('announcement-bar');
  if (!bar || !data?.announcements?.length) return;

  const active = data.announcements.filter(a => a.active !== false);
  if (!active.length) return;

  let index = 0;
  bar.style.display = 'block';
  bar.textContent = active[0].text;

  if (active.length > 1) {
    setInterval(() => {
      index = (index + 1) % active.length;
      bar.style.opacity = '0';
      setTimeout(() => {
        bar.textContent = active[index].text;
        bar.style.opacity = '1';
      }, 300);
    }, 5000);
  }
}

// ============================================
// FOOTER COMPONENT
// ============================================

function renderFooter() {
  const data = getSiteData();
  if (!data) return;

  const footer = data.footer || {};
  const business = data.business || {};
  const contact = data.contact || {};
  const navItems = data.navigation?.items || [];

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-icon">☕</div>
              <span>${business.name || 'The Brew Haven'}</span>
            </div>
            <p class="footer-desc">${footer.description || 'Crafting exceptional coffee experiences since day one. Every cup tells a story of passion, quality, and community.'}</p>
            <div class="social-links">
              ${contact.facebook ? `<a href="${contact.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">${ICONS.facebook}</a>` : ''}
              ${contact.instagram ? `<a href="${contact.instagram}" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">${ICONS.instagram}</a>` : ''}
              ${contact.tiktok ? `<a href="${contact.tiktok}" class="social-link" aria-label="TikTok" target="_blank" rel="noopener">${ICONS.tiktok}</a>` : ''}
            </div>
          </div>

          <div>
            <h4 class="footer-title">Quick Links</h4>
            <ul class="footer-links">
              ${navItems.slice(0, 6).map(item => `<li><a href="${item.url}">${item.label}</a></li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="footer-title">Contact</h4>
            ${contact.address ? `<div class="footer-contact-item">${ICONS.mapPin}<span>${contact.address}</span></div>` : ''}
            ${contact.phone ? `<div class="footer-contact-item">${ICONS.phone}<span>${contact.phone}</span></div>` : ''}
            ${contact.email ? `<div class="footer-contact-item">${ICONS.mail}<span>${contact.email}</span></div>` : ''}
          </div>

          <div>
            <h4 class="footer-title">Hours</h4>
            ${(contact.hours || []).map(h => `<div class="footer-contact-item">${ICONS.clock}<span>${h.day}: ${h.time}</span></div>`).join('')}
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">${footer.copyright || `© ${new Date().getFullYear()} ${business.name || 'The Brew Haven'}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  `;

  const container = document.getElementById('footer-container');
  if (container) container.innerHTML = footerHTML;
}

// ============================================
// SEO / META
// ============================================

function setPageSEO(pageKey) {
  const data = getSiteData();
  if (!data?.seo?.pages?.[pageKey]) return;

  const seo = data.seo.pages[pageKey];
  const business = data.business || {};

  if (seo.title) document.title = seo.title;

  const setMeta = (name, content) => {
    if (!content) return;
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const setProperty = (prop, content) => {
    if (!content) return;
    let meta = document.querySelector(`meta[property="${prop}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', prop);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);
  if (seo.canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', seo.canonical);
  }
  setProperty('og:title', seo.title);
  setProperty('og:description', seo.description);
  setProperty('og:image', seo.ogImage);
  setProperty('og:type', 'website');
}

// ============================================
// SCROLL REVEAL
// ============================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ============================================
// CART SYSTEM
// ============================================

const CART_KEY = 'brewHavenCart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCartSidebar();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => 
    c.id === item.id && 
    c.sweetness === item.sweetness && 
    c.ice === item.ice
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateQuantity(index, delta) {
  const cart = getCart();
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderCartSidebar() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-price');
  if (!container) return;

  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        ${ICONS.shoppingBag}
        <p>Your cart is empty</p>
        <p style="font-size:0.875rem; margin-top:0.5rem;">Add items from the menu to get started</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const options = [];
    if (item.sweetness && item.sweetness !== 'Regular') options.push(item.sweetness);
    if (item.ice && item.ice !== 'Regular Ice') options.push(item.ice);
    if (item.addons?.length) options.push(item.addons.join(', '));

    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          ${options.length ? `<div class="cart-item-options">${options.join(' · ')}</div>` : ''}
          <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
        </div>
        <div class="quantity-control">
          <button class="quantity-btn" onclick="updateQuantity(${i}, -1)" aria-label="Decrease quantity">−</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${i}, 1)" aria-label="Increase quantity">+</button>
        </div>
        <button onclick="removeFromCart(${i})" style="color:var(--text-light); padding:0.25rem;" aria-label="Remove item">
          ${ICONS.trash}
        </button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  renderCartSidebar();
}

// ============================================
// LIGHTBOX
// ============================================

let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  lightboxImages = Array.from(items).map(item => ({
    src: item.dataset.src || item.querySelector('img').src,
    alt: item.querySelector('img').alt
  }));

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lightbox || !img) return;

  img.src = lightboxImages[index].src;
  img.alt = lightboxImages[index].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.src = lightboxImages[lightboxIndex].src;
    img.alt = lightboxImages[lightboxIndex].alt;
  }
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.src = lightboxImages[lightboxIndex].src;
    img.alt = lightboxImages[lightboxIndex].alt;
  }
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteData();
  renderHeader();
  renderFooter();
  initScrollReveal();
});
