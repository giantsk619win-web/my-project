/* ========================================
   ロールプレイ・チャットシミュレーション
   ======================================== */

const RoleplayEngine = (() => {
  let scenario = null;
  let containerEl = null;
  let chatEl = null;
  let choicesEl = null;
  let currentNodeId = null;
  let score = 0;
  let maxScore = 0;
  let choicesMade = 0;
  let messageQueue = [];
  let isAnimating = false;

  const SPEAKERS = {
    customer: { name: '', icon: '👔', className: 'rp-msg-customer' },
    sales: { name: 'あなた（営業）', icon: '🧑‍💼', className: 'rp-msg-sales' },
    se: { name: '', icon: '👨‍💻', className: 'rp-msg-se' },
    narrator: { name: 'ナレーション', icon: '📖', className: 'rp-msg-narrator' }
  };

  function init(containerId, scenarioData) {
    scenario = scenarioData;
    containerEl = document.getElementById(containerId);
    if (!containerEl || !scenario) return;

    // Set speaker names from scenario
    if (scenario.speakers) {
      Object.entries(scenario.speakers).forEach(([key, val]) => {
        if (SPEAKERS[key]) {
          SPEAKERS[key].name = val.name || SPEAKERS[key].name;
          if (val.icon) SPEAKERS[key].icon = val.icon;
        }
      });
    }

    containerEl.innerHTML = `
      <div class="rp-chat" id="rpChat"></div>
      <div class="rp-choices" id="rpChoices"></div>
    `;
    chatEl = document.getElementById('rpChat');
    choicesEl = document.getElementById('rpChoices');

    currentNodeId = scenario.startNode || 'start';
    processNode(currentNodeId);
  }

  function processNode(nodeId) {
    const node = scenario.nodes[nodeId];
    if (!node) return;
    currentNodeId = nodeId;

    if (node.type === 'messages') {
      queueMessages(node.messages, () => {
        if (node.next) {
          processNode(node.next);
        }
      });
    } else if (node.type === 'choice') {
      queueMessages(node.messages || [], () => {
        showChoices(node);
      });
    } else if (node.type === 'end') {
      queueMessages(node.messages || [], () => {
        showResult(node);
      });
    }
  }

  function queueMessages(messages, callback) {
    if (!messages || messages.length === 0) {
      if (callback) callback();
      return;
    }

    let idx = 0;
    function showNext() {
      if (idx >= messages.length) {
        if (callback) callback();
        return;
      }
      const msg = messages[idx];
      idx++;
      addMessage(msg.speaker, msg.text, () => {
        setTimeout(showNext, 400);
      });
    }
    showNext();
  }

  function addMessage(speakerKey, text, callback) {
    const speaker = SPEAKERS[speakerKey] || SPEAKERS.narrator;
    const msgEl = document.createElement('div');
    msgEl.className = `rp-msg ${speaker.className}`;
    msgEl.innerHTML = `
      <div class="rp-msg-avatar">${speaker.icon}</div>
      <div class="rp-msg-content">
        <div class="rp-msg-name">${speaker.name}</div>
        <div class="rp-msg-text">${text}</div>
      </div>
    `;
    msgEl.style.opacity = '0';
    msgEl.style.transform = 'translateY(10px)';
    chatEl.appendChild(msgEl);

    requestAnimationFrame(() => {
      msgEl.style.transition = 'opacity 0.3s, transform 0.3s';
      msgEl.style.opacity = '1';
      msgEl.style.transform = 'translateY(0)';
    });

    chatEl.scrollTop = chatEl.scrollHeight;
    setTimeout(() => {
      chatEl.scrollTop = chatEl.scrollHeight;
      if (callback) callback();
    }, 350);
  }

  function showChoices(node) {
    choicesEl.innerHTML = '';
    const prompt = document.createElement('div');
    prompt.className = 'rp-choice-prompt';
    prompt.textContent = 'あなたの発言を選んでください：';
    choicesEl.appendChild(prompt);

    node.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = 'rp-choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => handleChoice(node, choice, i));
      choicesEl.appendChild(btn);
    });

    choicesEl.style.display = 'block';
    choicesEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function handleChoice(node, choice, idx) {
    choicesEl.style.display = 'none';
    choicesEl.innerHTML = '';

    // Show the player's chosen message
    addMessage('sales', choice.text, () => {
      // Show feedback
      score += choice.score || 0;
      maxScore += node.maxPoints || 1;
      choicesMade++;

      if (choice.feedback) {
        const fbEl = document.createElement('div');
        fbEl.className = `rp-feedback ${(choice.score || 0) >= (node.maxPoints || 1) ? 'rp-feedback-good' : choice.score > 0 ? 'rp-feedback-ok' : 'rp-feedback-bad'}`;
        fbEl.innerHTML = `<div class="rp-feedback-text">${choice.feedback}</div>`;
        fbEl.style.opacity = '0';
        chatEl.appendChild(fbEl);
        requestAnimationFrame(() => {
          fbEl.style.transition = 'opacity 0.3s';
          fbEl.style.opacity = '1';
        });
      }

      setTimeout(() => {
        chatEl.scrollTop = chatEl.scrollHeight;
        if (choice.next) {
          processNode(choice.next);
        }
      }, 800);
    });
  }

  function showResult(node) {
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    let feedback, feedbackClass;
    if (pct >= 90) {
      feedback = '🦉🎉 素晴らしい提案力！お客様の信頼を勝ち取れる営業ですね！';
      feedbackClass = 'rp-score-excellent';
    } else if (pct >= 70) {
      feedback = '🦉✨ いい線いっています！さらに磨けばエースになれますよ！';
      feedbackClass = 'rp-score-good';
    } else if (pct >= 50) {
      feedback = '🦉📚 基本はOK！もう少し各Phaseを復習して再チャレンジ！';
      feedbackClass = 'rp-score-fair';
    } else {
      feedback = '🦉🤔 もう一度Phase1から振り返ってみよう。焦らなくて大丈夫！';
      feedbackClass = 'rp-score-poor';
    }

    const resultHTML = `
      <div class="rp-result">
        <h3 class="rp-result-title">ロールプレイ結果</h3>
        <div class="rp-result-score ${feedbackClass}">
          <span class="rp-result-pct">${pct}%</span>
          <span class="rp-result-detail">${score} / ${maxScore} ポイント</span>
        </div>
        <p class="rp-result-feedback">${feedback}</p>
        ${node.summary ? `<p class="rp-result-summary">${node.summary}</p>` : ''}
        <button class="rp-restart-btn" onclick="location.reload()">もう一度挑戦する</button>
      </div>
    `;

    const resultEl = document.createElement('div');
    resultEl.innerHTML = resultHTML;
    chatEl.appendChild(resultEl);
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  function getScore() {
    return { score, maxScore, percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0 };
  }

  return { init, getScore };
})();
