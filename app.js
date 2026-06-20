// =====================================================
//  Frost Byte — Express App Entry Point
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

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/room-view', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'room-view.html'));
});

// ── API Routes ─────────────────────────────────────
app.use('/api', authRoutes);

// ── Start Server ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`Frost Byte running at http://localhost:${PORT}`);
});