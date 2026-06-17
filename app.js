// =====================================================
//  AzureStay — Express App Entry Point
//  Hotel Reservation System · Teaching Demo
// =====================================================

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ─────────────────────────────────────────

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Login page (placeholder — will be built in Step 4)
app.get('/login', (req, res) => {
  res.send('<h2>Login page — coming in Step 4</h2><a href="/">Back</a>');
});

// Register page (placeholder — will be built in Step 4)
app.get('/register', (req, res) => {
  res.send('<h2>Register page — coming in Step 4</h2><a href="/">Back</a>');
});

// ── Start Server ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`AzureStay running at http://localhost:${PORT}`);
});