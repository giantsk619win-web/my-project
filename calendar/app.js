(() => {
  const CANVAS_W = 1080;
  const CANVAS_H = 1920;

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 2026年の日本の祝日（月は0始まり）
  const HOLIDAYS_2026 = [
    { month: 0, day: 1 },   // 元日
    { month: 0, day: 12 },  // 成人の日
    { month: 1, day: 11 },  // 建国記念の日
    { month: 1, day: 23 },  // 天皇誕生日
    { month: 2, day: 20 },  // 春分の日
    { month: 3, day: 29 },  // 昭和の日
    { month: 4, day: 3 },   // 憲法記念日
    { month: 4, day: 4 },   // みどりの日
    { month: 4, day: 5 },   // こどもの日
    { month: 4, day: 6 },   // 振替休日
    { month: 6, day: 20 },  // 海の日
    { month: 7, day: 11 },  // 山の日
    { month: 8, day: 21 },  // 敬老の日
    { month: 8, day: 23 },  // 秋分の日
    { month: 9, day: 12 },  // スポーツの日
    { month: 10, day: 3 },  // 文化の日
    { month: 10, day: 23 }, // 勤労感謝の日
  ];

  let selectedMonth = 0;
  let userImage = null;
  let position = 'bottom';
  let theme = 'dark';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  const overlay = document.getElementById('uploadOverlay');
  const fileInput = document.getElementById('fileInput');
  const downloadBtn = document.getElementById('downloadBtn');
  const positionSelect = document.getElementById('calendarPosition');
  const themeSelect = document.getElementById('calendarTheme');

  // Month buttons
  document.querySelectorAll('.month-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.month-btn.selected').classList.remove('selected');
      btn.classList.add('selected');
      selectedMonth = parseInt(btn.dataset.month);
      render();
    });
  });

  // Position & theme
  positionSelect.addEventListener('change', () => {
    position = positionSelect.value;
    render();
  });

  themeSelect.addEventListener('change', () => {
    theme = themeSelect.value;
    render();
  });

  // File upload
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) loadImage(e.target.files[0]);
  });

  // Drag & drop
  overlay.addEventListener('dragover', (e) => {
    e.preventDefault();
    overlay.classList.add('dragover');
  });

  overlay.addEventListener('dragleave', () => {
    overlay.classList.remove('dragover');
  });

  overlay.addEventListener('drop', (e) => {
    e.preventDefault();
    overlay.classList.remove('dragover');
    if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
  });

  // Allow re-uploading by clicking canvas
  canvas.addEventListener('click', () => {
    if (userImage) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', (e) => {
        if (e.target.files[0]) loadImage(e.target.files[0]);
      });
      input.click();
    }
  });

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        userImage = img;
        overlay.classList.add('hidden');
        downloadBtn.disabled = false;
        render();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Download
  downloadBtn.addEventListener('click', () => {
    if (!userImage) return;
    const link = document.createElement('a');
    link.download = `calendar_2026_${selectedMonth + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  function isHoliday(month, day) {
    return HOLIDAYS_2026.some(h => h.month === month && h.day === day);
  }

  function getCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = [];
    let week = new Array(firstDay).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    return weeks;
  }

  function render() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    if (userImage) {
      drawCoverImage(userImage);
    } else {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }

    drawCalendar();
  }

  function drawCoverImage(img) {
    const imgRatio = img.width / img.height;
    const canvasRatio = CANVAS_W / CANVAS_H;
    let sx, sy, sw, sh;

    if (imgRatio > canvasRatio) {
      sh = img.height;
      sw = sh * canvasRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, CANVAS_W, CANVAS_H);
  }

  function drawCalendar() {
    const weeks = getCalendarDays(2026, selectedMonth);
    const numWeeks = weeks.length;

    // Compact calendar - small font, minimal space
    const rowH = 36;
    const padX = 48;
    const colW = (CANVAS_W - padX * 2) / 7;
    const monthLabelH = 40;
    const dayLabelH = 32;
    const gridH = numWeeks * rowH;
    const calPadY = 28;
    const calH = calPadY + monthLabelH + dayLabelH + gridH + calPadY;
    const calY = position === 'bottom' ? CANVAS_H - calH : 0;

    // Soft gradient overlay instead of flat rectangle
    const grad = ctx.createLinearGradient(0, calY, 0, calY + calH);
    if (theme === 'dark') {
      if (position === 'bottom') {
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.15, 'rgba(0, 0, 0, 0.5)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      } else {
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
        grad.addColorStop(0.85, 'rgba(0, 0, 0, 0.5)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
    } else {
      if (position === 'bottom') {
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.6)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
      } else {
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.6)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, calY, CANVAS_W, calH);

    const textColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';
    const sundayColor = theme === 'dark' ? '#ff6b6b' : '#d63031';
    const saturdayColor = theme === 'dark' ? '#74b9ff' : '#0984e3';
    const dimColor = theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)';

    const contentY = calY + calPadY;

    // Month name & year - compact
    ctx.fillStyle = textColor;
    ctx.font = '700 34px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${MONTH_NAMES[selectedMonth]} 2026`, CANVAS_W / 2, contentY + monthLabelH / 2);

    // Day labels
    const dayLabelY = contentY + monthLabelH + dayLabelH / 2;
    ctx.font = '300 20px "Noto Sans JP", sans-serif';

    DAY_LABELS.forEach((label, i) => {
      const x = padX + colW * i + colW / 2;
      if (i === 0) ctx.fillStyle = sundayColor;
      else if (i === 6) ctx.fillStyle = saturdayColor;
      else ctx.fillStyle = dimColor;
      ctx.fillText(label, x, dayLabelY);
    });

    // Date grid - compact
    const gridStartY = contentY + monthLabelH + dayLabelH;
    ctx.font = '400 24px "Noto Sans JP", sans-serif';

    weeks.forEach((week, wi) => {
      week.forEach((day, di) => {
        if (day === null) return;
        const x = padX + colW * di + colW / 2;
        const y = gridStartY + wi * rowH + rowH / 2;

        if (di === 0 || isHoliday(selectedMonth, day)) {
          ctx.fillStyle = sundayColor;
        } else if (di === 6) {
          ctx.fillStyle = saturdayColor;
        } else {
          ctx.fillStyle = textColor;
        }

        ctx.fillText(String(day), x, y);
      });
    });
  }

  // Initial render
  render();
})();
