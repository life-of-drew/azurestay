// =====================================================
//  FrostByte — Auth Routes
//  POST /api/register
//  POST /api/login
// =====================================================

const express = require('express');
const bcrypt  = require('bcrypt');
const db      = require('../config/db');
const router  = express.Router();

const SALT_ROUNDS = 10;

// ── POST /api/register ────────────────────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

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

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await db.query(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email.toLowerCase(), phone, passwordHash]
    );

    console.log(`[Email Simulation] Verification email sent to: ${email}`);

    return res.status(201).json({
      message: `Account created successfully. A verification email has been sent to ${email}.`,
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// ── POST /api/login ───────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      message: 'Login successful.',
      user: {
        id:        user.id,
        firstName: user.first_name,
        lastName:  user.last_name,
        email:     user.email,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;