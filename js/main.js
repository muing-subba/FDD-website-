/**
 * LBEF HOOP FEST 2027 - Master Core JavaScript
 * Shared utilities: Theme Manager (Dark/Light), Animated Hamburger Navigation,
 * Session State, Interactive Countdown, Downloads, EmailJS Delivery, Modals & Toasts
 * Lord Buddha Education Foundation, Kathmandu, Nepal
 */

// Apply saved theme immediately to avoid flash of wrong theme
(function applyInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('lbef_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// Default Seed Data with October 25 - 30, 2027 Dates
const DEFAULT_TEAMS = [
  { id: 'T01', name: 'Cyber Warriors', faculty: 'Faculty of IT', seed: 1, captain: 'Aayush Shrestha', won: 3, lost: 0, points: 6, logoIcon: 'sports_martial_arts' },
  { id: 'T02', name: 'Tech Titans', faculty: 'Faculty of CS', seed: 3, captain: 'Rohan Maharjan', won: 2, lost: 1, points: 5, logoIcon: 'bolt' },
  { id: 'T03', name: 'KTM Dunkers', faculty: 'Business School', seed: 2, captain: 'Prashant Thapa', won: 3, lost: 0, points: 6, logoIcon: 'sports_basketball' },
  { id: 'T04', name: 'APU Thunderbolts', faculty: 'Exchange Team (Malaysia)', seed: 4, captain: 'Darren Lee', won: 2, lost: 1, points: 5, logoIcon: 'electric_bolt' },
  { id: 'T05', name: 'Maitidevi Mavericks', faculty: 'Dept of Data Science', seed: 5, captain: 'Suman Rai', won: 1, lost: 2, points: 4, logoIcon: 'flash_on' },
  { id: 'T06', name: 'Cloud Hawks', faculty: 'Cloud Computing Faculty', seed: 6, captain: 'Bibek Sharma', won: 1, lost: 2, points: 4, logoIcon: 'military_tech' },
  { id: 'T07', name: 'Apex Legends', faculty: 'MBA Executive', seed: 7, captain: 'Nitesh Joshi', won: 0, lost: 3, points: 3, logoIcon: 'shield' },
  { id: 'T08', name: 'Kathmandu Vipers', faculty: 'BBA Digital', seed: 8, captain: 'Anish Karki', won: 0, lost: 3, points: 3, logoIcon: 'pets' }
];

const DEFAULT_MATCHES = [
  {
    id: 'CER-01',
    round: 'Ceremony',
    date: 'October 25, 2027',
    time: '08:30 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'All 16 Participating Teams',
    team2: 'Athletic Council',
    status: 'Completed',
    score1: '-',
    score2: '-',
    highlights: 'Grand Opening Ceremony featuring the Parade of Nations, Torch Relay, and Official Oath by LBEF & APU leadership.',
    referee: 'Organizing Committee'
  },
  {
    id: 'M01',
    round: 'Group Stage',
    date: 'October 25, 2027',
    time: '10:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Cloud Hawks',
    score1: 78,
    score2: 65,
    status: 'Completed',
    highlights: 'Cyber Warriors dominated perimeter scoring with 12 three-pointers.',
    referee: 'Sudip Shakya (FIBA Nepal)'
  },
  {
    id: 'M02',
    round: 'Group Stage',
    date: 'October 25, 2027',
    time: '12:30 PM NPT',
    court: 'Court 2 - East Wing',
    team1: 'KTM Dunkers',
    team2: 'Apex Legends',
    score1: 82,
    score2: 70,
    status: 'Completed',
    highlights: 'High-intensity fastbreaks led by captain Prashant Thapa.',
    referee: 'Ramesh Adhikari'
  },
  {
    id: 'M03',
    round: 'Group Stage',
    date: 'October 25, 2027',
    time: '03:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Tech Titans',
    team2: 'Maitidevi Mavericks',
    score1: 68,
    score2: 71,
    status: 'Completed',
    highlights: 'Thrilling buzzer beater in the final 4 seconds by Mavericks.',
    referee: 'Dipendra KC'
  },
  {
    id: 'M04',
    round: 'Round of 16',
    date: 'October 26, 2027',
    time: '11:00 AM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Tech Titans',
    score1: 52,
    score2: 49,
    status: 'Live',
    currentQuarter: '4th Quarter - 02:15 remaining',
    highlights: 'Electric rivalry clash with live student streaming broadcast.',
    referee: 'Sudip Shakya (FIBA Nepal)'
  },
  {
    id: 'M05',
    round: 'Quarterfinals',
    date: 'October 27, 2027',
    time: '02:30 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'KTM Dunkers',
    team2: 'APU Thunderbolts',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Cross-border collegiate clash between Kathmandu and APU Kuala Lumpur.',
    referee: 'Binod Karki'
  },
  {
    id: 'M06',
    round: 'Quarterfinals',
    date: 'October 27, 2027',
    time: '05:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Cyber Warriors',
    team2: 'Maitidevi Mavericks',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Rematch of the 2027 Inter-Faculty Semifinals.',
    referee: 'Ramesh Adhikari'
  },
  {
    id: 'M07',
    round: 'Semifinals',
    date: 'October 28, 2027',
    time: '01:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Winner QF 1',
    team2: 'Winner QF 2',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'Semifinal Battle for the Grand Championship ticket.',
    referee: 'FIBA Nepal Senior Panel'
  },
  {
    id: 'M08',
    round: 'Final',
    date: 'October 30, 2027',
    time: '04:00 PM NPT',
    court: 'Court 1 - Main Arena',
    team1: 'Finalist Alpha',
    team2: 'Finalist Beta',
    score1: 0,
    score2: 0,
    status: 'Upcoming',
    highlights: 'The Grand Finale. Trophy elevation and closing ceremony.',
    referee: 'International Guest Official (Malaysia)'
  }
];

/* ==========================================================================
   DARK & LIGHT THEME MANAGEMENT (localStorage persisted)
   ========================================================================== */
function updateThemeButtons(theme) {
  const isLight = theme === 'light';
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    btn.innerHTML = `<span class="material-symbols-outlined">${isLight ? 'dark_mode' : 'light_mode'}</span>`;
  });
  const mobileLabel = document.getElementById('mobile-theme-label');
  if (mobileLabel) {
    mobileLabel.textContent = isLight ? 'Light Mode Active' : 'Dark Mode Active';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('lbef_theme', next);
  } catch (e) {}
  updateThemeButtons(next);
  showToast(`Switched to ${next === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
}

function initTheme() {
  const saved = localStorage.getItem('lbef_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeButtons(saved);
}

/* ==========================================================================
   STORAGE & NAVIGATION
   ========================================================================== */
function initStorage() {
  localStorage.setItem('lbef_matches', JSON.stringify(DEFAULT_MATCHES));
  if (!localStorage.getItem('lbef_teams')) {
    localStorage.setItem('lbef_teams', JSON.stringify(DEFAULT_TEAMS));
  }
  if (!localStorage.getItem('lbef_volunteers')) {
    localStorage.setItem('lbef_volunteers', JSON.stringify([]));
  }
  if (!localStorage.getItem('lbef_inquiries')) {
    localStorage.setItem('lbef_inquiries', JSON.stringify([]));
  }
  if (!localStorage.getItem('lbef_feedback')) {
    localStorage.setItem('lbef_feedback', JSON.stringify([]));
  }
}

function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-list a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const currentUser = localStorage.getItem('lbef_current_user');
  const authNavSlots = document.querySelectorAll('.auth-nav-slot');
  authNavSlots.forEach(slot => {
    if (currentUser) {
      const user = JSON.parse(currentUser);
      slot.innerHTML = `
        <a href="dashboard.html" class="btn btn-secondary btn-sm" title="${user.name}">
          <span class="material-symbols-outlined" style="font-size: 16px;">dashboard</span>
          <span>${user.role === 'Captain' ? 'Team Hub' : 'Dashboard'}</span>
        </a>
      `;
    }
  });
}

/* ==========================================================================
   RESPONSIVE HAMBURGER MENU
   ========================================================================== */
function openMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (drawer) drawer.classList.add('open');
  if (toggleBtn) {
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (drawer) drawer.classList.remove('open');
  if (toggleBtn) {
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function initMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.querySelector('.menu-toggle');
  if (!drawer) return;

  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'mobile-drawer');
  }

  // Close menu automatically when clicking any navigation link inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside header/drawer
  document.addEventListener('click', (e) => {
    if (!drawer.classList.contains('open')) return;
    const header = document.querySelector('.site-header');
    if (header && !header.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on Escape key or when resizing up to desktop width
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1260 && drawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

/* ==========================================================================
   VANILLA JS FILE DOWNLOAD HELPER
   ========================================================================== */
function downloadTournamentFile(fileKey, fallbackContent, fallbackFilename) {
  const cfg = window.TOURNAMENT_CONFIG && window.TOURNAMENT_CONFIG.downloads
    ? window.TOURNAMENT_CONFIG.downloads[fileKey]
    : null;

  if (cfg && cfg.url) {
    const a = document.createElement('a');
    a.href = cfg.url;
    a.download = cfg.filename || fallbackFilename || cfg.url.split('/').pop();
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloading: ${cfg.title || a.download}`, 'success');
    return;
  }

  if (fallbackContent) {
    const blob = new Blob([fallbackContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fallbackFilename || 'LBEF-HoopFest-Document.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded: ${a.download}`, 'success');
  }
}

/* ==========================================================================
   EMAILJS INTEGRATION HELPER (Automatic Reply + Admin Notification)
   ========================================================================== */
function isEmailJSConfigured() {
  const cfg = window.TOURNAMENT_CONFIG && window.TOURNAMENT_CONFIG.emailjs;
  if (!cfg) return false;
  const isPlaceholder = (val) => !val || val.startsWith('YOUR_EMAILJS_') || val.includes('example.com');
  return !isPlaceholder(cfg.PUBLIC_KEY) && !isPlaceholder(cfg.SERVICE_ID) && !isPlaceholder(cfg.TEMPLATE_ID);
}

async function sendTournamentEmails(payload) {
  const cfg = window.TOURNAMENT_CONFIG && window.TOURNAMENT_CONFIG.emailjs;

  if (!isEmailJSConfigured()) {
    return {
      ok: false,
      reason: 'not_configured',
      error: 'EmailJS credentials are not configured yet. Please insert your EmailJS Public Key, Service ID, Template ID, and Recipient Email in js/config.js.'
    };
  }

  if (typeof window.emailjs === 'undefined') {
    return {
      ok: false,
      reason: 'sdk_missing',
      error: 'EmailJS SDK could not be loaded. Please check your internet connection and try again.'
    };
  }

  try {
    window.emailjs.init({ publicKey: cfg.PUBLIC_KEY });

    const commonParams = {
      from_name: payload.userName || 'Participant',
      user_name: payload.userName || 'Participant',
      user_email: payload.userEmail || '',
      reply_to: payload.userEmail || '',
      user_phone: payload.userPhone || '',
      to_email: cfg.RECIPIENT_EMAIL,
      recipient_email: cfg.RECIPIENT_EMAIL,
      form_type: payload.formType || 'Tournament Submission',
      subject: payload.subject || `LBEF HOOP FEST 2027 - ${payload.formType}`,
      team_name: payload.teamName || 'N/A',
      faculty: payload.faculty || 'N/A',
      student_id: payload.studentId || 'N/A',
      registration_id: payload.registrationId || 'N/A',
      message: payload.message || '',
      details_summary: payload.detailsSummary || ''
    };

    // 1. Send form submission to configured tournament recipient email
    const adminResponse = await window.emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, commonParams);
    if (!adminResponse || adminResponse.status !== 200) {
      return {
        ok: false,
        reason: 'send_failed',
        error: 'Email delivery failed. Please verify your EmailJS Service ID and Template ID.'
      };
    }

    // 2. Send automatic confirmation reply to the user's email if a separate auto-reply template is configured
    const hasSeparateAutoReply = cfg.AUTO_REPLY_TEMPLATE_ID && !cfg.AUTO_REPLY_TEMPLATE_ID.startsWith('YOUR_EMAILJS_');
    if (hasSeparateAutoReply && payload.userEmail) {
      const autoReplyParams = {
        ...commonParams,
        to_email: payload.userEmail,
        to_name: payload.userName || 'Participant'
      };
      const replyResponse = await window.emailjs.send(cfg.SERVICE_ID, cfg.AUTO_REPLY_TEMPLATE_ID, autoReplyParams);
      if (!replyResponse || replyResponse.status !== 200) {
        return {
          ok: false,
          reason: 'autoreply_failed',
          error: 'Form reached the secretariat, but the automatic confirmation email to your address failed.'
        };
      }
    }

    return { ok: true };
  } catch (err) {
    console.error('EmailJS Error:', err);
    return {
      ok: false,
      reason: 'exception',
      error: (err && err.text) ? `Email delivery failed: ${err.text}` : 'Email delivery failed due to a network or configuration error. Please try again.'
    };
  }
}

/* ==========================================================================
   INTERACTIVE TIP-OFF COUNTDOWN (STARTS OCTOBER 25, 2027)
   ========================================================================== */
let countdownUnitMode = 'standard';
let countdownTimezone = 'NPT';
let simulationOffset = 0;

const TIPOFF_UTC_TIMESTAMP = Date.UTC(2027, 9, 25, 3, 15, 0);

function initCountdown() {
  const container = document.getElementById('countdown-grid-container') || document.querySelector('.countdown-box');
  if (!container) return;

  function update() {
    const now = Date.now() + simulationOffset;
    const distance = TIPOFF_UTC_TIMESTAMP - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-minutes');
    const secsEl = document.getElementById('countdown-seconds');
    const liveTagEl = document.getElementById('countdown-live-badge');
    const secsItem = document.getElementById('countdown-item-seconds');

    if (secsItem) {
      secsItem.classList.add('tick-active');
      setTimeout(() => secsItem.classList.remove('tick-active'), 300);
    }

    if (distance > 0) {
      const totalSeconds = Math.floor(distance / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      if (countdownUnitMode === 'standard') {
        const days = totalDays;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
      } else if (countdownUnitMode === 'hours') {
        const hours = totalHours;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        const tenths = Math.floor((distance % 1000) / 100);

        if (daysEl) daysEl.textContent = String(hours);
        if (hoursEl) hoursEl.textContent = String(minutes).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(seconds).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(tenths) + '0';
      } else if (countdownUnitMode === 'minutes') {
        if (daysEl) daysEl.textContent = String(totalMinutes);
        if (hoursEl) hoursEl.textContent = String(totalSeconds % 60).padStart(2, '0');
      } else if (countdownUnitMode === 'seconds') {
        if (daysEl) daysEl.textContent = String(totalSeconds);
      }

      if (liveTagEl) {
        liveTagEl.innerHTML = '<span class="pulse-dot"></span> Official Tip-off Countdown';
        liveTagEl.style.color = 'var(--court-orange)';
      }
    } else {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';

      if (liveTagEl) {
        liveTagEl.innerHTML = '<span class="pulse-dot" style="background:#00e676;"></span> TOURNAMENT IS LIVE!';
        liveTagEl.style.color = '#00e676';
      }
    }
  }

  update();
  setInterval(update, 1000);
}

function switchCountdownUnit(mode, btn) {
  countdownUnitMode = mode;
  document.querySelectorAll('.countdown-unit-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const labelDays = document.getElementById('label-countdown-days');
  const labelHours = document.getElementById('label-countdown-hours');
  const labelMins = document.getElementById('label-countdown-mins');
  const labelSecs = document.getElementById('label-countdown-secs');
  const grid = document.getElementById('countdown-grid-container');
  const cols = document.querySelectorAll('.countdown-col-std');

  cols.forEach(c => { c.style.display = 'flex'; });

  if (mode === 'standard') {
    if (grid) grid.className = 'countdown-grid';
    if (labelDays) labelDays.textContent = 'Days';
    if (labelHours) labelHours.textContent = 'Hours';
    if (labelMins) labelMins.textContent = 'Mins';
    if (labelSecs) labelSecs.textContent = 'Secs';
  } else if (mode === 'hours') {
    if (grid) grid.className = 'countdown-grid';
    if (labelDays) labelDays.textContent = 'Total Hours';
    if (labelHours) labelHours.textContent = 'Minutes';
    if (labelMins) labelMins.textContent = 'Seconds';
    if (labelSecs) labelSecs.textContent = 'Tenths';
  } else if (mode === 'minutes') {
    if (grid) grid.className = 'countdown-grid mode-dual';
    if (labelDays) labelDays.textContent = 'Total Minutes';
    if (labelHours) labelHours.textContent = 'Seconds';
    if (cols[2]) cols[2].style.display = 'none';
    if (cols[3]) cols[3].style.display = 'none';
  } else if (mode === 'seconds') {
    if (grid) grid.className = 'countdown-grid mode-single';
    if (labelDays) labelDays.textContent = 'Total Seconds to Tip-off';
    if (cols[1]) cols[1].style.display = 'none';
    if (cols[2]) cols[2].style.display = 'none';
    if (cols[3]) cols[3].style.display = 'none';
  }

  showToast(`Countdown unit switched to ${mode.toUpperCase()}`, 'info');
}

function switchCountdownTimezone(tz, btn) {
  countdownTimezone = tz;
  document.querySelectorAll('.countdown-tz-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const tzLabel = document.getElementById('countdown-tz-label');
  if (tzLabel) {
    if (tz === 'NPT') {
      tzLabel.textContent = 'Starts October 25, 2027 • 09:00 AM NPT (Kathmandu)';
    } else if (tz === 'MYT') {
      tzLabel.textContent = 'Starts October 25, 2027 • 11:15 AM MYT (APU Malaysia)';
    } else {
      const localTime = new Date(TIPOFF_UTC_TIMESTAMP).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
      tzLabel.textContent = `Starts: ${localTime} (Your Local Device Time)`;
    }
  }
  showToast(`Timezone adjusted to ${tz}`, 'info');
}

function downloadTipoffICS() {
  const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lord Buddha Education Foundation//LBEF HOOP FEST 2027//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:tipoff-oct25-2027@study.lbef.edu.np
DTSTAMP:20271001T000000Z
DTSTART:20271025T031500Z
DTEND:20271025T051500Z
SUMMARY:LBEF HOOP FEST 2027: Official Tip-off & Opening Clash
DESCRIPTION:Grand Opening Ceremony and tip-off of the LBEF Annual Basketball Championship 2027.
LOCATION:Lord Buddha Education Foundation Sports Complex, Maitidevi, Kathmandu, Nepal
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:LBEF Hoop Fest 2027 starts in 24 hours!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'LBEF-HoopFest-TipOff-Oct25-2027.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Calendar Reminder (.ics) downloaded for October 25, 2027!', 'success');
}

function openCountdownReminder() {
  let modal = document.getElementById('modal-generic');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-generic';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 500px;">
        <button class="modal-close" onclick="closeModal('modal-generic')" aria-label="Close modal">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div id="modal-content-generic"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const content = document.getElementById('modal-content-generic');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge-tag badge-live" style="margin-bottom: 8px;">Tip-off Alert Notification</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); text-transform: uppercase;">
          Set Tip-Off Reminder
        </h3>
        <p style="font-size: 13px; color: var(--secondary); margin-top: 4px;">
          Scheduled for <strong style="color: var(--court-orange);">October 25, 2027 at 09:00 AM NPT</strong> at Maitidevi Arena.
        </p>
      </div>
      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
        <label class="form-label" style="display: block; margin-bottom: 8px;">Select Alert Timing</label>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="24h" checked>
            <span>24 Hours Prior (October 24, 09:00 AM NPT)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="2h">
            <span>2 Hours Before Tip-off (October 25, 07:00 AM NPT)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary); cursor: pointer;">
            <input type="radio" name="tipoff_alert" value="15m">
            <span>15 Minutes Prior (Starting Lineup Broadcast)</span>
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="reminder-email">Your Email / Student ID</label>
        <input type="email" id="reminder-email" class="form-input" placeholder="e.g. student@study.lbef.edu.np" value="${localStorage.getItem('lbef_user_email') || ''}">
      </div>
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="closeModal('modal-generic')">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="saveCountdownReminder()">
          <span class="material-symbols-outlined" style="font-size: 16px;">notifications_active</span>
          <span>Save Alert</span>
        </button>
      </div>
    `;
    openModal('modal-generic');
  }
}

function saveCountdownReminder() {
  const alertTime = document.querySelector('input[name="tipoff_alert"]:checked')?.value || '24h';
  const email = document.getElementById('reminder-email')?.value.trim() || 'student@study.lbef.edu.np';
  const reminders = JSON.parse(localStorage.getItem('lbef_reminders') || '[]');
  reminders.push({ email, alertTime, targetDate: 'October 25, 2027', savedAt: new Date().toISOString() });
  localStorage.setItem('lbef_reminders', JSON.stringify(reminders));
  closeModal('modal-generic');
  showToast(`Reminder saved for ${email}!`, 'success');
}

/* ==========================================================================
   TOASTS, MODALS, BACK-TO-TOP & NEWSLETTER
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: var(--court-orange)">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function handleNewsletter(event) {
  event.preventDefault();
  const form = event.target;
  if (window.FormValidator && !window.FormValidator.validateForm(form)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  const input = form.querySelector('input[type="email"]');
  if (!input || !input.value) return;

  const email = input.value.trim();
  const subscribers = JSON.parse(localStorage.getItem('lbef_subscribers') || '[]');

  if (subscribers.includes(email)) {
    showToast('You are already subscribed to tournament updates!', 'info');
  } else {
    subscribers.push(email);
    localStorage.setItem('lbef_subscribers', JSON.stringify(subscribers));
    showToast('Subscribed! You will receive live October 25 tip-off bulletins.', 'success');
  }
  input.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStorage();
  initNav();
  initMobileMenu();
  initCountdown();
  initBackToTop();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
});

function downloadProspectus() {
  const text = `LORD BUDDHA EDUCATION FOUNDATION - HOOP FEST 2027
SPONSORSHIP & PARTNERSHIP PROSPECTUS
Venue: Maitidevi Arena, Kathmandu | Dates: October 25 - 30, 2027
Contact: +977-9801234567 | basketball@study.lbef.edu.np`;
  downloadTournamentFile('prospectus', text, 'LBEF-HoopFest2027-Sponsorship-Prospectus.txt');
}

// Expose globals
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.handleNewsletter = handleNewsletter;
window.downloadTournamentFile = downloadTournamentFile;
window.downloadProspectus = downloadProspectus;
window.sendTournamentEmails = sendTournamentEmails;
window.isEmailJSConfigured = isEmailJSConfigured;
window.switchCountdownUnit = switchCountdownUnit;
window.switchCountdownTimezone = switchCountdownTimezone;
window.downloadTipoffICS = downloadTipoffICS;
window.openCountdownReminder = openCountdownReminder;
window.saveCountdownReminder = saveCountdownReminder;
