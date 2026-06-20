// =====================================================
//  FrostByte — Room View (Frontend)
//  Prototype room browser
// =====================================================

// ── Hardcoded room data (prototype) ──────────────
const rooms = [
  {
    id:          1,
    name:        'Standard Room',
    imgClass:    'room-card-img--standard',
    description: 'A comfortable and well-appointed room ideal for solo travelers or couples. Includes a queen bed, work desk, and complimentary Wi-Fi.',
    capacity:    '2 guests',
    price:       '₱3,100 / night',
    status:      'available',
  },
  {
    id:          2,
    name:        'Deluxe Room',
    imgClass:    'room-card-img--deluxe',
    description: 'Extra space and a private balcony with a garden view. Includes a king bed, seating area, mini-bar, and premium toiletries.',
    capacity:    '3 guests',
    price:       '₱5,200 / night',
    status:      'available',
  },
  {
    id:          3,
    name:        'Garden Villa',
    imgClass:    'room-card-img--deluxe',
    description: 'A private villa surrounded by tropical gardens. Features a separate living room, outdoor shower, and direct garden access.',
    capacity:    '4 guests',
    price:       '₱6,800 / night',
    status:      'occupied',
  },
  {
    id:          4,
    name:        'Junior Suite',
    imgClass:    'room-card-img--suite',
    description: 'A spacious suite with a separate living area, kitchenette, and panoramic city views. Perfect for extended stays.',
    capacity:    '3 guests',
    price:       '₱7,200 / night',
    status:      'available',
  },
  {
    id:          5,
    name:        'Oceanfront Suite',
    imgClass:    'room-card-img--oceanfront',
    description: 'Our premium suite with unobstructed ocean views, a private terrace, jacuzzi, and dedicated butler service.',
    capacity:    '4 guests',
    price:       '₱8,500 / night',
    status:      'available',
  },
  {
    id:          6,
    name:        'Standard Twin',
    imgClass:    'room-card-img--standard',
    description: 'A standard room with two single beds. Great for friends or colleagues traveling together.',
    capacity:    '2 guests',
    price:       '₱3,100 / night',
    status:      'maintenance',
  },
];

// ── Status badge helper ────────────────────────────
function statusBadge(status) {
  const map = {
    available:   { label: 'Available',   cls: 'status-badge--available'   },
    occupied:    { label: 'Occupied',    cls: 'status-badge--occupied'    },
    maintenance: { label: 'Maintenance', cls: 'status-badge--maintenance' },
  };
  const s = map[status] || map['available'];
  return `<span class="status-badge ${s.cls}">${s.label}</span>`;
}

// ── Render room cards ──────────────────────────────
function renderRooms() {
  const grid = document.getElementById('roomsGrid');

  if (!grid) {
    console.error('roomsGrid element not found.');
    return;
  }

  grid.innerHTML = rooms.map(room => `
    <div class="room-card-item">
      <div class="room-card-img ${room.imgClass}">
        ${statusBadge(room.status)}
      </div>
      <div class="room-card-body">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <div class="room-card-meta">
          <span>${room.capacity}</span>
          <strong>${room.price}</strong>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Greeting from saved session ────────────────────
function loadGreeting() {
  const saved = localStorage.getItem('azurestay_user');
  if (saved) {
    const user = JSON.parse(saved);
    const greetingEl = document.getElementById('navGreeting');
    if (greetingEl) greetingEl.textContent = `Hello, ${user.firstName}`;
  }
}

// ── Logout ─────────────────────────────────────────
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('azurestay_user');
    window.location.href = '/';
  });
}

// ── Init ───────────────────────────────────────────
loadGreeting();
renderRooms();