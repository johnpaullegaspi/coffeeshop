
// ============================================
// THE BREW HAVEN - Main JavaScript
// Page-specific logic and interactions
// ============================================

// ============================================
// HOME PAGE
// ============================================

function initHomePage() {
  const data = getSiteData();
  if (!data) return;

  renderHero(data.homepage?.hero);
  renderFeaturedProducts(data.featuredProducts);
  renderBestSellers(data.menu?.filter(i => i.bestSeller));
  renderPromotionsPreview(data.promotions?.filter(p => p.status === 'active').slice(0, 3));
  renderAboutPreview(data.aboutPage);
  renderGalleryPreview(data.gallery?.slice(0, 6));
  renderReviews(data.testimonials?.slice(0, 3));
  renderNewsletter();
}

function renderHero(hero) {
  const container = document.getElementById('hero-container');
  if (!container || !hero) return;

  container.innerHTML = `
    <div class="hero-bg">
      <img src="${hero.image}" alt="${hero.title}" loading="eager">
    </div>
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="hero-content">
        <span class="hero-label">${hero.label || 'Welcome to'}</span>
        <h1 class="hero-title">${hero.title || 'The Brew <em>Haven</em>'}</h1>
        <p class="hero-desc">${hero.description || 'Where every cup is crafted with passion and every visit feels like coming home.'}</p>
        <div class="hero-actions">
          <a href="menu.html" class="btn btn-primary btn-lg">View Menu</a>
          <a href="reservation.html" class="btn btn-secondary btn-lg">Reserve a Table</a>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      ${ICONS.arrowDown}
    </div>
  `;
}

function renderFeaturedProducts(products) {
  const container = document.getElementById('featured-products');
  if (!container || !products?.length) return;

  container.innerHTML = products.slice(0, 4).map((p, i) => `
    <div class="card reveal stagger-${(i % 4) + 1}">
      <div class="card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="card-badge badge-${p.badge.type}">${p.badge.text}</span>` : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-text">${p.description}</p>
        <div class="card-footer">
          <span class="card-price">$${p.price}</span>
          <a href="order.html" class="btn btn-sm btn-primary">Order Now</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBestSellers(items) {
  const container = document.getElementById('bestsellers-container');
  if (!container || !items?.length) return;

  container.innerHTML = items.slice(0, 4).map((item, i) => `
    <div class="card reveal stagger-${(i % 4) + 1}">
      <div class="card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="card-badge badge-bestseller">Best Seller</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-text">${item.description}</p>
        <div class="card-footer">
          <span class="card-price">$${item.priceRegular}<span> / $${item.priceLarge} L</span></span>
          <button class="btn btn-sm btn-primary" onclick="openOrderModal('${item.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderPromotionsPreview(promos) {
  const container = document.getElementById('promos-preview');
  if (!container || !promos?.length) return;

  container.innerHTML = promos.map((p, i) => `
    <div class="promo-card reveal stagger-${(i % 3) + 1}">
      <div class="promo-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="promo-content">
        <div class="promo-dates">${formatDate(p.startDate)} – ${formatDate(p.endDate)}</div>
        <h3 class="promo-title">${p.title}</h3>
        <p class="promo-desc">${p.description}</p>
        ${p.code ? `<div class="promo-code">${ICONS.copy} ${p.code}</div>` : ''}
        <a href="promotions.html" class="btn btn-sm btn-secondary" style="margin-top:auto;">View Details</a>
      </div>
    </div>
  `).join('');
}

function renderAboutPreview(about) {
  const container = document.getElementById('about-preview');
  if (!container || !about) return;

  container.innerHTML = `
    <div class="about-grid">
      <div class="about-image reveal">
        <img src="${about.previewImage || about.storyImage}" alt="About Us" loading="lazy">
      </div>
      <div class="reveal stagger-2">
        <span class="section-label">Our Story</span>
        <h2 class="section-title">${about.storyTitle || 'Crafted with Passion'}</h2>
        <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">${about.story?.substring(0, 300)}...</p>
        <a href="about.html" class="btn btn-secondary">Read Our Story</a>
      </div>
    </div>
  `;
}

function renderGalleryPreview(images) {
  const container = document.getElementById('gallery-preview');
  if (!container || !images?.length) return;

  container.innerHTML = images.map((img, i) => `
    <div class="gallery-item reveal stagger-${(i % 3) + 1}" data-src="${img.src}">
      <img src="${img.thumbnail || img.src}" alt="${img.alt || img.category}" loading="lazy">
      <div class="gallery-overlay">${ICONS.zoom}</div>
    </div>
  `).join('');

  initLightbox();
}

function renderReviews(reviews) {
  const container = document.getElementById('reviews-container');
  if (!container || !reviews?.length) return;

  container.innerHTML = reviews.map((r, i) => `
    <div class="review-card reveal stagger-${(i % 3) + 1}">
      <div class="review-stars">${renderStars(r.rating)}</div>
      <p class="review-text">"${r.comment}"</p>
      <div class="review-author">
        <img src="${r.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}" alt="${r.name}" class="review-avatar" loading="lazy">
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-role">${r.role || 'Verified Customer'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderNewsletter() {
  const container = document.getElementById('newsletter-container');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <h2 class="newsletter-title reveal">Stay in the Loop</h2>
      <p class="newsletter-desc reveal">Subscribe for exclusive offers, new menu updates, and brewing tips delivered to your inbox.</p>
      <form class="newsletter-form reveal" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field">
        <p class="hidden" style="display:none;"><input name="bot-field" /></p>
        <input type="email" name="email" placeholder="Enter your email" required aria-label="Email address">
        <button type="submit" class="btn btn-gold">Subscribe</button>
      </form>
    </div>
  `;
}

// ============================================
// MENU PAGE
// ============================================

let currentMenuFilter = 'all';
let currentMenuSearch = '';

function initMenuPage() {
  const data = getSiteData();
  if (!data) return;

  renderMenuCategories(data.categories);
  renderMenuItems(data.menu);
  initMenuFilters();
  initMenuSearch();
}

function renderMenuCategories(categories) {
  const container = document.getElementById('menu-filters');
  if (!container || !categories?.length) return;

  container.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    ${categories.map(c => `<button class="filter-btn" data-filter="${c.id}">${c.name}</button>`).join('')}
  `;
}

function renderMenuItems(items) {
  const container = document.getElementById('menu-grid');
  if (!container || !items?.length) return;

  const filtered = items.filter(item => {
    const matchesFilter = currentMenuFilter === 'all' || item.category === currentMenuFilter;
    const matchesSearch = !currentMenuSearch || 
      item.name.toLowerCase().includes(currentMenuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(currentMenuSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:4rem 1rem; color:var(--text-light);">
        <p style="font-size:1.25rem; margin-bottom:0.5rem;">No items found</p>
        <p>Try adjusting your search or filter</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="menu-item" data-category="${item.category}">
      <div class="menu-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        ${item.bestSeller ? '<span class="card-badge badge-bestseller">Best Seller</span>' : ''}
        ${item.newItem ? '<span class="card-badge badge-new">New</span>' : ''}
        ${!item.available ? '<div style="position:absolute;inset:0;background:rgba(44,30,20,0.6);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">Out of Stock</div>' : ''}
      </div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">$${item.priceRegular}</span>
        </div>
        <p class="menu-item-desc">${item.description}</p>
        <div class="menu-item-meta">
          ${item.calories ? `<span>${item.calories} cal</span>` : ''}
          ${item.category ? `<span style="text-transform:capitalize;">${item.category}</span>` : ''}
        </div>
        <div class="menu-item-actions">
          ${item.available 
            ? `<button class="btn btn-sm btn-primary" onclick="openOrderModal('${item.id}')">Add to Cart</button>`
            : `<button class="btn btn-sm" style="opacity:0.5; cursor:not-allowed;" disabled>Unavailable</button>`
          }
          <a href="order.html" class="btn btn-sm btn-secondary">Order</a>
        </div>
      </div>
    </div>
  `).join('');
}

function initMenuFilters() {
  const container = document.getElementById('menu-filters');
  if (!container) return;

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentMenuFilter = e.target.dataset.filter;
      renderMenuItems(getSiteData()?.menu);
    }
  });
}

function initMenuSearch() {
  const input = document.getElementById('menu-search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    currentMenuSearch = e.target.value;
    renderMenuItems(getSiteData()?.menu);
  });
}

// ============================================
// ORDER MODAL
// ============================================

let currentOrderItem = null;

function openOrderModal(itemId) {
  const data = getSiteData();
  const item = data?.menu?.find(m => m.id === itemId);
  if (!item) return;

  currentOrderItem = item;
  const modal = document.getElementById('order-modal');
  const body = document.getElementById('order-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display:flex; gap:1rem; margin-bottom:1.5rem;">
      <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; border-radius:var(--radius-sm);">
      <div>
        <h3 style="font-family:var(--font-heading); color:var(--coffee-brown); margin-bottom:0.25rem;">${item.name}</h3>
        <p style="font-size:0.875rem; color:var(--text-secondary);">${item.description}</p>
        <p style="font-weight:700; color:var(--caramel); margin-top:0.5rem;">$${item.priceRegular}</p>
      </div>
    </div>

    ${item.sweetnessOptions?.length ? `
      <div class="option-group">
        <label class="option-label">Sweetness Level</label>
        <div class="option-buttons" id="sweetness-options">
          ${item.sweetnessOptions.map((opt, i) => `
            <button class="option-btn ${i === Math.floor(item.sweetnessOptions.length/2) ? 'active' : ''}" data-value="${opt}">${opt}</button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${item.iceOptions?.length ? `
      <div class="option-group">
        <label class="option-label">Ice Level</label>
        <div class="option-buttons" id="ice-options">
          ${item.iceOptions.map((opt, i) => `
            <button class="option-btn ${i === 0 ? 'active' : ''}" data-value="${opt}">${opt}</button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${item.addons?.length ? `
      <div class="option-group">
        <label class="option-label">Add-ons</label>
        <div class="option-buttons" id="addon-options">
          ${item.addons.map(addon => `
            <button class="option-btn" data-value="${addon.name}" data-price="${addon.price}">${addon.name} (+$${addon.price})</button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div class="option-group">
      <label class="option-label">Quantity</label>
      <div class="quantity-control">
        <button class="quantity-btn" onclick="updateModalQuantity(-1)">−</button>
        <span class="quantity-value" id="modal-quantity">1</span>
        <button class="quantity-btn" onclick="updateModalQuantity(1)">+</button>
      </div>
    </div>
  `;

  body.querySelectorAll('.option-buttons').forEach(group => {
    group.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-btn')) {
        const multi = group.id === 'addon-options';
        if (!multi) {
          group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        }
        e.target.classList.toggle('active');
      }
    });
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentOrderItem = null;
}

function updateModalQuantity(delta) {
  const el = document.getElementById('modal-quantity');
  if (!el) return;
  let val = parseInt(el.textContent) + delta;
  if (val < 1) val = 1;
  if (val > 20) val = 20;
  el.textContent = val;
}

function confirmAddToCart() {
  if (!currentOrderItem) return;

  const sweetnessEl = document.querySelector('#sweetness-options .option-btn.active');
  const iceEl = document.querySelector('#ice-options .option-btn.active');
  const addonEls = document.querySelectorAll('#addon-options .option-btn.active');
  const quantity = parseInt(document.getElementById('modal-quantity')?.textContent || '1');

  let price = parseFloat(currentOrderItem.priceRegular);
  const addons = [];
  addonEls.forEach(el => {
    addons.push(el.dataset.value);
    price += parseFloat(el.dataset.price || 0);
  });

  addToCart({
    id: currentOrderItem.id,
    name: currentOrderItem.name,
    image: currentOrderItem.image,
    price: price,
    quantity: quantity,
    sweetness: sweetnessEl?.dataset.value || 'Regular',
    ice: iceEl?.dataset.value || 'Regular Ice',
    addons: addons
  });

  closeOrderModal();
  showToast(`${currentOrderItem.name} added to cart!`);
}

function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--coffee-brown);
    color: var(--warm-white);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    font-weight: 500;
    animation: fadeInUp 0.4s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// ORDER PAGE
// ============================================

function initOrderPage() {
  const data = getSiteData();
  if (!data) return;

  renderOrderMenu(data.menu);
  renderCartSidebar();
  initOrderForm();
}

function renderOrderMenu(items) {
  const container = document.getElementById('order-menu-grid');
  if (!container || !items?.length) return;

  container.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        ${item.bestSeller ? '<span class="card-badge badge-bestseller">Best Seller</span>' : ''}
        ${item.newItem ? '<span class="card-badge badge-new">New</span>' : ''}
      </div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">$${item.priceRegular}</span>
        </div>
        <p class="menu-item-desc">${item.description}</p>
        <button class="btn btn-sm btn-primary" style="width:100%;" onclick="openOrderModal('${item.id}')">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function initOrderForm() {
  const form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const cart = getCart();
    if (!cart.length) {
      e.preventDefault();
      showToast('Your cart is empty!');
      return;
    }

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'cart_data';
    input.value = JSON.stringify(cart);
    form.appendChild(input);

    clearCart();
  });
}

// ============================================
// RESERVATION PAGE
// ============================================

function initReservationPage() {
  const data = getSiteData();
  if (!data) return;

  const form = document.getElementById('reservation-form');
  if (!form) return;

  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }
}

// ============================================
// ABOUT PAGE
// ============================================

function initAboutPage() {
  const data = getSiteData();
  if (!data) return;

  const about = data.aboutPage || {};

  renderAboutHero(about);
  renderStory(about);
  renderValues(data.values);
  renderTeam(data.team);
}

function renderAboutHero(about) {
  const container = document.getElementById('about-hero');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <span class="section-label">About Us</span>
      <h1 class="section-title">${about.pageTitle || 'Our Story'}</h1>
      <p class="section-subtitle">${about.pageSubtitle || 'A journey of passion, quality, and community.'}</p>
    </div>
  `;
}

function renderStory(about) {
  const container = document.getElementById('about-story');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-image reveal">
          <img src="${about.storyImage}" alt="Our Story" loading="lazy">
        </div>
        <div class="reveal stagger-2">
          <span class="section-label">The Beginning</span>
          <h2>${about.storyTitle || 'How It All Started'}</h2>
          <p style="color:var(--text-secondary); line-height:1.8; margin-bottom:1rem;">${about.story || ''}</p>
          <p style="color:var(--text-secondary); line-height:1.8;">${about.mission || ''}</p>
        </div>
      </div>
    </div>
  `;
}

function renderValues(values) {
  const container = document.getElementById('about-values');
  if (!container || !values?.length) return;

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">What We Believe</span>
        <h2 class="section-title">Our Values</h2>
      </div>
      <div class="values-grid">
        ${values.map((v, i) => `
          <div class="value-card reveal stagger-${(i % 3) + 1}">
            <div class="value-icon">${ICONS[v.icon] || ICONS.heart}</div>
            <h3 style="font-family:var(--font-heading); color:var(--coffee-brown); margin-bottom:0.5rem;">${v.title}</h3>
            <p style="color:var(--text-secondary); font-size:0.937rem; line-height:1.6;">${v.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTeam(team) {
  const container = document.getElementById('about-team');
  if (!container || !team?.length) return;

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">The People</span>
        <h2 class="section-title">Meet Our Team</h2>
      </div>
      <div class="team-grid">
        ${team.map((member, i) => `
          <div class="team-card reveal stagger-${(i % 4) + 1}">
            <div class="team-photo">
              <img src="${member.photo}" alt="${member.name}" loading="lazy">
            </div>
            <div class="team-name">${member.name}</div>
            <div class="team-role">${member.role}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================
// PROMOTIONS PAGE
// ============================================

function initPromotionsPage() {
  const data = getSiteData();
  if (!data) return;

  const container = document.getElementById('promotions-grid');
  if (!container || !data.promotions?.length) return;

  const activePromos = data.promotions.filter(p => p.status === 'active');

  container.innerHTML = activePromos.map((p, i) => `
    <div class="promo-card reveal stagger-${(i % 3) + 1}">
      <div class="promo-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="promo-content">
        <div class="promo-dates">${formatDate(p.startDate)} – ${formatDate(p.endDate)}</div>
        <h3 class="promo-title">${p.title}</h3>
        <p class="promo-desc">${p.description}</p>
        ${p.code ? `
          <div class="promo-code" onclick="copyPromoCode('${p.code}')" style="cursor:pointer;">
            ${ICONS.copy} <span id="code-${p.code}">${p.code}</span>
          </div>
        ` : ''}
        <a href="order.html" class="btn btn-sm btn-primary" style="margin-top:auto;">Order Now</a>
      </div>
    </div>
  `).join('');
}

function copyPromoCode(code) {
  navigator.clipboard?.writeText(code);
  showToast(`Promo code ${code} copied!`);
}

// ============================================
// GALLERY PAGE
// ============================================

function initGalleryPage() {
  const data = getSiteData();
  if (!data) return;

  const container = document.getElementById('gallery-grid');
  if (!container || !data.gallery?.length) return;

  const categories = [...new Set(data.gallery.map(g => g.category))];

  const filterContainer = document.getElementById('gallery-filters');
  if (filterContainer) {
    filterContainer.innerHTML = `
      <button class="filter-btn active" data-filter="all">All</button>
      ${categories.map(c => `<button class="filter-btn" data-filter="${c}">${c}</button>`).join('')}
    `;

    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGalleryItems(data.gallery, e.target.dataset.filter);
      }
    });
  }

  renderGalleryItems(data.gallery, 'all');
}

function renderGalleryItems(images, filter) {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);

  container.innerHTML = filtered.map((img, i) => `
    <div class="gallery-item reveal stagger-${(i % 4) + 1}" data-src="${img.src}">
      <img src="${img.thumbnail || img.src}" alt="${img.alt || img.category}" loading="lazy">
      <div class="gallery-overlay">${ICONS.zoom}</div>
    </div>
  `).join('');

  initLightbox();
}

// ============================================
// REVIEWS PAGE
// ============================================

function initReviewsPage() {
  const data = getSiteData();
  if (!data) return;

  const container = document.getElementById('reviews-grid');
  if (!container || !data.testimonials?.length) return;

  container.innerHTML = data.testimonials.map((r, i) => `
    <div class="review-card reveal stagger-${(i % 3) + 1}">
      <div class="review-stars">${renderStars(r.rating)}</div>
      <p class="review-text">"${r.comment}"</p>
      <div class="review-author">
        <img src="${r.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}" alt="${r.name}" class="review-avatar" loading="lazy">
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-role">${r.role || 'Verified Customer'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// CONTACT PAGE
// ============================================

function initContactPage() {
  const data = getSiteData();
  if (!data) return;

  const contact = data.contact || {};

  renderContactInfo(contact);
  renderMap(contact);
  renderContactForm();
}

function renderContactInfo(contact) {
  const container = document.getElementById('contact-info');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-info-card">
      ${contact.address ? `
        <div class="contact-info-item">
          <div class="contact-info-icon">${ICONS.mapPin}</div>
          <div class="contact-info-text">
            <h4>Address</h4>
            <p>${contact.address}</p>
          </div>
        </div>
      ` : ''}
      ${contact.phone ? `
        <div class="contact-info-item">
          <div class="contact-info-icon">${ICONS.phone}</div>
          <div class="contact-info-text">
            <h4>Phone</h4>
            <p><a href="tel:${contact.phone}">${contact.phone}</a></p>
          </div>
        </div>
      ` : ''}
      ${contact.email ? `
        <div class="contact-info-item">
          <div class="contact-info-icon">${ICONS.mail}</div>
          <div class="contact-info-text">
            <h4>Email</h4>
            <p><a href="mailto:${contact.email}">${contact.email}</a></p>
          </div>
        </div>
      ` : ''}
    </div>

    <div class="contact-info-card">
      <h4 style="font-family:var(--font-heading); color:var(--coffee-brown); margin-bottom:1rem;">Business Hours</h4>
      <div class="hours-list">
        ${(contact.hours || []).map(h => `
          <div class="hours-item">
            <span>${h.day}</span>
            <span>${h.time}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="contact-info-card">
      <h4 style="font-family:var(--font-heading); color:var(--coffee-brown); margin-bottom:1rem;">Follow Us</h4>
      <div class="social-links">
        ${contact.facebook ? `<a href="${contact.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">${ICONS.facebook}</a>` : ''}
        ${contact.instagram ? `<a href="${contact.instagram}" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">${ICONS.instagram}</a>` : ''}
        ${contact.tiktok ? `<a href="${contact.tiktok}" class="social-link" aria-label="TikTok" target="_blank" rel="noopener">${ICONS.tiktok}</a>` : ''}
      </div>
      <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
        ${contact.phone ? `<a href="tel:${contact.phone}" class="btn btn-sm btn-primary">Call Us</a>` : ''}
        ${contact.mapsUrl ? `<a href="${contact.mapsUrl}" class="btn btn-sm btn-secondary" target="_blank" rel="noopener">Get Directions</a>` : ''}
      </div>
    </div>
  `;
}

function renderMap(contact) {
  const container = document.getElementById('contact-map');
  if (!container) return;

  const embedUrl = contact.mapEmbed || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353883!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus`;

  container.innerHTML = `
    <div class="map-container">
      <iframe src="${embedUrl}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Location Map"></iframe>
    </div>
  `;
}

function renderContactForm() {
  const container = document.getElementById('contact-form-container');
  if (!container) return;

  container.innerHTML = `
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="reveal">
      <p class="hidden" style="display:none;"><input name="bot-field" /></p>
      <input type="hidden" name="form-name" value="contact">

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input type="text" name="name" class="form-input" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" name="email" class="form-input" placeholder="your@email.com" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Subject</label>
        <input type="text" name="subject" class="form-input" placeholder="How can we help?" required>
      </div>

      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea name="message" class="form-textarea" placeholder="Tell us more..." required></textarea>
      </div>

      <button type="submit" class="btn btn-primary" style="width:100%;">Send Message</button>
    </form>
  `;
}

// ============================================
// UTILITIES
// ============================================

function renderStars(rating) {
  return Array(5).fill(0).map((_, i) => `
    <span style="color:${i < rating ? 'var(--muted-gold)' : 'var(--beige)'}">${ICONS.star}</span>
  `).join('');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ============================================
// PAGE ROUTER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('index') || path === '/' || path === '') {
    setPageSEO('home');
    initHomePage();
  } else if (path.includes('about')) {
    setPageSEO('about');
    initAboutPage();
  } else if (path.includes('menu')) {
    setPageSEO('menu');
    initMenuPage();
  } else if (path.includes('order')) {
    setPageSEO('order');
    initOrderPage();
  } else if (path.includes('reservation')) {
    setPageSEO('reservation');
    initReservationPage();
  } else if (path.includes('promotions')) {
    setPageSEO('promotions');
    initPromotionsPage();
  } else if (path.includes('gallery')) {
    setPageSEO('gallery');
    initGalleryPage();
  } else if (path.includes('reviews')) {
    setPageSEO('reviews');
    initReviewsPage();
  } else if (path.includes('contact')) {
    setPageSEO('contact');
    initContactPage();
  }
});

// Close modals on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeOrderModal();
  }
});

// Close modals on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lightbox')) closeLightbox();
  if (e.target.classList.contains('modal-overlay')) closeOrderModal();
});
