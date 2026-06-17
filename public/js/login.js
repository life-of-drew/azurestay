// =====================================================
//  AzureStay — Login Form (Frontend)
// =====================================================

const form        = document.getElementById('loginForm');
const submitBtn   = document.getElementById('submitBtn');
const successAlert = document.getElementById('successAlert');
const successMsg  = document.getElementById('successMessage');
const errorAlert  = document.getElementById('errorAlert');
const errorMsg    = document.getElementById('errorMessage');

// ── Password visibility toggle ────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
}

// ── Field helpers ─────────────────────────────────
function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (input) input.classList.add('input--error');
  if (error) error.textContent = message;
}

function clearAllErrors() {
  ['email', 'password'].forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + 'Error');
    if (input) input.classList.remove('input--error');
    if (error) error.textContent = '';
  });
  successAlert.classList.add('hidden');
  errorAlert.classList.add('hidden');
}

// ── Client-side validation ─────────────────────────
function validateForm(data) {
  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email.trim()) {
    showFieldError('email', 'Email address is required.');
    valid = false;
  } else if (!emailRegex.test(data.email)) {
    showFieldError('email', 'Enter a valid email address.');
    valid = false;
  }

  if (!data.password) {
    showFieldError('password', 'Password is required.');
    valid = false;
  }

  return valid;
}

// ── Form submission ────────────────────────────────
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearAllErrors();

  const data = {
    email:    document.getElementById('email').value.trim().toLowerCase(),
    password: document.getElementById('password').value,
  };

  if (!validateForm(data)) return;

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Signing in...';

  try {
    const response = await fetch('/api/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // Save user info for dashboard greeting
      localStorage.setItem('azurestay_user', JSON.stringify(result.user));

      // Show success message then redirect
      successMsg.textContent = `Welcome back, ${result.user.firstName}! Redirecting to your dashboard...`;
      successAlert.classList.remove('hidden');

      setTimeout(() => {
        window.location.href = '/room-view';
      }, 2000);

    } else {
      errorMsg.textContent = result.message || 'Invalid email or password.';
      errorAlert.classList.remove('hidden');
    }

  } catch (err) {
    errorMsg.textContent = 'Unable to connect to the server. Please try again.';
    errorAlert.classList.remove('hidden');
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Sign in';
  }
});