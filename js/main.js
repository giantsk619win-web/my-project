// ===== Main JavaScript for Experience Finder =====

document.addEventListener('DOMContentLoaded', () => {
  initCategoryCards();
  initPickupSection();
  initScrollAnimations();
});

// Initialize category cards with premium design
function initCategoryCards() {
  const categories = ['books', 'movies', 'music', 'theater', 'tech', 'travel'];
  const grid = document.querySelector('.categories-grid');

  if (!grid) return;

  grid.innerHTML = categories.map((cat, index) => {
    const meta = categoryMeta[cat];
    const topItem = trendingData[cat][0];

    return `
      <a href="category.html?cat=${cat}" class="category-card" style="animation-delay: ${index * 0.1}s">
        <img
          src="${meta.cardImage}"
          alt="${meta.name}"
          class="category-card-image"
          loading="lazy"
        >
        <div class="category-card-content">
          <div class="category-icon">${meta.icon}</div>
          <h3>${meta.name}</h3>
          <p>${meta.description}</p>
          ${topItem ? `<div class="category-badge">NOW: ${topItem.title}</div>` : ''}
        </div>
      </a>
    `;
  }).join('');
}

// Initialize pickup section with featured items
function initPickupSection() {
  const pickupGrid = document.querySelector('.pickup-grid');

  if (!pickupGrid) return;

  // Get featured items from each category
  const pickupItems = [];
  const categories = ['travel', 'movies', 'books', 'theater', 'music', 'tech'];

  categories.forEach(cat => {
    const items = trendingData[cat];
    if (items && items.length > 0) {
      pickupItems.push({
        ...items[0],
        category: cat,
        categoryName: categoryMeta[cat].name
      });
    }
  });

  // Sort by score and take top items
  pickupItems.sort((a, b) => b.score - a.score);

  pickupGrid.innerHTML = pickupItems.slice(0, 6).map((item, index) => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="pickup-card" style="animation-delay: ${index * 0.1}s">
      <div class="pickup-image-wrapper">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="pickup-image"
          loading="lazy"
        >
        <span class="pickup-category-tag">${item.categoryName}</span>
      </div>
      <div class="pickup-content">
        <h3 class="pickup-title">${item.title}</h3>
        <p class="pickup-description">${item.description}</p>
        <div class="pickup-footer">
          <div class="trend-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>${item.trendReason}</span>
          </div>
          <span class="external-link-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </span>
        </div>
      </div>
    </a>
  `).join('');
}

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards for animation
  document.querySelectorAll('.category-card, .pickup-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Utility functions
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
