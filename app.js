// =====================================================
//  AzureStay — Express App Entry Point
//  Hotel Reservation System · Teaching Demo
// =====================================================

const express    = require('express');
const path       = require('path');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Page Routes ────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Login page (placeholder — built in next step)
app.get('/login', (req, res) => {
  res.send('<h2>Login page — coming next</h2><a href="/">Back</a>');
});

// ── API Routes ─────────────────────────────────────
app.use('/api', authRoutes);

// ── Start Server ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`AzureStay running at http://localhost:${PORT}`);
});