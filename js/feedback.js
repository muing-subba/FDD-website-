/**
 * LBEF HOOP FEST 2027 - Tournament Survey & Feedback Module
 */

const ratings = { overall: 5, org: 5, sched: 4, fac: 5 };

const DEFAULT_FEEDBACK = [
  { name: "Suman Shakya", role: "Varsity Player", score: 5, comment: "Incredible hardwood quality at Maitidevi Arena! Referees from FIBA Nepal kept the game flow sharp.", date: "October 26, 2027" },
  { name: "Divya Adhikari", role: "Campus Spectator", score: 5, comment: "The electric atmosphere during Cyber Warriors vs Tech Titans was unforgettable. Great sound setup!", date: "October 26, 2027" },
  { name: "Kiran Shrestha", role: "Courtside Volunteer", score: 4, comment: "Volunteering at the scoring table was well coordinated. Great learning experience.", date: "October 25, 2027" }
];

function setRating(field, val) {
  ratings[field] = val;
  const row = document.querySelector(`.star-rating-row[data-field="${field}"]`);
  if (row) {
    const btns = row.querySelectorAll('.star-btn');
    btns.forEach((b, idx) => {
      if (idx < val) b.classList.add('active');
      else b.classList.remove('active');
    });
  }
}

function renderFeedbackSummary() {
  const stored = JSON.parse(localStorage.getItem('lbef_feedback') || '[]');
  const all = [...DEFAULT_FEEDBACK, ...stored];

  const total = all.length;
  let sum = 0;
  all.forEach(item => sum += (item.score || 5));
  const avg = (sum / total).toFixed(1);

  const avgEl = document.getElementById('avg-score-display');
  const countEl = document.getElementById('total-reviews-count');
  if (avgEl) avgEl.textContent = avg;
  if (countEl) countEl.textContent = total;

  const listContainer = document.getElementById('recent-reviews-list');
  if (listContainer) {
    listContainer.innerHTML = all.slice(-4).reverse().map(item => `
      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 12px 14px; border-radius: var(--radius-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: var(--pure-white); font-size: 13px;">${item.name}</strong>
          <span style="color: #eab308; font-size: 13px;">${'★'.repeat(item.score || 5)}</span>
        </div>
        <span style="font-size: 11px; color: var(--court-orange); font-weight: 600; text-transform: uppercase;">${item.role}</span>
        <p style="font-size: 12px; color: var(--secondary); margin-top: 6px; line-height: 1.5;">"${item.comment}"</p>
      </div>
    `).join('');
  }
}

function handleFeedbackSubmit(e) {
  e.preventDefault();
  if (window.FormValidator) {
    window.FormValidator.clearStatusBanner('feedback-form-status');
    if (!window.FormValidator.validateForm(e.target)) {
      window.FormValidator.setStatusBanner(
        'feedback-form-status',
        'error',
        'Please fill in all required survey fields before submitting.'
      );
      showToast('Please complete all required survey fields.', 'error');
      return;
    }
  }

  const name = document.getElementById('fb-name').value.trim();
  const role = document.getElementById('fb-role').value;
  const nps = document.getElementById('fb-nps').value;
  const comment = document.getElementById('fb-comments').value.trim();

  const calculatedScore = Math.round((ratings.overall + ratings.org + ratings.sched + ratings.fac) / 4);

  const stored = JSON.parse(localStorage.getItem('lbef_feedback') || '[]');
  stored.push({
    name,
    role,
    nps,
    score: calculatedScore,
    comment,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  localStorage.setItem('lbef_feedback', JSON.stringify(stored));

  e.target.reset();
  ['overall', 'org', 'sched', 'fac'].forEach(f => setRating(f, 5));

  if (window.FormValidator) {
    window.FormValidator.setStatusBanner(
      'feedback-form-status',
      'success',
      'Thank you! Your tournament feedback has been saved.'
    );
  }

  renderFeedbackSummary();
  openModal('modal-feedback-confirm');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.star-rating-row')) {
    ['overall', 'org', 'sched', 'fac'].forEach(f => setRating(f, 5));
    renderFeedbackSummary();
  }
});

window.setRating = setRating;
window.handleFeedbackSubmit = handleFeedbackSubmit;
