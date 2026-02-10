/* ========================================
   アーキテクチャ学習ランド - 進捗管理
   ======================================== */

const ProgressManager = (() => {
  const STORAGE_KEY = 'archLearningLand_progress';

  // Phase/Topic structure definition
  const PHASE_STRUCTURE = {
    phase1: {
      name: 'データの旅 - 基礎編',
      topics: [
        { id: 'what-is-architecture', title: 'システムアーキテクチャとは何か' },
        { id: 'data-lifecycle', title: 'データのライフサイクル' },
        { id: 'architecture-patterns', title: 'アーキテクチャパターン比較' },
        { id: 'cloud-basics', title: 'クラウドの基礎' },
        { id: 'api-integration', title: 'API・システム連携の基礎' }
      ]
    },
    phase2: {
      name: '旅の安全を守る',
      topics: [
        { id: 'non-functional-requirements', title: '非機能要件とは何か' },
        { id: 'availability', title: '可用性（Availability）' },
        { id: 'scalability', title: 'スケーラビリティ' },
        { id: 'security', title: 'セキュリティ' },
        { id: 'performance', title: 'パフォーマンス' },
        { id: 'cost-structure', title: 'コスト構造と運用保守' }
      ]
    },
    phase3: {
      name: '旅のルートを設計する',
      topics: [
        { id: 'industry-dx-map', title: '業界別DX課題マップ' },
        { id: 'hearing-framework', title: '課題ヒアリングフレームワーク' },
        { id: 'decision-tree', title: 'アーキ選定ディシジョンツリー' },
        { id: 'reading-diagrams', title: '構成図の読み方・描き方' }
      ]
    },
    phase4: {
      name: '旅の仲間と話す',
      topics: [
        { id: 'dev-process', title: '開発プロセス入門' },
        { id: 'reading-estimates', title: '見積もりの読み方' },
        { id: 'tech-dictionary', title: '技術用語ブリッジ辞典' },
        { id: 'review-guide', title: 'アーキレビュー参加ガイド' }
      ]
    },
    phase5: {
      name: '旅の案内人になる',
      topics: [
        { id: 'comprehensive-quiz', title: '総合理解度クイズ' },
        { id: 'case-study-manufacturing', title: 'ケーススタディ：製造業IoT基盤' },
        { id: 'case-study-banking', title: 'ケーススタディ：地方銀行API基盤' },
        { id: 'case-study-retail', title: 'ケーススタディ：小売オムニチャネル' },
        { id: 'roleplay', title: 'ロールプレイ：初回提案ミーティング' }
      ]
    }
  };

  function getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : createInitialProgress();
    } catch {
      return createInitialProgress();
    }
  }

  function createInitialProgress() {
    const progress = {};
    for (const [phaseId, phase] of Object.entries(PHASE_STRUCTURE)) {
      progress[phaseId] = {
        topics: {}
      };
      for (const topic of phase.topics) {
        progress[phaseId].topics[topic.id] = {
          completed: false,
          quizScore: null,
          quizMaxScore: null
        };
      }
    }
    saveProgress(progress);
    return progress;
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage full or unavailable
    }
  }

  function markTopicComplete(phaseId, topicId) {
    const progress = getProgress();
    if (progress[phaseId] && progress[phaseId].topics[topicId]) {
      progress[phaseId].topics[topicId].completed = true;
      saveProgress(progress);
    }
  }

  function saveQuizScore(phaseId, topicId, score, maxScore) {
    const progress = getProgress();
    if (progress[phaseId] && progress[phaseId].topics[topicId]) {
      const current = progress[phaseId].topics[topicId];
      // Keep the best score
      if (current.quizScore === null || score > current.quizScore) {
        current.quizScore = score;
        current.quizMaxScore = maxScore;
      }
      current.completed = true;
      saveProgress(progress);
    }
  }

  function getPhaseProgress(phaseId) {
    const progress = getProgress();
    const phaseData = progress[phaseId];
    if (!phaseData) return { completed: 0, total: 0, percentage: 0 };

    const topics = Object.values(phaseData.topics);
    const completed = topics.filter(t => t.completed).length;
    const total = topics.length;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  function getOverallProgress() {
    let totalCompleted = 0;
    let totalTopics = 0;

    for (const phaseId of Object.keys(PHASE_STRUCTURE)) {
      const p = getPhaseProgress(phaseId);
      totalCompleted += p.completed;
      totalTopics += p.total;
    }

    return {
      completed: totalCompleted,
      total: totalTopics,
      percentage: totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0
    };
  }

  function isTopicCompleted(phaseId, topicId) {
    const progress = getProgress();
    return progress[phaseId]?.topics[topicId]?.completed || false;
  }

  function getTopicQuizScore(phaseId, topicId) {
    const progress = getProgress();
    const topic = progress[phaseId]?.topics[topicId];
    if (!topic || topic.quizScore === null) return null;
    return { score: topic.quizScore, maxScore: topic.quizMaxScore };
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    return createInitialProgress();
  }

  function getPhaseStructure() {
    return PHASE_STRUCTURE;
  }

  // Scroll-based completion tracking
  function initScrollTracking(phaseId, topicId) {
    let hasCompleted = false;

    function checkScroll() {
      if (hasCompleted) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Mark complete when scrolled to within 100px of bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        hasCompleted = true;
        markTopicComplete(phaseId, topicId);
        window.removeEventListener('scroll', checkScroll);

        // Dispatch event for UI updates
        document.dispatchEvent(new CustomEvent('topicCompleted', {
          detail: { phaseId, topicId }
        }));
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
  }

  return {
    getProgress,
    markTopicComplete,
    saveQuizScore,
    getPhaseProgress,
    getOverallProgress,
    isTopicCompleted,
    getTopicQuizScore,
    resetProgress,
    getPhaseStructure,
    initScrollTracking
  };
})();
