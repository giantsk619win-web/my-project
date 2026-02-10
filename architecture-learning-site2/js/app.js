/* ========================================
   アーキテクチャ学習ランド - メインアプリ
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProgressUI();
  initQuiz();
});

/* --- Navigation --- */
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }
}

/* --- Progress UI updates --- */
function initProgressUI() {
  // Update overall progress bar (top page)
  const overallBar = document.querySelector('.overall-progress .progress-bar-fill');
  const overallLabel = document.querySelector('.overall-progress .progress-label');

  if (overallBar && overallLabel) {
    const overall = ProgressManager.getOverallProgress();
    overallBar.style.width = overall.percentage + '%';
    overallLabel.textContent = `${overall.completed} / ${overall.total} トピック完了（${overall.percentage}%）`;
  }

  // Update phase cards (top page)
  document.querySelectorAll('.phase-card').forEach(card => {
    const phaseNum = card.dataset.phase;
    if (!phaseNum) return;

    const phaseId = 'phase' + phaseNum;
    const progress = ProgressManager.getPhaseProgress(phaseId);

    const bar = card.querySelector('.progress-bar-fill');
    const label = card.querySelector('.progress-label');

    if (bar) bar.style.width = progress.percentage + '%';
    if (label) label.textContent = `${progress.completed} / ${progress.total} 完了（${progress.percentage}%）`;
  });

  // Update phase page progress
  const phaseProgressBar = document.querySelector('.phase-progress .progress-bar-fill');
  const phaseProgressLabel = document.querySelector('.phase-progress .progress-label');
  const currentPhase = document.body.dataset.phase;

  if (phaseProgressBar && phaseProgressLabel && currentPhase) {
    const phaseId = 'phase' + currentPhase;
    const progress = ProgressManager.getPhaseProgress(phaseId);
    phaseProgressBar.style.width = progress.percentage + '%';
    phaseProgressLabel.textContent = `${progress.completed} / ${progress.total} トピック完了（${progress.percentage}%）`;
  }

  // Update topic cards completion status
  document.querySelectorAll('.topic-card').forEach(card => {
    const phaseId = card.dataset.phase;
    const topicId = card.dataset.topic;
    if (!phaseId || !topicId) return;

    const isCompleted = ProgressManager.isTopicCompleted(phaseId, topicId);
    const statusEl = card.querySelector('.topic-status');

    if (statusEl) {
      if (isCompleted) {
        statusEl.classList.add('completed');
        statusEl.classList.remove('incomplete');
        statusEl.textContent = '✓';
      } else {
        statusEl.classList.add('incomplete');
        statusEl.classList.remove('completed');
        statusEl.textContent = '';
      }
    }
  });

  // Reset progress button
  const resetBtn = document.querySelector('.reset-progress');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('学習の進捗をすべてリセットしますか？')) {
        ProgressManager.resetProgress();
        location.reload();
      }
    });
  }
}

/* --- Quiz System --- */
function initQuiz() {
  document.querySelectorAll('.quiz-card').forEach(quizCard => {
    const options = quizCard.querySelectorAll('.quiz-option');
    const feedbackEl = quizCard.querySelector('.quiz-feedback');
    const explanationEl = quizCard.querySelector('.quiz-explanation');
    const correctAnswer = quizCard.dataset.answer;
    const phaseId = quizCard.dataset.phase;
    const topicId = quizCard.dataset.topic;
    let answered = false;

    options.forEach(option => {
      option.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const selected = option.dataset.option;
        const isCorrect = selected === correctAnswer;

        // Mark selected
        option.classList.add('selected');

        // Show correct/incorrect
        options.forEach(opt => {
          opt.style.pointerEvents = 'none';
          if (opt.dataset.option === correctAnswer) {
            opt.classList.add('correct');
          } else if (opt === option && !isCorrect) {
            opt.classList.add('incorrect');
          }
        });

        // Show feedback
        if (feedbackEl) {
          feedbackEl.classList.add('show');
          if (isCorrect) {
            feedbackEl.classList.add('correct');
            feedbackEl.querySelector('.feedback-title').textContent = '🎉 正解！';
          } else {
            feedbackEl.classList.add('incorrect');
            feedbackEl.querySelector('.feedback-title').textContent = '😅 不正解...';
          }
        }

        // Show explanation
        if (explanationEl) {
          explanationEl.classList.add('show');
        }

        // Save score
        if (phaseId && topicId) {
          ProgressManager.saveQuizScore(phaseId, topicId, isCorrect ? 1 : 0, 1);
        }

        // Add retry button
        const retryBtn = quizCard.querySelector('.quiz-retry');
        if (retryBtn) {
          retryBtn.style.display = 'inline-flex';
          retryBtn.addEventListener('click', () => {
            answered = false;
            options.forEach(opt => {
              opt.classList.remove('selected', 'correct', 'incorrect');
              opt.style.pointerEvents = '';
            });
            if (feedbackEl) {
              feedbackEl.classList.remove('show', 'correct', 'incorrect');
            }
            if (explanationEl) {
              explanationEl.classList.remove('show');
            }
            retryBtn.style.display = 'none';
          });
        }
      });
    });
  });
}
