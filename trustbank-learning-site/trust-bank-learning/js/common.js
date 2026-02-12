/* ========================================
   トラストナビ ～信託銀行業務の道しるべ～
   共通JavaScript
   ======================================== */

'use strict';

/* ----------------------------------------
   1. オウムキャラクター SVG コンポーネント
   5つの表情：normal, thinking, correct, incorrect, cheering
   ---------------------------------------- */
const ParrotSVG = {
  /**
   * オウムSVGを生成して返す
   * @param {string} mood - 'normal' | 'thinking' | 'correct' | 'incorrect' | 'cheering'
   * @param {number} size - SVGのサイズ（デフォルト80）
   * @returns {string} SVG文字列
   */
  create(mood = 'normal', size = 80) {
    const expressions = {
      normal: { eyes: this._eyesNormal, mouth: this._mouthNormal, extra: () => '' },
      thinking: { eyes: this._eyesThinking, mouth: this._mouthThinking, extra: this._thinkBubble },
      correct: { eyes: this._eyesHappy, mouth: this._mouthHappy, extra: this._sparkles },
      incorrect: { eyes: this._eyesSad, mouth: this._mouthSad, extra: () => '' },
      cheering: { eyes: this._eyesCheering, mouth: this._mouthCheering, extra: this._confetti },
    };

    const expr = expressions[mood] || expressions.normal;

    return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="案内キャラクター トラストン">
      <!-- 体 -->
      <ellipse cx="60" cy="85" rx="28" ry="25" fill="#2ECC71" stroke="#27AE60" stroke-width="1.5"/>
      <!-- 翼（左） -->
      <ellipse cx="34" cy="78" rx="12" ry="18" fill="#27AE60" transform="rotate(-10 34 78)"/>
      <!-- 翼（右） -->
      <ellipse cx="86" cy="78" rx="12" ry="18" fill="#27AE60" transform="rotate(10 86 78)"/>
      <!-- 頭 -->
      <circle cx="60" cy="48" r="28" fill="#2ECC71" stroke="#27AE60" stroke-width="1.5"/>
      <!-- 冠羽（信託バンカーの帽子風） -->
      <path d="M48 24 Q52 8 60 14 Q68 8 72 24" fill="#F1C40F" stroke="#E8B90E" stroke-width="1"/>
      <path d="M52 22 Q56 12 60 16 Q64 12 68 22" fill="#F39C12" stroke="#E8890E" stroke-width="0.5"/>
      <!-- くちばし -->
      <path d="M52 52 L60 62 L68 52" fill="#E67E22" stroke="#D35400" stroke-width="1" stroke-linejoin="round"/>
      <!-- お腹 -->
      <ellipse cx="60" cy="90" rx="18" ry="16" fill="#A8E6CF"/>
      <!-- 足 -->
      <g fill="#E67E22" stroke="#D35400" stroke-width="0.8">
        <path d="M48 108 L44 116 M48 108 L48 116 M48 108 L52 116"/>
        <path d="M72 108 L68 116 M72 108 L72 116 M72 108 L76 116"/>
      </g>
      <!-- ネクタイ（バンカー風） -->
      <polygon points="60,68 55,78 60,88 65,78" fill="#1B3A5C" stroke="#0F2640" stroke-width="0.5"/>
      <rect x="56" y="66" width="8" height="4" rx="1" fill="#1B3A5C"/>
      <!-- 目 -->
      ${expr.eyes()}
      <!-- 口 -->
      ${expr.mouth()}
      <!-- エクストラ装飾 -->
      ${expr.extra()}
    </svg>`;
  },

  /* --- 目のバリエーション --- */
  _eyesNormal() {
    return `
      <circle cx="50" cy="44" r="5" fill="white"/>
      <circle cx="70" cy="44" r="5" fill="white"/>
      <circle cx="51" cy="44" r="2.5" fill="#1B3A5C"/>
      <circle cx="71" cy="44" r="2.5" fill="#1B3A5C"/>
      <circle cx="52" cy="43" r="1" fill="white"/>
      <circle cx="72" cy="43" r="1" fill="white"/>`;
  },

  _eyesThinking() {
    return `
      <circle cx="50" cy="44" r="5" fill="white"/>
      <circle cx="70" cy="44" r="5" fill="white"/>
      <circle cx="53" cy="43" r="2.5" fill="#1B3A5C"/>
      <circle cx="73" cy="43" r="2.5" fill="#1B3A5C"/>
      <line x1="46" y1="37" x2="54" y2="39" stroke="#1B3A5C" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="74" y1="37" x2="66" y2="39" stroke="#1B3A5C" stroke-width="1.5" stroke-linecap="round"/>`;
  },

  _eyesHappy() {
    return `
      <path d="M46 44 Q50 38 54 44" fill="none" stroke="#1B3A5C" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M66 44 Q70 38 74 44" fill="none" stroke="#1B3A5C" stroke-width="2.5" stroke-linecap="round"/>`;
  },

  _eyesSad() {
    return `
      <circle cx="50" cy="46" r="5" fill="white"/>
      <circle cx="70" cy="46" r="5" fill="white"/>
      <circle cx="50" cy="47" r="2.5" fill="#1B3A5C"/>
      <circle cx="70" cy="47" r="2.5" fill="#1B3A5C"/>
      <line x1="45" y1="40" x2="55" y2="38" stroke="#1B3A5C" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="75" y1="40" x2="65" y2="38" stroke="#1B3A5C" stroke-width="1.5" stroke-linecap="round"/>
      <!-- 涙 -->
      <ellipse cx="56" cy="50" rx="1.5" ry="2.5" fill="#85C1E9" opacity="0.7"/>`;
  },

  _eyesCheering() {
    return `
      <text x="46" y="47" font-size="12" fill="#1B3A5C">★</text>
      <text x="66" y="47" font-size="12" fill="#1B3A5C">★</text>`;
  },

  /* --- 口のバリエーション --- */
  _mouthNormal() {
    return '';
  },

  _mouthThinking() {
    return `<circle cx="62" cy="58" r="2" fill="#D35400" opacity="0.6"/>`;
  },

  _mouthHappy() {
    return `<path d="M54 56 Q60 62 66 56" fill="none" stroke="#D35400" stroke-width="1.5" stroke-linecap="round"/>`;
  },

  _mouthSad() {
    return `<path d="M54 60 Q60 56 66 60" fill="none" stroke="#D35400" stroke-width="1.5" stroke-linecap="round"/>`;
  },

  _mouthCheering() {
    return `<ellipse cx="60" cy="58" rx="4" ry="3" fill="#D35400"/>`;
  },

  /* --- エクストラ装飾 --- */
  _thinkBubble() {
    return `
      <circle cx="98" cy="24" r="3" fill="#DDD" opacity="0.6"/>
      <circle cx="104" cy="16" r="4" fill="#DDD" opacity="0.6"/>
      <circle cx="112" cy="10" r="5" fill="#DDD" opacity="0.6"/>`;
  },

  _sparkles() {
    return `
      <text x="20" y="20" font-size="14" fill="#F1C40F" opacity="0.9">✦</text>
      <text x="95" y="16" font-size="10" fill="#F1C40F" opacity="0.8">✦</text>
      <text x="100" y="35" font-size="12" fill="#F1C40F" opacity="0.7">✦</text>`;
  },

  _confetti() {
    return `
      <circle cx="22" cy="18" r="2" fill="#E74C3C"/>
      <circle cx="100" cy="12" r="2" fill="#3498DB"/>
      <circle cx="16" cy="35" r="1.5" fill="#F1C40F"/>
      <circle cx="108" cy="30" r="1.5" fill="#2ECC71"/>
      <rect x="26" y="10" width="3" height="3" fill="#9B59B6" transform="rotate(30 27 11)"/>
      <rect x="94" y="22" width="3" height="3" fill="#E67E22" transform="rotate(-20 95 23)"/>`;
  }
};


/* ----------------------------------------
   2. 進捗管理（localStorage）
   ---------------------------------------- */
const Progress = {
  STORAGE_KEY: 'trustnavi_progress',

  /** セクション定義 */
  SECTIONS: {
    overview: { name: '信託銀行とは', levels: 3, path: 'sections/overview.html' },
    trust: { name: '信託・相続業務', levels: 4, path: 'sections/trust.html' },
    stock: { name: '証券代行業務', levels: 4, path: 'sections/stock.html' },
    realestate: { name: '不動産業務', levels: 4, path: 'sections/realestate.html' },
    pension: { name: '年金・資産運用業務', levels: 4, path: 'sections/pension.html' },
    custody: { name: 'カストディ業務', levels: 4, path: 'sections/custody.html' },
  },

  /** 全進捗データを取得 */
  getAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  /** 進捗データを保存 */
  _save(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('進捗の保存に失敗しました:', e);
    }
  },

  /** セクションの完了済みレベルを取得 */
  getCompletedLevels(sectionId) {
    const data = this.getAll();
    return data[sectionId]?.completedLevels || [];
  },

  /** レベルを完了としてマーク */
  completeLevel(sectionId, level) {
    const data = this.getAll();
    if (!data[sectionId]) {
      data[sectionId] = { completedLevels: [] };
    }
    if (!data[sectionId].completedLevels.includes(level)) {
      data[sectionId].completedLevels.push(level);
      data[sectionId].completedLevels.sort();
    }
    this._save(data);
    return data[sectionId].completedLevels;
  },

  /** レベルの完了を取り消し */
  uncompleteLevel(sectionId, level) {
    const data = this.getAll();
    if (data[sectionId]) {
      data[sectionId].completedLevels = data[sectionId].completedLevels.filter(l => l !== level);
      this._save(data);
    }
  },

  /** セクションの進捗率（0-100）を取得 */
  getSectionProgress(sectionId) {
    const section = this.SECTIONS[sectionId];
    if (!section) return 0;
    const completed = this.getCompletedLevels(sectionId);
    return Math.round((completed.length / section.levels) * 100);
  },

  /** 全体の進捗率（0-100）を取得 */
  getTotalProgress() {
    let totalLevels = 0;
    let completedLevels = 0;
    for (const [id, section] of Object.entries(this.SECTIONS)) {
      totalLevels += section.levels;
      completedLevels += this.getCompletedLevels(id).length;
    }
    return totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;
  },

  /** クイズ成績を進捗に反映（70%以上で合格扱い） */
  getQuizPassed(sectionId) {
    try {
      const data = JSON.parse(localStorage.getItem('trustnavi_quiz_results') || '{}');
      const result = data[sectionId];
      return result && result.percentage >= 70;
    } catch {
      return false;
    }
  },

  /** 最後にアクセスしたセクションを記録 */
  setLastVisited(sectionId) {
    try {
      localStorage.setItem('trustnavi_last_visited', sectionId);
    } catch {}
  },

  /** 最後にアクセスしたセクションを取得 */
  getLastVisited() {
    try {
      return localStorage.getItem('trustnavi_last_visited') || null;
    } catch {
      return null;
    }
  },

  /** 次に学習すべきセクションを取得 */
  getNextSection() {
    const order = ['overview', 'trust', 'stock', 'realestate', 'pension', 'custody'];
    for (const id of order) {
      if (this.getSectionProgress(id) < 100) return id;
    }
    return null;
  },

  /** 進捗をリセット */
  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};


/* ----------------------------------------
   3. ナビゲーション制御
   ---------------------------------------- */
const Navigation = {
  /** モバイルメニューの初期化 */
  init() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      // メニュー外クリックで閉じる
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 現在のページをハイライト
    this._highlightCurrentPage();
  },

  /** 現在ページのナビリンクをハイライト */
  _highlightCurrentPage() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
        link.classList.add('active');
      }
    });
  }
};


/* ----------------------------------------
   4. レベルブロック（アコーディオン）制御
   ---------------------------------------- */
const LevelBlocks = {
  /** レベルブロックの初期化 */
  init(sectionId) {
    const blocks = document.querySelectorAll('.level-block');
    const completedLevels = Progress.getCompletedLevels(sectionId);

    blocks.forEach(block => {
      const level = parseInt(block.dataset.level);
      const header = block.querySelector('.level-header');

      // 完了状態を復元
      if (completedLevels.includes(level)) {
        block.classList.add('completed');
      }

      // レベル1はデフォルトで開く
      if (level === 1) {
        block.classList.add('expanded');
      }

      // クリック・キーボードで開閉
      if (header && !block.classList.contains('locked')) {
        header.addEventListener('click', () => {
          const isExpanded = block.classList.toggle('expanded');
          header.setAttribute('aria-expanded', isExpanded);
        });
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = block.classList.toggle('expanded');
            header.setAttribute('aria-expanded', isExpanded);
          }
        });
      }

      // 完了ボタン
      const completeBtn = block.querySelector('.complete-level-btn');
      if (completeBtn) {
        this._initCompleteButton(completeBtn, sectionId, level, block);
      }
    });
  },

  /** 完了ボタンの初期化 */
  _initCompleteButton(btn, sectionId, level, block) {
    const completedLevels = Progress.getCompletedLevels(sectionId);
    if (completedLevels.includes(level)) {
      btn.classList.add('completed');
      btn.textContent = '✓ このレベルは学習済みです';
    }

    btn.addEventListener('click', () => {
      const isCompleted = btn.classList.contains('completed');
      if (isCompleted) {
        Progress.uncompleteLevel(sectionId, level);
        btn.classList.remove('completed');
        block.classList.remove('completed');
        btn.textContent = 'このレベルを学習完了にする';
      } else {
        Progress.completeLevel(sectionId, level);
        btn.classList.add('completed');
        block.classList.add('completed');
        btn.textContent = '✓ このレベルは学習済みです';
      }
      // 進捗表示を更新
      this._updateProgressDisplay(sectionId);
    });
  },

  /** 進捗表示の更新 */
  _updateProgressDisplay(sectionId) {
    const progress = Progress.getSectionProgress(sectionId);
    const fill = document.querySelector('.section-progress-fill');
    const text = document.querySelector('.section-progress-text');
    if (fill) fill.style.width = `${progress}%`;
    if (text) text.textContent = `${progress}%`;
  }
};


/* ----------------------------------------
   5. ツールチップ制御
   ---------------------------------------- */
const Tooltips = {
  /** 用語ツールチップの初期化 */
  init() {
    // data-tooltip属性を持つ.term要素にツールチップを生成
    document.querySelectorAll('.term[data-tooltip]').forEach(term => {
      const tooltipText = term.getAttribute('data-tooltip');
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.textContent = tooltipText;
      term.appendChild(tooltip);
      term.setAttribute('tabindex', '0');

      // ツールチップの位置調整（画面外にはみ出す場合）
      term.addEventListener('mouseenter', () => this._adjustPosition(tooltip));
      term.addEventListener('focus', () => this._adjustPosition(tooltip));
    });
  },

  /** ツールチップが画面外にはみ出す場合の位置調整 */
  _adjustPosition(tooltip) {
    requestAnimationFrame(() => {
      const rect = tooltip.getBoundingClientRect();
      // 左端をはみ出す場合
      if (rect.left < 8) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'translateY(0)';
      }
      // 右端をはみ出す場合
      if (rect.right > window.innerWidth - 8) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'translateY(0)';
      }
    });
  }
};


/* ----------------------------------------
   6. ミニシーン（対話形式）制御
   ---------------------------------------- */
const MiniScene = {
  /** ミニシーンの初期化 */
  init() {
    document.querySelectorAll('.scene-block').forEach(scene => {
      const choices = scene.querySelectorAll('.scene-choice-btn');
      choices.forEach(btn => {
        btn.addEventListener('click', () => this._handleChoice(btn, scene));
      });
    });
  },

  /** 選択肢クリック処理 */
  _handleChoice(btn, scene) {
    // 既に回答済みならスキップ
    if (scene.querySelector('.scene-choice-btn.correct') || scene.querySelector('.scene-choice-btn.incorrect')) {
      return;
    }

    const isCorrect = btn.dataset.correct === 'true';
    const feedback = scene.querySelector('.scene-feedback');
    const parrotReaction = scene.querySelector('.parrot-reaction');

    if (isCorrect) {
      btn.classList.add('correct');
      // フィードバック表示
      if (feedback) {
        feedback.innerHTML = btn.dataset.feedback || 'その通り！よく理解できています！';
        feedback.className = 'scene-feedback info-box success';
        feedback.style.display = 'block';
      }
      // オウムの反応
      if (parrotReaction) {
        parrotReaction.innerHTML = ParrotSVG.create('correct', 60);
      }
    } else {
      btn.classList.add('incorrect');
      if (feedback) {
        feedback.innerHTML = btn.dataset.feedback || 'もう一度考えてみましょう。';
        feedback.className = 'scene-feedback info-box warning';
        feedback.style.display = 'block';
      }
      if (parrotReaction) {
        parrotReaction.innerHTML = ParrotSVG.create('incorrect', 60);
      }
      // 不正解の場合は再挑戦を許可
      setTimeout(() => {
        btn.classList.remove('incorrect');
        if (feedback) feedback.style.display = 'none';
        if (parrotReaction) parrotReaction.innerHTML = ParrotSVG.create('thinking', 60);
      }, 2000);
    }
  }
};


/* ----------------------------------------
   7. 進捗バー コンポーネント
   ---------------------------------------- */
const ProgressBar = {
  /** 進捗バーを更新 */
  update(element, percentage) {
    if (!element) return;
    const fill = element.querySelector('.progress-fill');
    if (fill) {
      fill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }
  },

  /** 進捗バーHTMLを生成 */
  createHTML(percentage, showLabel = false) {
    const pct = Math.min(100, Math.max(0, percentage));
    let html = `
      <div class="progress-bar">
        <div class="progress-fill${pct > 0 ? ' animated' : ''}" style="width: ${pct}%"></div>
      </div>`;
    if (showLabel) {
      html += `<div class="progress-label"><span>進捗</span><span>${pct}%</span></div>`;
    }
    return html;
  }
};


/* ----------------------------------------
   8. 折りたたみパネル（アコーディオン）制御
   ---------------------------------------- */
const AccordionPanels = {
  /** 折りたたみパネルの初期化 */
  init() {
    document.querySelectorAll('.accordion-panel').forEach(panel => {
      const trigger = panel.querySelector('.accordion-trigger');
      if (!trigger) return;

      const togglePanel = () => {
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        trigger.setAttribute('aria-expanded', !isOpen);
      };
      trigger.addEventListener('click', togglePanel);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePanel();
        }
      });
    });
  }
};


/* ----------------------------------------
   9. ページ共通の初期化
   ---------------------------------------- */
const App = {
  /** 共通初期化 */
  init(options = {}) {
    Navigation.init();
    Tooltips.init();
    MiniScene.init();
    AccordionPanels.init();

    // セクションページの場合はレベルブロックを初期化
    if (options.sectionId) {
      LevelBlocks.init(options.sectionId);
      Progress.setLastVisited(options.sectionId);
    }

    // トップページの場合は進捗を表示
    if (options.isTopPage) {
      this._renderTopPageProgress();
    }
  },

  /** トップページの進捗表示を更新 */
  _renderTopPageProgress() {
    // 全体進捗
    const totalProgress = Progress.getTotalProgress();
    const totalBar = document.getElementById('total-progress-bar');
    if (totalBar) {
      ProgressBar.update(totalBar, totalProgress);
      const totalText = document.getElementById('total-progress-text');
      if (totalText) totalText.textContent = `${totalProgress}%`;
    }

    // 各セクション進捗
    for (const [id] of Object.entries(Progress.SECTIONS)) {
      const progress = Progress.getSectionProgress(id);
      const card = document.querySelector(`.section-card[data-section="${id}"]`);
      if (card) {
        const progressContainer = card.querySelector('.card-progress-bar');
        if (progressContainer) {
          ProgressBar.update(progressContainer, progress);
        }
        const progressText = card.querySelector('.card-progress-text');
        if (progressText) {
          progressText.textContent = `${progress}%`;
        }
        // クイズ合格バッジ
        if (id !== 'overview' && Progress.getQuizPassed(id)) {
          const badge = card.querySelector('.card-quiz-badge');
          if (badge) {
            badge.textContent = 'Quiz合格';
            badge.style.display = 'inline-block';
          }
        }
      }
    }

    // 学習再開ボタン
    this._renderResumeButton();
  },

  /** 学習再開ボタンの表示 */
  _renderResumeButton() {
    const container = document.getElementById('resume-section');
    if (!container) return;

    const totalProgress = Progress.getTotalProgress();
    if (totalProgress === 0) {
      container.style.display = 'none';
      return;
    }

    const lastVisited = Progress.getLastVisited();
    const nextSection = Progress.getNextSection();
    const targetId = lastVisited || nextSection;

    if (!targetId || !Progress.SECTIONS[targetId]) {
      if (totalProgress >= 100) {
        container.innerHTML = `
          <div class="parrot-guide">
            <div id="resume-parrot"></div>
            <div class="parrot-message">
              <p><strong>おめでとう！</strong>全セクションの学習が完了しました！</p>
              <p>復習したいセクションがあれば、上のマップから選んでね。</p>
            </div>
          </div>`;
        const parrot = document.getElementById('resume-parrot');
        if (parrot) parrot.innerHTML = ParrotSVG.create('cheering', 64);
      }
      return;
    }

    const section = Progress.SECTIONS[targetId];
    const sectionProgress = Progress.getSectionProgress(targetId);
    const label = lastVisited ? '前回の続きから学習する' : '次のセクションへ進む';

    container.style.display = 'block';
    container.innerHTML = `
      <a href="${section.path}" class="btn btn-accent btn-lg" style="width: 100%; max-width: 480px;">
        ${label}：${section.name}（${sectionProgress}%）
      </a>`;
  }
};


/* ----------------------------------------
   10. ヘッダーHTML生成ヘルパー
   ---------------------------------------- */
const HeaderTemplate = {
  /**
   * 共通ヘッダーHTMLを返す
   * @param {string} basePath - CSSやリンクのベースパス（'' or '../'）
   */
  create(basePath = '') {
    return `
    <header class="site-header" role="banner">
      <div class="header-inner">
        <a href="${basePath}index.html" class="site-logo" aria-label="トップページへ">
          <span class="logo-icon">${ParrotSVG.create('normal', 36)}</span>
          <span>
            トラストナビ
            <span class="logo-sub">信託銀行業務の道しるべ</span>
          </span>
        </a>

        <button class="menu-toggle" aria-label="メニューを開く" aria-expanded="false">
          <span class="menu-toggle-icon"></span>
        </button>

        <nav class="main-nav" role="navigation" aria-label="メインナビゲーション">
          <a href="${basePath}index.html" class="nav-link">トップ</a>
          <a href="${basePath}sections/overview.html" class="nav-link">信託銀行とは</a>
          <a href="${basePath}sections/trust.html" class="nav-link">信託・相続</a>
          <a href="${basePath}sections/stock.html" class="nav-link">証券代行</a>
          <a href="${basePath}sections/realestate.html" class="nav-link">不動産</a>
          <a href="${basePath}sections/pension.html" class="nav-link">年金・運用</a>
          <a href="${basePath}sections/custody.html" class="nav-link">カストディ</a>
        </nav>
      </div>
    </header>`;
  }
};


/* ----------------------------------------
   11. フッターHTML生成ヘルパー
   ---------------------------------------- */
const FooterTemplate = {
  create() {
    return `
    <footer class="site-footer" role="contentinfo">
      <p>トラストナビ ～信託銀行業務の道しるべ～ | 新入社員研修教材</p>
    </footer>`;
  }
};
