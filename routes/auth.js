// =====================================================
//  AzureStay — Registration Route
//  routes/auth.js
// =====================================================

const express = require('express');
const bcrypt  = require('bcrypt');
const db      = require('../config/db');
const router  = express.Router();

const SALT_ROUNDS = 10;

// ── POST /api/register ────────────────────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // ── 1. Basic server-side validation ─────────────
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const pwRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!pwRegex.test(password)) {
    return res.status(400).json({
      field:   'password',
      message: 'Password must be at least 8 characters with one uppercase letter and one number.',
    });
  }

  try {
    // ── 2. Check for duplicate email ────────────────
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        field:   'email',
        message: 'An account with this email already exists.',
      });
    }

    // ── 3. Hash the password ─────────────────────────
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // ── 4. Insert new user into the database ─────────
    await db.query(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email.toLowerCase(), phone, passwordHash]
    );

    // ── 5. Simulate sending a verification email ─────
    //    In a real app, you would call an email service here
    //    e.g. sendVerificationEmail(email, firstName)
    console.log(`[Email Simulation] Verification email sent to: ${email}`);

    // ── 6. Respond with success ───────────────────────
    return res.status(201).json({
      message: `Account created successfully. A verification email has been sent to ${email}.`,
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;