// =====================================================
//  AzureStay — Room View (Frontend)
//  Updated on feature/HRS-5-room-images branch
//  Adds real photos to each room card
// =====================================================

// ── Hardcoded room data (prototype) ──────────────
// NOTE: imgUrl now points to a real photo instead of a CSS gradient class
const rooms = [
  {
    id:          1,
    name:        'Standard Room',
    imgUrl:      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80',
    description: 'A comfortable and well-appointed room ideal for solo travelers or couples. Includes a queen bed, work desk, and complimentary Wi-Fi.',
    capacity:    '2 guests',
    price:       '₱3,100 / night',
    status:      'available',
  },
  {
    id:          2,
    name:        'Deluxe Room',
    imgUrl:      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    description: 'Extra space and a private balcony with a garden view. Includes a king bed, seating area, mini-bar, and premium toiletries.',
    capacity:    '3 guests',
    price:       '₱5,200 / night',
    status:      'available',
  },
  {
    id:          3,
    name:        'Garden Villa',
    imgUrl:      'https://images.unsplash.com/photo-1721989518229-3e84837fc398?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A private villa surrounded by tropical gardens. Features a separate living room, outdoor shower, and direct garden access.',
    capacity:    '4 guests',
    price:       '₱6,800 / night',
    status:      'occupied',
  },
  {
    id:          4,
    name:        'Junior Suite',
    imgUrl:      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A spacious suite with a separate living area, kitchenette, and panoramic city views. Perfect for extended stays.',
    capacity:    '3 guests',
    price:       '₱7,200 / night',
    status:      'available',
  },
  {
    id:          5,
    name:        'Oceanfront Suite',
    imgUrl:      'https://images.unsplash.com/photo-1732817207697-77b636b2ff6d?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Our premium suite with unobstructed ocean views, a private terrace, jacuzzi, and dedicated butler service.',
    capacity:    '4 guests',
    price:       '₱8,500 / night',
    status:      'available',
  },
  {
    id:          6,
    name:        'Standard Twin',
    imgUrl:      'https://plus.unsplash.com/premium_photo-1682377520349-f56f47cb633f?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      <div class="room-card-img-wrapper">
        <img src="${room.imgUrl}" alt="${room.name}" class="room-card-photo" loading="lazy" />
        <div class="room-card-badge-overlay">${statusBadge(room.status)}</div>
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