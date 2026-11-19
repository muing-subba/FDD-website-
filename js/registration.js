/**
 * LBEF HOOP FEST 2027 - Registration, Validation, EmailJS & Payment Demo Module
 * Enforces Vanilla JS form validation (non-empty name, valid email, 10-digit phone,
 * required fields), prevents duplicate submissions, and integrates EmailJS
 * automatic confirmation reply + secretariat notification.
 */

let rosterCount = 5;
let isTeamSubmitting = false;
let isVolunteerSubmitting = false;

function switchRegTab(tabType) {
  const teamForm = document.getElementById('team-reg-section');
  const volForm = document.getElementById('volunteer-reg-section');
  const lookupForm = document.getElementById('lookup-reg-section');
  const tabs = document.querySelectorAll('.reg-nav-btn');

  tabs.forEach(btn => btn.classList.remove('active'));

  if (tabType === 'team') {
    teamForm.style.display = 'block';
    volForm.style.display = 'none';
    lookupForm.style.display = 'none';
    document.getElementById('tab-btn-team').classList.add('active');
  } else if (tabType === 'volunteer') {
    teamForm.style.display = 'none';
    volForm.style.display = 'block';
    lookupForm.style.display = 'none';
    document.getElementById('tab-btn-volunteer').classList.add('active');
  } else if (tabType === 'lookup') {
    teamForm.style.display = 'none';
    volForm.style.display = 'none';
    lookupForm.style.display = 'block';
    document.getElementById('tab-btn-lookup').classList.add('active');
  }
}

// Add extra player slot to roster (up to 10 players)
function addPlayerSlot() {
  if (rosterCount >= 10) {
    showToast('Maximum roster size is 10 players.', 'error');
    return;
  }
  rosterCount++;
  const container = document.getElementById('roster-inputs-container');
  const div = document.createElement('div');
  div.className = 'form-grid player-row';
  div.id = `player-row-${rosterCount}`;
  div.innerHTML = `
    <div class="form-group">
      <label class="form-label required">Player #${rosterCount} Full Name</label>
      <input type="text" class="form-input player-name" data-validate="name" data-label="Player #${rosterCount} Name" placeholder="Full Name" required>
      <span class="error-text"></span>
    </div>
    <div class="form-group">
      <label class="form-label required">Student ID</label>
      <input type="text" class="form-input player-sid" data-label="Player #${rosterCount} Student ID" placeholder="e.g. NP01CP4S2400${rosterCount}" required>
      <span class="error-text"></span>
    </div>
    <div class="form-group">
      <label class="form-label required">Jersey Number</label>
      <input type="number" class="form-input player-jersey" data-label="Jersey #" placeholder="#" min="0" max="99" required>
      <span class="error-text"></span>
    </div>
    <div class="form-group" style="justify-content: flex-end;">
      <button type="button" class="btn btn-secondary btn-sm" onclick="removePlayerSlot(${rosterCount})" style="height: 42px;">
        <span class="material-symbols-outlined" style="font-size: 16px; color: #ff8a80;">delete</span>
        <span>Remove</span>
      </button>
    </div>
  `;
  container.appendChild(div);
  showToast(`Added Player #${rosterCount} slot`, 'info');
}

function removePlayerSlot(slotId) {
  if (rosterCount <= 5) {
    showToast('Minimum 5 players required for a full-court roster.', 'error');
    return;
  }
  const row = document.getElementById(`player-row-${slotId}`);
  if (row) {
    row.remove();
    rosterCount--;
  }
}

function setSubmitButtonLoading(btn, isLoading, defaultHTML, loadingText) {
  if (!btn) return;
  if (isLoading) {
    btn.disabled = true;
    btn.classList.add('btn-loading');
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">hourglass_top</span><span>${loadingText}</span>`;
  } else {
    btn.disabled = false;
    btn.classList.remove('btn-loading');
    btn.innerHTML = defaultHTML;
  }
}

// Team Registration Form Submission
async function handleTeamRegistration(e) {
  e.preventDefault();
  if (isTeamSubmitting) return;

  const form = e.target;
  const submitBtn = document.getElementById('team-submit-btn');
  const defaultBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  if (window.FormValidator) {
    window.FormValidator.clearStatusBanner('team-form-status');
    const fieldsValid = window.FormValidator.validateForm(form);
    if (!fieldsValid) {
      window.FormValidator.setStatusBanner(
        'team-form-status',
        'error',
        'Please correct the highlighted fields above before submitting.'
      );
      showToast('Please fix the highlighted validation errors.', 'error');
      return;
    }
  }

  const teamNameInput = document.getElementById('reg-team-name');
  const captainNameInput = document.getElementById('reg-captain-name');
  const captainSidInput = document.getElementById('reg-captain-sid');
  const emailInput = document.getElementById('reg-email');
  const phoneInput = document.getElementById('reg-phone');
  const deptInput = document.getElementById('reg-dept');

  const teamName = teamNameInput.value.trim();
  const captainName = captainNameInput.value.trim();
  const captainSid = captainSidInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const dept = deptInput.value;

  // Duplicate Team Name Check
  const storedTeams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const isDuplicate = storedTeams.some(t => t.name.toLowerCase() === teamName.toLowerCase());
  if (isDuplicate) {
    if (window.FormValidator) {
      window.FormValidator.showFieldError(teamNameInput, 'This team name is already registered. Please choose another name.');
      window.FormValidator.setStatusBanner('team-form-status', 'error', 'Duplicate team name detected. Choose a unique team name.');
    }
    teamNameInput.focus();
    return;
  }

  // Collect Roster Players
  const playerNames = document.querySelectorAll('.player-name');
  const playerSids = document.querySelectorAll('.player-sid');
  const playerJerseys = document.querySelectorAll('.player-jersey');
  const players = [];
  for (let i = 0; i < playerNames.length; i++) {
    players.push({
      name: playerNames[i].value.trim(),
      sid: playerSids[i].value.trim(),
      jersey: playerJerseys[i].value.trim()
    });
  }

  const regId = `LBEF-HF27-${Math.floor(1000 + Math.random() * 9000)}`;
  const regDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const rosterSummary = players.map((p, idx) => `${idx + 1}. ${p.name} (#${p.jersey}, ID: ${p.sid})`).join('\n');

  // Lock form to prevent duplicate submissions
  isTeamSubmitting = true;
  setSubmitButtonLoading(submitBtn, true, defaultBtnHTML, 'Submitting & Sending Email...');

  const emailResult = await sendTournamentEmails({
    formType: 'Team Registration (5v5)',
    userName: captainName,
    userEmail: email,
    userPhone: phone,
    teamName,
    faculty: dept,
    studentId: captainSid,
    registrationId: regId,
    subject: `Team Registration: ${teamName} (${regId})`,
    message: `Team "${teamName}" from ${dept} registered by Captain ${captainName}.`,
    detailsSummary: `Team: ${teamName}\nFaculty: ${dept}\nCaptain: ${captainName} (${captainSid})\nPhone: ${phone}\nRoster:\n${rosterSummary}`
  });

  isTeamSubmitting = false;
  setSubmitButtonLoading(submitBtn, false, defaultBtnHTML);

  if (!emailResult.ok) {
    if (window.FormValidator) {
      window.FormValidator.setStatusBanner(
        'team-form-status',
        'error',
        `<strong>Email Delivery Failed:</strong> ${emailResult.error}`
      );
    }
    showToast('Email delivery failed. Please check EmailJS configuration.', 'error');
    return;
  }

  // Only persist & show confirmed success when EmailJS confirms delivery
  const newRegistration = {
    id: regId,
    name: teamName,
    faculty: dept,
    seed: storedTeams.length + 1,
    captain: captainName,
    captainSid,
    email,
    phone,
    players,
    status: 'Confirmed & Emailed',
    feeStatus: 'Unpaid Demo',
    regDate
  };

  storedTeams.push(newRegistration);
  localStorage.setItem('lbef_teams', JSON.stringify(storedTeams));

  localStorage.setItem('lbef_current_user', JSON.stringify({
    name: captainName,
    role: 'Captain',
    studentId: captainSid,
    teamId: regId,
    teamName: teamName
  }));

  if (window.FormValidator) {
    window.FormValidator.setStatusBanner(
      'team-form-status',
      'success',
      `<strong>Registration Successful!</strong> Your team <strong>${teamName}</strong> (${regId}) has been submitted and a confirmation email was sent to <strong>${email}</strong>.`
    );
  }
  showToast('Registration submitted and confirmation email sent!', 'success');
  openPaymentModal(newRegistration);
}

// Payment Interface Demonstration Modal
function openPaymentModal(teamData) {
  const content = document.getElementById('payment-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="academic-badge" style="margin-bottom: 8px;">Illustrative Payment Demonstration</span>
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); text-transform: uppercase;">
          Tournament Entry Fee
        </h3>
        <p style="font-size: 13px; color: var(--secondary); margin-top: 4px;">
          Team: <strong style="color: var(--pure-white);">${teamData.name}</strong> &bull; Registration Ref: <strong style="color: var(--court-orange);">${teamData.id}</strong>
        </p>
      </div>

      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
          <span style="color: var(--secondary);">Team Registration Fee (FIBA 5v5):</span>
          <span style="font-weight: 700; color: var(--pure-white);">NPR 5,000</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--table-row-border); padding-top: 8px;">
          <span>Includes Official Game Ball, Medical Kit, &amp; Match Officials</span>
          <span style="color: #81c784; font-weight: 600;">Subsidized by LBEF</span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Select Demo Payment Channel</label>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="eSewa" checked>
            <span style="font-weight: 600; font-size: 13px; color: #60bb46;">eSewa Wallet</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Khalti">
            <span style="font-weight: 600; font-size: 13px; color: #9c6ade;">Khalti Digital</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Bank Transfer">
            <span style="font-weight: 600; font-size: 13px; color: var(--pure-white);">Bank Transfer</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: var(--surface-high); border: 1px solid var(--court-border); border-radius: var(--radius-sm); cursor: pointer;">
            <input type="radio" name="payment_method" value="Cash Secretariat">
            <span style="font-weight: 600; font-size: 13px; color: var(--court-orange);">Cash at Campus</span>
          </label>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary" onclick="confirmDemoPayment('${teamData.id}', 'Pay Later at Venue')">Skip / Pay at Venue</button>
        <button type="button" class="btn btn-primary" onclick="confirmDemoPayment('${teamData.id}', 'Simulate Instant Payment')">Simulate Demo Payment</button>
      </div>
    `;
    openModal('modal-payment-demo');
  }
}

function confirmDemoPayment(regId) {
  const selectedMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'Cash';
  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const team = teams.find(t => t.id === regId);

  if (team) {
    team.feeStatus = `Paid (Demo - ${selectedMethod})`;
    localStorage.setItem('lbef_teams', JSON.stringify(teams));
  }

  closeModal('modal-payment-demo');
  showSuccessSummaryModal(team || { id: regId, name: 'Team', feeStatus: 'Paid' });
}

function showSuccessSummaryModal(team) {
  const content = document.getElementById('summary-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 56px; height: 56px; background: rgba(76, 175, 80, 0.2); color: #81c784; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <span class="material-symbols-outlined" style="font-size: 32px;">check_circle</span>
        </div>
        <span class="badge-tag badge-completed" style="margin-bottom: 6px;">Registration &amp; Email Confirmed</span>
        <h3 style="font-family: var(--font-display); font-size: 24px; color: var(--pure-white); text-transform: uppercase;">
          ${team.name}
        </h3>
        <p style="font-size: 13px; color: var(--secondary);">Registration Reference: <strong style="color: var(--court-orange);">${team.id}</strong></p>
      </div>

      <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); font-size: 13px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Captain:</span><span style="color: var(--pure-white); font-weight: 600;">${team.captain || 'Captain'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Faculty / Dept:</span><span style="color: var(--pure-white);">${team.faculty || 'Inter-Faculty'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Fee Status:</span><span style="color: #81c784; font-weight: 600;">${team.feeStatus || 'Verified Demo'}</span></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Venue:</span><span style="color: var(--pure-white);">LBEF Maitidevi Arena, Kathmandu</span></div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="downloadRegSlip('${team.id}')">
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--court-orange);">download</span>
          <span>Download Entry Slip</span>
        </button>
        <a href="dashboard.html" class="btn btn-primary btn-sm">
          <span>Go to Participant Dashboard</span>
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </a>
      </div>
    `;
    openModal('modal-reg-summary');
  }
}

// Download printable / plain text Registration Slip
function downloadRegSlip(regId) {
  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const team = teams.find(t => t.id === regId) || { id: regId, name: 'Team', captain: 'Captain', faculty: 'IT' };

  let text = `========================================================\n`;
  text += `   LORD BUDDHA EDUCATION FOUNDATION - HOOP FEST 2027   \n`;
  text += `        OFFICIAL TEAM REGISTRATION ENTRY SLIP          \n`;
  text += `========================================================\n\n`;
  text += `REGISTRATION REF: ${team.id}\n`;
  text += `TEAM NAME:        ${team.name}\n`;
  text += `CAPTAIN NAME:     ${team.captain}\n`;
  text += `STUDENT ID:       ${team.captainSid || 'N/A'}\n`;
  text += `FACULTY:          ${team.faculty}\n`;
  text += `CONTACT PHONE:    ${team.phone || 'N/A'}\n`;
  text += `CONTACT EMAIL:    ${team.email || 'N/A'}\n`;
  text += `PAYMENT STATUS:   ${team.feeStatus || 'Demonstration Mode'}\n`;
  text += `VENUE:            LBEF Sports Complex, Maitidevi, Kathmandu\n`;
  text += `TOURNAMENT DATES: October 25 - 30, 2027\n\n`;
  text += `ROSTER PLAYERS:\n`;
  if (team.players && team.players.length > 0) {
    team.players.forEach((p, idx) => {
      text += `  ${idx + 1}. ${p.name} (Jersey #${p.jersey}) - ID: ${p.sid}\n`;
    });
  } else {
    text += `  Roster registered under official faculty advisory list.\n`;
  }
  text += `\n========================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LBEF-HoopFest2027-${team.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Registration Slip downloaded!', 'success');
}

// Volunteer Registration Form Submission
async function handleVolunteerRegistration(e) {
  e.preventDefault();
  if (isVolunteerSubmitting) return;

  const form = e.target;
  const submitBtn = document.getElementById('vol-submit-btn');
  const defaultBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  if (window.FormValidator) {
    window.FormValidator.clearStatusBanner('vol-form-status');
    const valid = window.FormValidator.validateForm(form);
    if (!valid) {
      window.FormValidator.setStatusBanner(
        'vol-form-status',
        'error',
        'Please correct the highlighted fields above before submitting.'
      );
      showToast('Please fix the highlighted validation errors.', 'error');
      return;
    }
  }

  const name = document.getElementById('vol-name').value.trim();
  const sid = document.getElementById('vol-sid').value.trim();
  const email = document.getElementById('vol-email').value.trim();
  const phone = document.getElementById('vol-phone').value.trim();
  const role = document.getElementById('vol-role').value;
  const avail = document.getElementById('vol-availability').value;
  const exp = document.getElementById('vol-experience').value.trim();

  const volId = `LBEF-VOL-${Math.floor(100 + Math.random() * 900)}`;

  isVolunteerSubmitting = true;
  setSubmitButtonLoading(submitBtn, true, defaultBtnHTML, 'Submitting & Sending Email...');

  const emailResult = await sendTournamentEmails({
    formType: 'Volunteer Application',
    userName: name,
    userEmail: email,
    userPhone: phone,
    studentId: sid,
    registrationId: volId,
    subject: `Volunteer Application: ${name} (${role})`,
    message: exp || 'No prior experience specified.',
    detailsSummary: `Volunteer: ${name} (${sid})\nRole: ${role}\nAvailability: ${avail}\nPhone: ${phone}`
  });

  isVolunteerSubmitting = false;
  setSubmitButtonLoading(submitBtn, false, defaultBtnHTML);

  if (!emailResult.ok) {
    if (window.FormValidator) {
      window.FormValidator.setStatusBanner(
        'vol-form-status',
        'error',
        `<strong>Email Delivery Failed:</strong> ${emailResult.error}`
      );
    }
    showToast('Email delivery failed. Please check EmailJS configuration.', 'error');
    return;
  }

  const volunteers = JSON.parse(localStorage.getItem('lbef_volunteers') || '[]');
  volunteers.push({
    id: volId,
    name,
    studentId: sid,
    email,
    phone,
    role,
    availability: avail,
    experience: exp,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem('lbef_volunteers', JSON.stringify(volunteers));

  form.reset();
  if (window.FormValidator) {
    window.FormValidator.setStatusBanner(
      'vol-form-status',
      'success',
      `<strong>Application Submitted!</strong> Thank you, <strong>${name}</strong> (Ref: ${volId}). A confirmation email has been sent to <strong>${email}</strong>.`
    );
  }
  showToast(`Volunteer application sent! Ref: ${volId}`, 'success');
}

// Lookup Registration Records
function handleLookup(e) {
  e.preventDefault();
  const form = e.target;
  if (window.FormValidator && !window.FormValidator.validateForm(form)) {
    return;
  }

  const query = document.getElementById('lookup-query').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('lookup-results');

  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const match = teams.find(t =>
    (t.id && t.id.toLowerCase() === query) ||
    (t.captainSid && t.captainSid.toLowerCase() === query) ||
    (t.name && t.name.toLowerCase() === query)
  );

  if (!match) {
    resultsDiv.innerHTML = `
      <div style="padding: 16px; background: rgba(198, 40, 40, 0.15); border: 1px solid var(--institution-crimson); border-radius: var(--radius-sm); color: #ffb4ac; font-size: 13px;">
        No registration found matching "${query}". Please check your Student ID or Reference Number.
      </div>
    `;
    return;
  }

  resultsDiv.innerHTML = `
    <div style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 20px; border-radius: var(--radius-sm);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="badge-tag badge-completed">${match.feeStatus || 'Verified'}</span>
        <span style="font-weight: 700; color: var(--court-orange); font-size: 14px;">${match.id}</span>
      </div>
      <h4 style="font-family: var(--font-display); font-size: 20px; color: var(--pure-white); margin-bottom: 6px;">${match.name}</h4>
      <p style="font-size: 13px; color: var(--secondary); margin-bottom: 14px;">Captain: ${match.captain} &bull; ${match.faculty}</p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn btn-secondary btn-sm" onclick="downloadRegSlip('${match.id}')">Download Slip</button>
        <a href="dashboard.html" class="btn btn-primary btn-sm">Access Dashboard</a>
      </div>
    </div>
  `;
}

window.switchRegTab = switchRegTab;
window.addPlayerSlot = addPlayerSlot;
window.removePlayerSlot = removePlayerSlot;
window.handleTeamRegistration = handleTeamRegistration;
window.handleVolunteerRegistration = handleVolunteerRegistration;
window.handleLookup = handleLookup;
window.downloadRegSlip = downloadRegSlip;
window.confirmDemoPayment = confirmDemoPayment;
