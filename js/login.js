/**
 * LBEF HOOP FEST 2027 - Demo Participant Login Module
 */

function togglePassVisibility() {
  const field = document.getElementById('login-password');
  if (field) {
    field.type = field.type === 'password' ? 'text' : 'password';
  }
}

function quickFill(role) {
  const idInput = document.getElementById('login-id');
  const passInput = document.getElementById('login-password');
  if (!idInput || !passInput) return;

  if (role === 'captain') {
    idInput.value = 'NP01CP4S24001';
    passInput.value = 'varsity2027';
    showToast('Filled Cyber Warriors Captain credentials', 'info');
  } else if (role === 'volunteer') {
    idInput.value = 'NP01CP4S24099';
    passInput.value = 'volunteer2027';
    showToast('Filled Courtside Volunteer credentials', 'info');
  }

  if (window.FormValidator) {
    window.FormValidator.clearFieldError(idInput);
    window.FormValidator.clearFieldError(passInput);
  }
}

function handleDemoLogin(e) {
  e.preventDefault();
  if (window.FormValidator) {
    window.FormValidator.clearStatusBanner('login-form-status');
    if (!window.FormValidator.validateForm(e.target)) {
      window.FormValidator.setStatusBanner(
        'login-form-status',
        'error',
        'Please provide both your Student ID / Email and Demo Password.'
      );
      showToast('Please enter required login credentials.', 'error');
      return;
    }
  }

  const loginId = document.getElementById('login-id').value.trim();

  const teams = JSON.parse(localStorage.getItem('lbef_teams') || '[]');
  const matchedTeam = teams.find(t =>
    (t.captainSid && t.captainSid.toLowerCase() === loginId.toLowerCase()) ||
    (t.email && t.email.toLowerCase() === loginId.toLowerCase())
  ) || (teams.length > 0 ? teams[0] : { id: 'LBEF-HF27-7821', name: 'Cyber Warriors', captain: 'Aayush Shrestha' });

  const userSession = {
    name: matchedTeam.captain || 'Student Athlete',
    role: 'Captain',
    studentId: loginId,
    teamId: matchedTeam.id,
    teamName: matchedTeam.name
  };

  localStorage.setItem('lbef_current_user', JSON.stringify(userSession));
  showToast(`Welcome back, ${userSession.name}!`, 'success');

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 800);
}

window.togglePassVisibility = togglePassVisibility;
window.quickFill = quickFill;
window.handleDemoLogin = handleDemoLogin;
