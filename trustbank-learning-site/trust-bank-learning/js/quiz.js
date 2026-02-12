/* ========================================
   トラストナビ クイズエンジン
   ======================================== */
'use strict';

const QuizEngine = {
  /* --- 状態 --- */
  _state: null,

  /* --- 定数 --- */
  STORAGE_KEY: 'trustnavi_quiz_results',

  SECTION_NAMES: {
    trust: '信託・相続業務',
    stock: '証券代行業務',
    realestate: '不動産業務',
    pension: '年金・資産運用業務',
    custody: 'カストディ業務',
    comprehensive: '全体理解度テスト'
  },

  TYPE_LABELS: {
    term: '用語',
    judgment: '業務判断',
    truefalse: '○×',
    fillin: '穴埋め'
  },

  /* ========================================
     初期化・開始
     ======================================== */

  /**
   * クイズを開始する
   * @param {string} sectionId - セクションID or 'comprehensive'
   * @param {string} containerId - コンテナ要素のID
   */
  start(sectionId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const questions = this._getQuestions(sectionId);
    if (!questions || questions.length === 0) return;

    this._state = {
      sectionId,
      containerId,
      questions,
      currentIndex: 0,
      answers: [],
      score: 0,
      answered: false
    };

    this._renderQuestion();
  },

  /**
   * 問題を取得してシャッフル
   */
  _getQuestions(sectionId) {
    const data = QuizData[sectionId];
    if (!data) return null;
    return this._shuffle([...data]).map(q => {
      if (q.options) {
        return this._shuffleOptions(q);
      }
      return { ...q };
    });
  },

  /**
   * 選択肢をシャッフル（正解インデックスも更新）
   */
  _shuffleOptions(q) {
    const copy = { ...q };
    const correctOption = copy.options[copy.answer];
    const indices = copy.options.map((_, i) => i);
    const shuffled = this._shuffle(indices);
    copy.options = shuffled.map(i => q.options[i]);
    copy.answer = copy.options.indexOf(correctOption);
    return copy;
  },

  /**
   * Fisher-Yates シャッフル
   */
  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  /* ========================================
     描画
     ======================================== */

  /**
   * スタート画面を描画
   */
  renderStartScreen(sectionId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const questions = QuizData[sectionId];
    if (!questions) return;

    const sectionName = this.SECTION_NAMES[sectionId] || sectionId;
    const count = questions.length;
    const isComprehensive = sectionId === 'comprehensive';

    // 過去の結果を取得
    const pastResult = this._getResult(sectionId);
    const pastHtml = pastResult
      ? `<div class="quiz-past-result">
           <span>前回の結果：</span>
           <strong>${pastResult.score} / ${pastResult.total} 問正解（${pastResult.percentage}%）</strong>
         </div>`
      : '';

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h3>${isComprehensive ? '全体理解度テスト' : 'セクションクイズ'}</h3>
          <span class="quiz-progress-text">${count}問</span>
        </div>
        <div class="quiz-body quiz-start-screen">
          <div class="quiz-start-parrot" id="${containerId}-start-parrot"></div>
          <h4 class="quiz-start-title">${sectionName}</h4>
          <p class="quiz-start-desc">
            ${isComprehensive
              ? '全セクションから出題される総合テストです。信託銀行業務の全体像を理解できているか確認しましょう！'
              : 'このセクションの内容をどれだけ理解できたか、クイズで確認しましょう！'}
          </p>
          <div class="quiz-start-info">
            <div class="quiz-start-info-item">
              <span class="quiz-info-label">出題数</span>
              <span class="quiz-info-value">${count}問</span>
            </div>
            <div class="quiz-start-info-item">
              <span class="quiz-info-label">出題形式</span>
              <span class="quiz-info-value">用語 / 業務判断 / ○×</span>
            </div>
            <div class="quiz-start-info-item">
              <span class="quiz-info-label">出題順</span>
              <span class="quiz-info-value">ランダム</span>
            </div>
          </div>
          ${pastHtml}
          <button class="btn btn-primary quiz-start-btn" onclick="QuizEngine.start('${sectionId}', '${containerId}')">
            クイズを始める
          </button>
        </div>
      </div>
    `;

    // パロットを挿入
    const parrotEl = document.getElementById(`${containerId}-start-parrot`);
    if (parrotEl && typeof ParrotSVG !== 'undefined') {
      parrotEl.innerHTML = ParrotSVG.create('cheering', 80);
    }
  },

  /**
   * 問題を描画
   */
  _renderQuestion() {
    const s = this._state;
    const container = document.getElementById(s.containerId);
    const q = s.questions[s.currentIndex];
    const num = s.currentIndex + 1;
    const total = s.questions.length;

    const typeLabel = this.TYPE_LABELS[q.type] || '';
    const progress = Math.round((num / total) * 100);

    let bodyHtml = '';

    if (q.type === 'truefalse') {
      bodyHtml = this._renderTrueFalse(q);
    } else {
      bodyHtml = this._renderMultipleChoice(q);
    }

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h3><span class="quiz-type-badge">${typeLabel}</span> 第${num}問 / ${total}問</h3>
          <span class="quiz-progress-text">${Math.round((s.score / num) * 100) || 0}%</span>
        </div>
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="quiz-body">
          <div class="quiz-question-area">
            <div class="quiz-parrot" id="${s.containerId}-parrot"></div>
            <p class="quiz-question">${q.question}</p>
          </div>
          ${bodyHtml}
          <div class="quiz-explanation-area" id="${s.containerId}-explanation" style="display:none;"></div>
        </div>
        <div class="quiz-footer" id="${s.containerId}-footer" style="display:none;">
          <button class="btn btn-primary quiz-next-btn" onclick="QuizEngine._next()">
            ${num < total ? '次の問題へ →' : '結果を見る →'}
          </button>
        </div>
      </div>
    `;

    // パロットを挿入
    const parrotEl = document.getElementById(`${s.containerId}-parrot`);
    if (parrotEl && typeof ParrotSVG !== 'undefined') {
      parrotEl.innerHTML = ParrotSVG.create('thinking', 56);
    }

    s.answered = false;
  },

  /**
   * 4択選択肢を描画
   */
  _renderMultipleChoice(q) {
    const labels = ['A', 'B', 'C', 'D'];
    return `
      <div class="quiz-options" role="radiogroup" aria-label="回答選択肢">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" onclick="QuizEngine._selectOption(${i})" role="radio" aria-checked="false" tabindex="0">
            <span class="option-label">${labels[i]}</span>
            <span class="option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  /**
   * ○×選択肢を描画
   */
  _renderTrueFalse(q) {
    return `
      <div class="quiz-options quiz-truefalse" role="radiogroup" aria-label="○×回答">
        <button class="quiz-option quiz-tf-btn" data-value="true" onclick="QuizEngine._selectTrueFalse(true)" role="radio" aria-checked="false" tabindex="0">
          <span class="option-label tf-true">○</span>
          <span class="option-text">正しい</span>
        </button>
        <button class="quiz-option quiz-tf-btn" data-value="false" onclick="QuizEngine._selectTrueFalse(false)" role="radio" aria-checked="false" tabindex="0">
          <span class="option-label tf-false">×</span>
          <span class="option-text">誤り</span>
        </button>
      </div>
    `;
  },

  /* ========================================
     回答処理
     ======================================== */

  /**
   * 4択の選択処理
   */
  _selectOption(index) {
    if (this._state.answered) return;
    this._state.answered = true;

    const s = this._state;
    const q = s.questions[s.currentIndex];
    const isCorrect = index === q.answer;

    s.answers.push({ questionIndex: s.currentIndex, selected: index, correct: isCorrect });
    if (isCorrect) s.score++;

    // UIの更新
    const container = document.getElementById(s.containerId);
    const options = container.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === q.answer) {
        opt.classList.add('correct');
      }
      if (i === index && !isCorrect) {
        opt.classList.add('incorrect');
      }
    });

    this._showFeedback(isCorrect, q.explanation);
  },

  /**
   * ○×の選択処理
   */
  _selectTrueFalse(value) {
    if (this._state.answered) return;
    this._state.answered = true;

    const s = this._state;
    const q = s.questions[s.currentIndex];
    const isCorrect = value === q.answer;

    s.answers.push({ questionIndex: s.currentIndex, selected: value, correct: isCorrect });
    if (isCorrect) s.score++;

    // UIの更新
    const container = document.getElementById(s.containerId);
    const options = container.querySelectorAll('.quiz-tf-btn');

    options.forEach(opt => {
      opt.classList.add('disabled');
      const optValue = opt.dataset.value === 'true';
      if (optValue === q.answer) {
        opt.classList.add('correct');
      }
      if (optValue === value && !isCorrect) {
        opt.classList.add('incorrect');
      }
    });

    this._showFeedback(isCorrect, q.explanation);
  },

  /**
   * フィードバック表示
   */
  _showFeedback(isCorrect, explanation) {
    const s = this._state;
    const explEl = document.getElementById(`${s.containerId}-explanation`);
    const footerEl = document.getElementById(`${s.containerId}-footer`);
    const parrotEl = document.getElementById(`${s.containerId}-parrot`);

    if (explEl) {
      const icon = isCorrect ? '🎉' : '💡';
      const label = isCorrect ? '正解！' : '不正解';
      const cls = isCorrect ? 'correct' : 'incorrect';
      explEl.className = `quiz-explanation-area quiz-explanation ${cls}`;
      explEl.innerHTML = `
        <div class="quiz-explanation-header">
          <span class="quiz-explanation-icon">${icon}</span>
          <strong>${label}</strong>
        </div>
        <p>${explanation}</p>
      `;
      explEl.style.display = 'block';
    }

    if (footerEl) {
      footerEl.style.display = 'flex';
    }

    // パロットの表情変更
    if (parrotEl && typeof ParrotSVG !== 'undefined') {
      parrotEl.innerHTML = ParrotSVG.create(isCorrect ? 'correct' : 'incorrect', 56);
    }
  },

  /**
   * 次の問題へ
   */
  _next() {
    const s = this._state;
    s.currentIndex++;

    if (s.currentIndex >= s.questions.length) {
      this._renderResult();
    } else {
      this._renderQuestion();
    }
  },

  /* ========================================
     結果画面
     ======================================== */

  _renderResult() {
    const s = this._state;
    const container = document.getElementById(s.containerId);
    const total = s.questions.length;
    const score = s.score;
    const percentage = Math.round((score / total) * 100);

    // 結果を保存
    this._saveResult(s.sectionId, score, total, percentage);

    // 評価メッセージ
    const { grade, message, mood } = this._getGrade(percentage);

    // タイプ別正答率
    const typeStats = this._calcTypeStats(s);

    // 苦手分野（comprehensive用）
    const weakAreaHtml = s.sectionId === 'comprehensive' ? this._renderWeakAreas(s) : '';

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header quiz-result-header">
          <h3>クイズ結果</h3>
          <span class="quiz-progress-text">${this.SECTION_NAMES[s.sectionId]}</span>
        </div>
        <div class="quiz-body quiz-result-body">
          <div class="quiz-result-parrot" id="${s.containerId}-result-parrot"></div>

          <div class="quiz-result-score-card">
            <div class="quiz-result-score">
              <span class="quiz-result-score-num">${score}</span>
              <span class="quiz-result-score-sep">/</span>
              <span class="quiz-result-score-total">${total}</span>
            </div>
            <div class="quiz-result-percentage">${percentage}%</div>
            <div class="quiz-result-grade">${grade}</div>
          </div>

          <div class="quiz-result-message">
            <p>${message}</p>
          </div>

          <div class="quiz-result-details">
            <h4>出題タイプ別の正答率</h4>
            <div class="quiz-type-stats">
              ${typeStats.map(ts => `
                <div class="quiz-type-stat">
                  <span class="quiz-type-stat-label">${ts.label}</span>
                  <div class="quiz-type-stat-bar-wrap">
                    <div class="quiz-type-stat-bar" style="width: ${ts.rate}%"></div>
                  </div>
                  <span class="quiz-type-stat-value">${ts.correct}/${ts.total}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${weakAreaHtml}

          <div class="quiz-result-actions">
            <button class="btn btn-primary" onclick="QuizEngine.start('${s.sectionId}', '${s.containerId}')">
              もう一度挑戦する
            </button>
            <button class="btn btn-outline" onclick="QuizEngine.renderStartScreen('${s.sectionId}', '${s.containerId}')">
              スタート画面に戻る
            </button>
          </div>
        </div>
      </div>
    `;

    // パロットを挿入
    const parrotEl = document.getElementById(`${s.containerId}-result-parrot`);
    if (parrotEl && typeof ParrotSVG !== 'undefined') {
      parrotEl.innerHTML = ParrotSVG.create(mood, 80);
    }
  },

  /**
   * 評価を取得
   */
  _getGrade(percentage) {
    if (percentage >= 90) return { grade: 'S ランク', message: '素晴らしい！ほぼ完璧な理解です。信託銀行の業務を深く理解しています！', mood: 'cheering' };
    if (percentage >= 70) return { grade: 'A ランク', message: 'よくできました！基本的な理解はしっかりしています。間違えた部分を復習してさらにレベルアップしよう！', mood: 'correct' };
    if (percentage >= 50) return { grade: 'B ランク', message: '半分以上正解！もう少し復習すれば、さらに理解が深まりますよ。苦手な部分を重点的に見直そう。', mood: 'normal' };
    return { grade: 'C ランク', message: 'まだまだこれから！セクションの内容をもう一度読み返してみよう。繰り返し学習することで必ず身につくよ！', mood: 'incorrect' };
  },

  /**
   * タイプ別正答率を計算
   */
  _calcTypeStats(state) {
    const stats = {};
    state.answers.forEach((a, i) => {
      const q = state.questions[i];
      const type = q.type;
      if (!stats[type]) stats[type] = { total: 0, correct: 0 };
      stats[type].total++;
      if (a.correct) stats[type].correct++;
    });

    return Object.entries(stats).map(([type, s]) => ({
      label: this.TYPE_LABELS[type] || type,
      total: s.total,
      correct: s.correct,
      rate: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
    }));
  },

  /**
   * 苦手分野を表示（comprehensive用）
   */
  _renderWeakAreas(state) {
    const sectionStats = {};
    state.answers.forEach((a, i) => {
      const q = state.questions[i];
      const section = q.section || state.sectionId;
      if (!sectionStats[section]) sectionStats[section] = { total: 0, correct: 0 };
      sectionStats[section].total++;
      if (a.correct) sectionStats[section].correct++;
    });

    const weak = Object.entries(sectionStats)
      .filter(([, s]) => s.total > 0 && (s.correct / s.total) < 0.7)
      .map(([id, s]) => ({
        name: this.SECTION_NAMES[id] || id,
        rate: Math.round((s.correct / s.total) * 100)
      }));

    if (weak.length === 0) return '';

    return `
      <div class="quiz-result-weak">
        <h4>復習をおすすめするセクション</h4>
        <div class="quiz-weak-list">
          ${weak.map(w => `
            <div class="quiz-weak-item">
              <span class="quiz-weak-name">${w.name}</span>
              <span class="quiz-weak-rate">${w.rate}%</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /* ========================================
     結果の保存・取得
     ======================================== */

  _saveResult(sectionId, score, total, percentage) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      data[sectionId] = {
        score,
        total,
        percentage,
        date: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('クイズ結果の保存に失敗:', e);
    }
  },

  _getResult(sectionId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      return data[sectionId] || null;
    } catch {
      return null;
    }
  }
};
