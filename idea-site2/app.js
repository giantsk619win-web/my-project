// ===========================
// Idea Forest - アプリケーションロジック
// ===========================

const STORAGE_KEY = 'idea-oasis-data';

const CATEGORIES = ['experience', 'place', 'action', 'content'];

// --- データ管理 ---

function loadIdeas() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return { experience: [], place: [], action: [], content: [], ...parsed };
  } catch {
    return { experience: [], place: [], action: [], content: [] };
  }
}

function saveIdeas(ideas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

function addIdea(category, text) {
  const ideas = loadIdeas();
  ideas[category].push({
    id: Date.now().toString(),
    text: text.trim(),
    status: 'not-yet',
    createdAt: new Date().toISOString()
  });
  saveIdeas(ideas);
  return ideas;
}

function toggleIdeaStatus(category, id) {
  const ideas = loadIdeas();
  const idea = ideas[category].find(item => item.id === id);
  if (idea) {
    idea.status = idea.status === 'done' ? 'not-yet' : 'done';
    saveIdeas(ideas);
  }
  return ideas;
}

function deleteIdea(category, id) {
  const ideas = loadIdeas();
  ideas[category] = ideas[category].filter(item => item.id !== id);
  saveIdeas(ideas);
  return ideas;
}

// --- DOM描画 ---

function renderIdeas(category, ideas) {
  const list = document.querySelector(`.idea-list[data-category="${category}"]`);
  const items = ideas[category];
  const sorted = [...items].sort((a, b) => (a.status === 'done') - (b.status === 'done'));

  if (sorted.length === 0) {
    list.innerHTML = '<li class="idea-empty">まだアイデアがありません。最初の一歩を踏み出しましょう。</li>';
  } else {
    list.innerHTML = sorted.map(item => `
      <li class="idea-item ${item.status === 'done' ? 'done' : ''}" data-id="${item.id}">
        <span class="idea-text">${linkify(item.text, item.linkTitles)}</span>
        <button class="idea-status ${item.status}" data-category="${category}" data-id="${item.id}">
          ${item.status === 'done' ? 'Done' : 'Not Yet'}
        </button>
        <button class="idea-delete" data-category="${category}" data-id="${item.id}" title="削除">
          &times;
        </button>
      </li>
    `).join('');
  }

  updateCardCount(category, items.length);
}

function renderAll() {
  const ideas = loadIdeas();
  CATEGORIES.forEach(cat => renderIdeas(cat, ideas));
  updateAchievementCounter();
}

function updateCardCount(category, count) {
  const countEl = document.querySelector(`.card-count[data-category="${category}"]`);
  if (countEl) {
    countEl.textContent = `${count} idea${count !== 1 ? 's' : ''}`;
  }
}

function updateAchievementCounter() {
  const ideas = loadIdeas();
  let total = 0;
  let done = 0;
  CATEGORIES.forEach(cat => {
    total += ideas[cat].length;
    done += ideas[cat].filter(item => item.status === 'done').length;
  });
  const el = document.getElementById('achievement-counter');
  if (el) {
    if (total === 0) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
      el.innerHTML = `<span class="achievement-label">叶えたアイデア</span><span class="achievement-numbers"><span class="achievement-done">${done}</span> / ${total}</span>`;
    }
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function extractURLs(text) {
  return text.match(/(https?:\/\/[^\s]+)/g) || [];
}

function linkify(text, linkTitles) {
  const escaped = escapeHTML(text);
  return escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    let display;
    if (linkTitles && linkTitles[url]) {
      display = escapeHTML(linkTitles[url]);
    } else {
      try { display = new URL(url).hostname; } catch { display = url; }
    }
    const loadingClass = (!linkTitles || !linkTitles[url]) ? ' class="link-loading"' : '';
    return `<a href="${url}" target="_blank" rel="noopener noreferrer"${loadingClass}>${display}</a>`;
  });
}

// --- リンクタイトル取得 ---

async function fetchPageTitle(url) {
  try {
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    const match = data.contents.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

async function fetchAndStoreTitles(category, ideaId) {
  const ideas = loadIdeas();
  const idea = ideas[category].find(item => item.id === ideaId);
  if (!idea) return;

  const urls = extractURLs(idea.text);
  if (urls.length === 0) return;

  if (!idea.linkTitles) idea.linkTitles = {};
  let updated = false;

  await Promise.all(urls.map(async (url) => {
    if (idea.linkTitles[url]) return;
    const title = await fetchPageTitle(url);
    if (title) {
      idea.linkTitles[url] = title;
      updated = true;
    }
  }));

  if (updated) {
    saveIdeas(ideas);
    renderIdeas(category, ideas);
  }
}

function fetchAllMissingTitles() {
  const ideas = loadIdeas();
  for (const cat of CATEGORIES) {
    for (const idea of ideas[cat]) {
      const urls = extractURLs(idea.text);
      const titles = idea.linkTitles || {};
      if (urls.some(url => !titles[url])) {
        fetchAndStoreTitles(cat, idea.id);
      }
    }
  }
}

// --- イベント処理 ---

function handleAddIdea(category) {
  const input = document.querySelector(`.idea-input[data-category="${category}"]`);
  const text = input.value.trim();
  if (!text) return;

  const ideas = addIdea(category, text);
  const newIdea = ideas[category][ideas[category].length - 1];
  renderIdeas(category, ideas);
  input.value = '';
  input.focus();

  if (extractURLs(text).length > 0) {
    fetchAndStoreTitles(category, newIdea.id);
  }
}

function handleToggleStatus(category, id) {
  const ideas = toggleIdeaStatus(category, id);
  renderIdeas(category, ideas);
  updateAchievementCounter();
}

function handleDeleteIdea(category, id) {
  const item = document.querySelector(`.idea-item[data-id="${id}"]`);
  if (item) {
    item.style.animation = 'slideOut 0.3s ease-out forwards';
    item.addEventListener('animationend', () => {
      const ideas = deleteIdea(category, id);
      renderIdeas(category, ideas);
      updateAchievementCounter();
    }, { once: true });
  }
}

// --- イベントリスナー設定 ---

function setupEventListeners() {
  // 追加ボタン
  document.querySelectorAll('.idea-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleAddIdea(btn.dataset.category);
    });
  });

  // Enter キーで追加
  document.querySelectorAll('.idea-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleAddIdea(input.dataset.category);
      }
    });
  });

  // ステータス切り替え & 削除（イベント委任）
  document.querySelectorAll('.idea-list').forEach(list => {
    list.addEventListener('click', (e) => {
      const statusBtn = e.target.closest('.idea-status');
      if (statusBtn) {
        handleToggleStatus(statusBtn.dataset.category, statusBtn.dataset.id);
        return;
      }

      const deleteBtn = e.target.closest('.idea-delete');
      if (deleteBtn) {
        handleDeleteIdea(deleteBtn.dataset.category, deleteBtn.dataset.id);
      }
    });
  });

  // 折りたたみトグル
  document.querySelectorAll('.category-header[data-toggle]').forEach(header => {
    header.addEventListener('click', () => {
      const category = header.closest('.idea-category');
      category.classList.toggle('collapsed');
    });
  });

  // カテゴリカードのスムーズスクロール
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(card.getAttribute('href'));
      if (target) {
        target.classList.remove('collapsed');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- 初期化 ---

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  setupEventListeners();
  fetchAllMissingTitles();
});
