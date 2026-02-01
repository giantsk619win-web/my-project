// ===== Category Page JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  const category = getUrlParam('cat') || 'books';
  initCategoryPage(category);
});

// Get URL parameter
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Initialize category page
function initCategoryPage(category) {
  const meta = categoryMeta[category];
  const items = trendingData[category];

  if (!meta || !items) {
    window.location.href = 'index.html';
    return;
  }

  // Update page title
  document.title = `${meta.name} - Experience Finder`;

  // Update hero section
  updateHero(meta);

  // Update ranking section
  updateRanking(items, category);

  // Update special section if available
  updateSpecialSection(category);

  // Update external links section if available
  updateExternalLinks(category);

  // Update navigation active state
  updateNavigation(category);

  // Initialize scroll animations
  initScrollAnimations();
}

// Update hero section
function updateHero(meta) {
  const heroBg = document.getElementById('heroBg');
  const heroIcon = document.getElementById('heroIcon');
  const heroTitle = document.getElementById('heroTitle');
  const heroText = document.getElementById('heroText');

  if (heroBg) heroBg.src = meta.heroImage;
  if (heroIcon) heroIcon.textContent = meta.icon;
  if (heroTitle) heroTitle.textContent = meta.name;
  if (heroText) heroText.textContent = meta.heroText;
}

// Update ranking section
function updateRanking(items, category) {
  const rankingList = document.querySelector('.ranking-list');
  if (!rankingList) return;

  rankingList.innerHTML = items.map((item, index) => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="ranking-item" style="animation-delay: ${index * 0.1}s">
      <div class="ranking-number">${index + 1}</div>
      <img
        src="${item.image}"
        alt="${item.title}"
        class="ranking-image"
        loading="lazy"
      >
      <div class="ranking-info">
        <h3>${item.title}</h3>
        <p class="author">${item.author || item.director || item.artist || item.venue || item.area || ''}</p>
        <p class="description">${item.description}</p>
        <div class="trend-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>${item.trendReason}</span>
        </div>
      </div>
      <div class="ranking-link-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
    </a>
  `).join('');
}

// Update special section
function updateSpecialSection(category) {
  const specialSection = document.getElementById('specialSection');
  if (!specialSection) return;

  const specialData = specialSections[category];

  if (!specialData) {
    specialSection.style.display = 'none';
    return;
  }

  specialSection.style.display = 'block';

  const specialTitle = document.getElementById('specialTitle');
  if (specialTitle) {
    specialTitle.textContent = specialData.title;
  }

  const specialCards = specialSection.querySelector('.special-cards');
  if (specialCards) {
    specialCards.innerHTML = `
      <div class="special-card">
        <div class="special-card-header">
          <h3>${specialData.title}</h3>
        </div>
        <div class="special-card-content">
          ${specialData.items.map(item => `
            <div class="special-item">
              <strong>${item.title}</strong>
              <p>${item.content}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// External links data
const externalLinks = {
  movies: [
    {
      title: "アカデミー賞公式サイト",
      description: "米国アカデミー賞の最新情報をチェック",
      url: "https://www.oscars.org/",
      icon: "🏆"
    }
  ]
};

// Update external links section
function updateExternalLinks(category) {
  const links = externalLinks[category];
  if (!links || links.length === 0) return;

  const specialSection = document.getElementById('specialSection');
  if (!specialSection) return;

  // Create external links container
  const linksContainer = document.createElement('div');
  linksContainer.className = 'external-links-section';
  linksContainer.innerHTML = `
    <div class="external-links-wrapper">
      ${links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="external-link-card">
          <span class="external-link-icon">${link.icon}</span>
          <div class="external-link-content">
            <h4>${link.title}</h4>
            <p>${link.description}</p>
          </div>
          <svg class="external-link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      `).join('')}
    </div>
  `;

  // Insert after special section
  specialSection.parentNode.insertBefore(linksContainer, specialSection.nextSibling);
}

// Update navigation active state
function updateNavigation(category) {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(`cat=${category}`)) {
      link.style.color = '#fff';
      link.style.position = 'relative';
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
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

  document.querySelectorAll('.ranking-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}
