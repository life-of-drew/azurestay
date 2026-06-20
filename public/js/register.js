// =====================================================
//  FrostByte — Registration Form (Frontend)
//  Handles: validation, submission, UI feedback
// =====================================================

// ── DOM References ────────────────────────────────
const form          = document.getElementById('registerForm');
const submitBtn     = document.getElementById('submitBtn');
const successAlert  = document.getElementById('successAlert');
const successMsg    = document.getElementById('successMessage');
const errorAlert    = document.getElementById('errorAlert');
const errorMsg      = document.getElementById('errorMessage');
const strengthFill  = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');

// ── Phone number — numbers only, max 11 digits ────
document.getElementById('phone').addEventListener('keypress', function (e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

document.getElementById('phone').addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

// ── Password visibility toggle ────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
}

// ── Password strength checker ─────────────────────
document.getElementById('password').addEventListener('input', function () {
  const val = this.value;

  const hasLength  = val.length >= 8;
  const hasUpper   = /[A-Z]/.test(val);
  const hasNumber  = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);

  const meetsRequirements = hasLength && hasUpper && hasNumber;

  let level;
  if (val.length === 0) {
    level = { w: '0%',   bg: 'transparent', label: 'Enter a password' };
  } else if (!hasLength) {
    level = { w: '25%',  bg: '#e53e3e',     label: 'Too short — minimum 8 characters' };
  } else if (!hasUpper && !hasNumber) {
    level = { w: '25%',  bg: '#e53e3e',     label: 'Add an uppercase letter and a number' };
  } else if (!hasUpper) {
    level = { w: '40%',  bg: '#dd8a0a',     label: 'Add at least one uppercase letter' };
  } else if (!hasNumber) {
    level = { w: '40%',  bg: '#dd8a0a',     label: 'Add at least one number' };
  } else if (meetsRequirements && !hasSpecial) {
    level = { w: '75%',  bg: '#38a169',     label: 'Good — meets all requirements' };
  } else if (meetsRequirements && hasSpecial) {
    level = { w: '100%', bg: '#2C6E91',     label: 'Strong' };
  }

  strengthFill.style.width      = level.w;
  strengthFill.style.background = level.bg;
  strengthLabel.textContent     = level.label;
});

// ── Field-level validation helpers ───────────────
function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (input) input.classList.add('input--error');
  if (error) error.textContent = message;
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (input) input.classList.remove('input--error');
  if (error) error.textContent = '';
}

function clearAllErrors() {
  ['firstName', 'lastName', 'email', 'phone', 'password'].forEach(clearFieldError);
  successAlert.classList.add('hidden');
  errorAlert.classList.add('hidden');
}

// ── Client-side validation ────────────────────────
function validateForm(data) {
  let valid = true;

  if (!data.firstName.trim()) {
    showFieldError('firstName', 'First name is required.');
    valid = false;
  }

  if (!data.lastName.trim()) {
    showFieldError('lastName', 'Last name is required.');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    showFieldError('email', 'Email address is required.');
    valid = false;
  } else if (!emailRegex.test(data.email)) {
    showFieldError('email', 'Enter a valid email address.');
    valid = false;
  }

  const phoneRegex = /^09\d{9}$/;
  if (!data.phone.trim()) {
    showFieldError('phone', 'Phone number is required.');
    valid = false;
  } else if (!phoneRegex.test(data.phone)) {
    showFieldError('phone', 'Enter a valid 11-digit PH number starting with 09.');
    valid = false;
  }

  const hasLength  = data.password.length >= 8;
  const hasUpper   = /[A-Z]/.test(data.password);
  const hasNumber  = /[0-9]/.test(data.password);

  if (!data.password) {
    showFieldError('password', 'Password is required.');
    valid = false;
  } else if (!hasLength && !hasUpper && !hasNumber) {
    showFieldError('password', 'Password must be at least 8 characters, include one uppercase letter and one number.');
    valid = false;
  } else if (!hasLength) {
    showFieldError('password', 'Password is too short — minimum 8 characters required.');
    valid = false;
  } else if (!hasUpper && !hasNumber) {
    showFieldError('password', 'Password must include at least one uppercase letter and one number.');
    valid = false;
  } else if (!hasUpper) {
    showFieldError('password', 'Password must include at least one uppercase letter (e.g. A, B, C).');
    valid = false;
  } else if (!hasNumber) {
    showFieldError('password', 'Password must include at least one number (e.g. 1, 2, 3).');
    valid = false;
  }

  return valid;
}

// ── Form submission ────────────────────────────────
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearAllErrors();

  const data = {
    firstName: document.getElementById('firstName').value,
    lastName:  document.getElementById('lastName').value,
    email:     document.getElementById('email').value.trim().toLowerCase(),
    phone:     document.getElementById('phone').value,
    password:  document.getElementById('password').value,
  };

  // Run client-side validation first
  if (!validateForm(data)) return;

  // Disable button while submitting
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Creating account...';

  try {
    const response = await fetch('/api/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // Show success notification
      successMsg.textContent = `Account created! A verification email has been sent to ${data.email}.`;
      successAlert.classList.remove('hidden');
      form.reset();
      strengthFill.style.width  = '0%';
      strengthLabel.textContent = 'Enter a password';

      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);

    } else {
      // Show server-side error (e.g. duplicate email)
      if (result.field) {
        showFieldError(result.field, result.message);
      } else {
        errorMsg.textContent = result.message || 'Something went wrong. Please try again.';
        errorAlert.classList.remove('hidden');
      }
    }

  } catch (err) {
    errorMsg.textContent = 'Unable to connect to the server. Please try again.';
    errorAlert.classList.remove('hidden');
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Create account';
  }
});