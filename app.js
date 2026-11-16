/**
 * ==============================================================================
 * CINEMA TICKET BOOKING SYSTEM - AVAILABILITY MODULE & PBL ENGINE
 * Inspired by DBMS_OS_PBL (C++17, MySQL, POSIX Threads, Process Forking, Signals)
 * ==============================================================================
 */

// --- Initial Seed State (Matching schema.sql and Main.cpp) ---
const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    language: "English",
    duration_mins: 169,
    genre: "Sci-Fi / Adventure",
    rating: "8.7",
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
  },
  {
    id: 2,
    title: "Swapped",
    language: "English",
    duration_mins: 120,
    genre: "Psychological Thriller",
    rating: "8.2",
    director: "Ayush Rawat",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Two strangers with polar opposite lives undergo an experimental neural transference, only to discover a conspiracy that threatens to erase their true identities forever."
  },
  {
    id: 3,
    title: "Inception",
    language: "English",
    duration_mins: 148,
    genre: "Sci-Fi / Action",
    rating: "8.8",
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 4,
    title: "Oppenheimer",
    language: "English",
    duration_mins: 180,
    genre: "Biography / Drama",
    rating: "8.9",
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=1200&auto=format&fit=crop",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II."
  },
  {
    id: 5,
    title: "Dune: Part Two",
    language: "English",
    duration_mins: 166,
    genre: "Sci-Fi / Epic",
    rating: "8.6",
    director: "Denis Villeneuve",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
  }
];

const INITIAL_SCREENS = [
  {
    screen_id: 1,
    screen_number: 1,
    silver_count: 5,
    gold_count: 5,
    platinum_count: 5,
    total_seats: 15,
    seats: [
      { id: 1, seat_number: 1, type: "Silver" },
      { id: 2, seat_number: 2, type: "Silver" },
      { id: 3, seat_number: 3, type: "Silver" },
      { id: 4, seat_number: 4, type: "Silver" },
      { id: 5, seat_number: 5, type: "Silver" },
      { id: 6, seat_number: 6, type: "Gold" },
      { id: 7, seat_number: 7, type: "Gold" },
      { id: 8, seat_number: 8, type: "Gold" },
      { id: 9, seat_number: 9, type: "Gold" },
      { id: 10, seat_number: 10, type: "Gold" },
      { id: 11, seat_number: 11, type: "Platinum" },
      { id: 12, seat_number: 12, type: "Platinum" },
      { id: 13, seat_number: 13, type: "Platinum" },
      { id: 14, seat_number: 14, type: "Platinum" },
      { id: 15, seat_number: 15, type: "Platinum" }
    ]
  },
  {
    screen_id: 2,
    screen_number: 2,
    silver_count: 6,
    gold_count: 6,
    platinum_count: 6,
    total_seats: 18,
    seats: [
      { id: 16, seat_number: 1, type: "Silver" },
      { id: 17, seat_number: 2, type: "Silver" },
      { id: 18, seat_number: 3, type: "Silver" },
      { id: 19, seat_number: 4, type: "Silver" },
      { id: 20, seat_number: 5, type: "Silver" },
      { id: 21, seat_number: 6, type: "Silver" },
      { id: 22, seat_number: 7, type: "Gold" },
      { id: 23, seat_number: 8, type: "Gold" },
      { id: 24, seat_number: 9, type: "Gold" },
      { id: 25, seat_number: 10, type: "Gold" },
      { id: 26, seat_number: 11, type: "Gold" },
      { id: 27, seat_number: 12, type: "Gold" },
      { id: 28, seat_number: 13, type: "Platinum" },
      { id: 29, seat_number: 14, type: "Platinum" },
      { id: 30, seat_number: 15, type: "Platinum" },
      { id: 31, seat_number: 16, type: "Platinum" },
      { id: 32, seat_number: 17, type: "Platinum" },
      { id: 33, seat_number: 18, type: "Platinum" }
    ]
  }
];

const INITIAL_SHOWS = [
  { show_id: 1, movie_id: 1, screen_id: 1, start_time: 9, end_time: 12, label: "09:00 AM - 12:00 PM" },
  { show_id: 2, movie_id: 2, screen_id: 2, start_time: 10, end_time: 12, label: "10:00 AM - 12:00 PM" },
  { show_id: 3, movie_id: 3, screen_id: 1, start_time: 14, end_time: 17, label: "02:00 PM - 05:00 PM" },
  { show_id: 4, movie_id: 2, screen_id: 2, start_time: 13, end_time: 15, label: "01:00 PM - 03:00 PM" },
  { show_id: 5, movie_id: 4, screen_id: 1, start_time: 18, end_time: 21, label: "06:00 PM - 09:00 PM" },
  { show_id: 6, movie_id: 5, screen_id: 2, start_time: 16, end_time: 19, label: "04:00 PM - 07:00 PM" }
];

const SEAT_PRICING = {
  Silver: 200,
  Gold: 300,
  Platinum: 400
};

// --- App State Store with LocalStorage Persistence ---
class Store {
  constructor() {
    this.STORAGE_KEY = "cinema_booking_pbl_state_v2";
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.movies = data.movies || INITIAL_MOVIES;
        this.screens = data.screens || INITIAL_SCREENS;
        this.shows = data.shows || INITIAL_SHOWS;
        this.customers = data.customers || [
          { cust_id: 1, name: "Ayush Rawat", phone_no: 9876543210 }
        ];
        this.currentCustomer = data.currentCustomer || this.customers[0];
        this.bookings = data.bookings || [];
        this.showSeats = data.showSeats || this.generateDefaultShowSeats();
        this.logs = data.logs || [];
        this.sqlQueries = data.sqlQueries || [];
        return;
      } catch (e) {
        console.error("Failed to parse saved state, resetting:", e);
      }
    }

    // Default Fresh State
    this.movies = INITIAL_MOVIES;
    this.screens = INITIAL_SCREENS;
    this.shows = INITIAL_SHOWS;
    this.customers = [
      { cust_id: 1, name: "Ayush Rawat", phone_no: 9876543210 }
    ];
    this.currentCustomer = this.customers[0];
    this.bookings = [];
    this.showSeats = this.generateDefaultShowSeats();
    this.logs = [];
    this.sqlQueries = [];
    this.saveState();
  }

  generateDefaultShowSeats() {
    // Generates show_seats table mapping for all shows
    const map = {};
    for (const show of INITIAL_SHOWS) {
      const screen = INITIAL_SCREENS.find(s => s.screen_id === show.screen_id);
      map[show.show_id] = screen.seats.map(seat => ({
        seat_id: seat.id,
        seat_number: seat.seat_number,
        seat_type: seat.type,
        status: "available" // 'available' or 'booked'
      }));
    }
    // Seed some initial bookings for realism if show 1 has seat 3, 7 booked
    if (map[1]) {
      map[1][2].status = "booked"; // seat 3
      map[1][6].status = "booked"; // seat 7
    }
    return map;
  }

  saveState() {
    const data = {
      movies: this.movies,
      screens: this.screens,
      shows: this.shows,
      customers: this.customers,
      currentCustomer: this.currentCustomer,
      bookings: this.bookings,
      showSeats: this.showSeats,
      logs: this.logs.slice(-200), // keep latest 200 logs
      sqlQueries: this.sqlQueries.slice(-100)
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  resetAllData() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loadState();
    window.location.reload();
  }
}

const store = new Store();

// --- OS Mutex Simulation Class ---
class MutexLock {
  constructor() {
    this.isLocked = false;
    this.owner = null;
    this.queue = [];
  }

  async acquire(requesterName = "Main Thread") {
    if (!this.isLocked) {
      this.isLocked = true;
      this.owner = requesterName;
      Logger.log("LOCK", `std::mutex seatMutex acquired by [${requesterName}]`);
      updateMutexUI(true, requesterName);
      return true;
    } else {
      Logger.log("WARN", `[${requesterName}] blocked! seatMutex is held by [${this.owner}]`);
      return new Promise((resolve) => {
        this.queue.push({ requesterName, resolve });
      });
    }
  }

  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      this.owner = next.requesterName;
      Logger.log("LOCK", `seatMutex passed to waiting thread [${next.requesterName}]`);
      updateMutexUI(true, next.requesterName);
      next.resolve(true);
    } else {
      this.isLocked = false;
      const prevOwner = this.owner;
      this.owner = null;
      Logger.log("LOCK", `seatMutex released by [${prevOwner}]. Lock is now FREE.`);
      updateMutexUI(false, null);
    }
  }
}

const seatMutex = new MutexLock();

// --- Logger (Mirrors Logger.cpp) ---
const Logger = {
  log(level, message) {
    const now = new Date();
    const ts = now.toISOString().replace("T", " ").substring(0, 19);
    const entry = { ts, level, message };
    store.logs.push(entry);
    store.saveState();
    renderLiveLogs();
  },
  flush() {
    Logger.log("SYSTEM", "Logger flushed to disk buffer.");
  }
};

// --- SQL Console Tracker (Mirrors DB Operations) ---
const SQLTracker = {
  record(sql, context = "DML Execution") {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const entry = { time, sql, context };
    store.sqlQueries.unshift(entry);
    store.saveState();
    renderLiveSQL();
  }
};

// --- API Configuration & XAMPP MySQL Sync State ---
const API_BASE = (window.location.protocol.startsWith('http') && (window.location.port === '3000' || window.location.port === '80'))
  ? window.location.origin
  : 'http://localhost:3000';
let isBackendLive = false;

// --- Active UI Selection State ---
let selectedMovie = store.movies[0];
let selectedShow = store.shows.find(s => s.movie_id === selectedMovie.id) || store.shows[0];
let selectedSeatNumbers = new Set();
let activeFilterTier = "ALL";
let currentTab = "availability"; // 'movies', 'availability', 'tickets', 'inspector'

// --- DOM References ---
const dom = {
  movieListContainer: document.getElementById("movieListContainer"),
  selectedMovieHero: document.getElementById("selectedMovieHero"),
  showChipsContainer: document.getElementById("showChipsContainer"),
  screenTitle: document.getElementById("screenTitle"),
  screenBadge: document.getElementById("screenBadge"),
  seatsGrid: document.getElementById("seatsGrid"),
  selectedSeatsList: document.getElementById("selectedSeatsList"),
  priceBreakdown: document.getElementById("priceBreakdown"),
  totalPriceAmount: document.getElementById("totalPriceAmount"),
  bookBtn: document.getElementById("bookBtn"),
  availableCount: document.getElementById("availableCount"),
  bookedCount: document.getElementById("bookedCount"),
  selectedCount: document.getElementById("selectedCount"),
  userBadge: document.getElementById("userBadge"),
  userModal: document.getElementById("userModal"),
  checkoutModal: document.getElementById("checkoutModal"),
  ticketModal: document.getElementById("ticketModal"),
  inspectorDrawer: document.getElementById("inspectorDrawer"),
  terminalLogs: document.getElementById("terminalLogs"),
  sqlConsole: document.getElementById("sqlConsole"),
  mutexStatusIndicator: document.getElementById("mutexStatusIndicator"),
  ticketsContainer: document.getElementById("ticketsContainer")
};

// =============================================================================
// XAMPP MYSQL CONNECTION & LIVE SYNCHRONIZATION
// =============================================================================
function updateDbStatusUI(connected, info = null) {
  const badge = document.getElementById("mysqlStatusBadge");
  const dot = document.getElementById("mysqlDot");
  const text = document.getElementById("mysqlStatusText");
  const banner = document.getElementById("connectionAlertBanner");

  if (connected) {
    if (badge) badge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
    if (text) {
      text.className = "text-emerald-300 font-mono font-bold text-xs";
      text.innerText = "XAMPP MYSQL: SYNCED";
    }
    if (banner) banner.classList.add("hidden");
  } else {
    if (badge) badge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-amber-400";
    if (text) {
      text.className = "text-amber-300 font-mono font-bold text-xs";
      text.innerText = "BROWSER OFFLINE MODE";
    }
    if (banner) banner.classList.remove("hidden");
  }
  setupLucideIcons();
}

async function checkBackendConnection() {
  try {
    const res = await fetch(`${API_BASE}/api/status`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.mysql_connected) {
        if (!isBackendLive) {
          isBackendLive = true;
          updateDbStatusUI(true, data);
          Logger.log("SYSTEM", `Connected directly to XAMPP MySQL (${data.host}, DB: ${data.database}). Live sync active!`);
          await syncDataFromMySQL();
        }
        return true;
      }
    }
  } catch (e) {
    // Backend server not currently listening on port 3000
  }
  if (isBackendLive) {
    Logger.log("WARN", "Lost connection to XAMPP MySQL backend. Switched to offline browser mode.");
  }
  isBackendLive = false;
  updateDbStatusUI(false);
  return false;
}

async function manualReconnect() {
  const btn = document.getElementById("reconnectBtn");
  const text = document.getElementById("mysqlStatusText");
  if (btn) btn.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Checking...`;
  if (text) text.innerText = "CONNECTING...";
  setupLucideIcons();

  try {
    await fetch(`${API_BASE}/api/reconnect`, { cache: 'no-store' });
  } catch (e) {}

  const connected = await checkBackendConnection();
  if (btn) btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Reconnect Now`;
  setupLucideIcons();

  if (connected) {
    alert("✅ Connected directly to XAMPP MySQL!\nLive two-way database sync is active.");
  } else {
    alert("⚠️ Could not connect to MySQL.\n\nPlease check:\n1. Is MySQL started (green) in XAMPP Control Panel?\n2. Did you launch start.bat (or run 'node server.js')?\n3. Are you visiting http://localhost:3000 in your browser (not file:///)?");
  }
}

// Background poll: Every 3 seconds, if offline, automatically try connecting to MySQL
setInterval(async () => {
  if (!isBackendLive) {
    await checkBackendConnection();
  }
}, 3000);

async function syncDataFromMySQL() {
  if (!isBackendLive) return;
  try {
    const res = await fetch(`${API_BASE}/api/database/dump`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !data.tables) return;

    const { movies, shows, show_seats, customers, bookings } = data.tables;

    // 1. Sync movies
    if (movies && movies.length > 0) {
      store.movies = movies.map(m => {
        const existing = store.movies.find(em => em.id === m.movie_id || em.title === m.title);
        return {
          id: m.movie_id,
          title: m.title,
          language: m.language || 'English',
          duration_mins: m.duration_mins,
          genre: existing ? existing.genre : 'Cinema Blockbuster',
          rating: existing ? existing.rating : '8.4',
          director: existing ? existing.director : 'Director',
          poster: existing ? existing.poster : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
          backdrop: existing ? existing.backdrop : 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
          synopsis: existing ? existing.synopsis : `${m.title} playing in auditoriums.`
        };
      });
    }

    // 2. Sync shows
    if (shows && shows.length > 0) {
      store.shows = shows.map(s => ({
        show_id: s.show_id,
        movie_id: s.movie_id,
        screen_id: s.screen_id,
        start_time: s.start_time,
        end_time: s.end_time,
        label: `${s.start_time < 10 ? '0' + s.start_time : s.start_time}:00 - ${s.end_time < 10 ? '0' + s.end_time : s.end_time}:00`
      }));
    }

    // 3. Sync show_seats
    if (show_seats && show_seats.length > 0) {
      const map = {};
      show_seats.forEach(ss => {
        if (!map[ss.show_id]) map[ss.show_id] = [];
        map[ss.show_id].push({
          seat_id: ss.seat_id,
          seat_number: ss.seat_number,
          seat_type: ss.seat_type,
          status: ss.status
        });
      });
      store.showSeats = map;
    }

    // 4. Sync customers
    if (customers && customers.length > 0) {
      store.customers = customers;
      if (!store.currentCustomer || !store.customers.find(c => c.cust_id === store.currentCustomer.cust_id)) {
        store.currentCustomer = store.customers[0];
      }
    }

    // 5. Sync bookings
    if (bookings) {
      const bRes = await fetch(`${API_BASE}/api/bookings`, { cache: 'no-store' });
      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData.bookings) {
          store.bookings = bData.bookings;
        }
      }
    }

    store.saveState();
    renderMoviesTab();
    if (selectedMovie) {
      const found = store.movies.find(m => m.id === selectedMovie.id);
      if (found) selectMovie(found.id, false);
      else if (store.movies.length > 0) selectMovie(store.movies[0].id, false);
    }
    renderTicketsTab();
    renderSeatingLayout();
    updateAvailabilityStats();
  } catch (err) {
    console.error("syncDataFromMySQL error:", err);
  }
}

// =============================================================================
// INITIALIZATION & STARTUP (OS Multithreading Simulation)
// =============================================================================
async function initApp() {
  // Simulate OS Concept: std::async concurrent loading
  Logger.log("SYSTEM", "Cinema Ticket Booking System initialized.");
  Logger.log("INFO", `Checking XAMPP MySQL backend connection on ${API_BASE}...`);
  SQLTracker.record("SELECT movie_id, title, language, duration_mins FROM movies ORDER BY movie_id;", "Thread 1: async(loadMoviesFromDB)");
  SQLTracker.record("SELECT s.show_id, s.start_time, sc.screen_number, m.title FROM shows s JOIN movies m ON s.movie_id = m.movie_id JOIN screens sc ON s.screen_id = sc.screen_id ORDER BY s.show_id;", "Thread 2: async(loadShowDataFromDB)");

  setupLucideIcons();
  updateUserBadge();
  renderMoviesTab();
  selectMovie(selectedMovie.id, false);
  renderLiveLogs();
  renderLiveSQL();
  renderTicketsTab();
  updateAvailabilityStats();

  // Connect to live XAMPP MySQL backend
  await checkBackendConnection();
}

function setupLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// =============================================================================
// NAVIGATION & TABS
// =============================================================================
function switchTab(tabId) {
  currentTab = tabId;
  const tabs = ["movies", "availability", "tickets", "inspector"];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn-${t}`);
    const section = document.getElementById(`section-${t}`);
    if (btn && section) {
      if (t === tabId) {
        btn.classList.add("text-amber-400", "border-b-2", "border-amber-400", "bg-white/5");
        btn.classList.remove("text-slate-400");
        section.classList.remove("hidden");
      } else {
        btn.classList.remove("text-amber-400", "border-b-2", "border-amber-400", "bg-white/5");
        btn.classList.add("text-slate-400");
        section.classList.add("hidden");
      }
    }
  });

  if (tabId === "tickets") {
    renderTicketsTab();
  }
  if (tabId === "availability") {
    renderSeatingLayout();
  }
  setupLucideIcons();
}

// =============================================================================
// MOVIES & SHOWS
// =============================================================================
function renderMoviesTab() {
  const container = document.getElementById("moviesGrid");
  if (!container) return;

  container.innerHTML = store.movies.map(movie => {
    const movieShows = store.shows.filter(s => s.movie_id === movie.id);
    return `
      <div class="glass-panel rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col relative">
        <div class="relative h-64 overflow-hidden">
          <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div class="absolute top-3 right-3 flex items-center gap-1.5">
            <div class="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${movie.rating}
            </div>
            ${store.movies.length > 1 ? `
              <button onclick="deleteMovie(${movie.id})" title="Remove Movie" class="w-7 h-7 rounded-full bg-black/70 hover:bg-rose-500/80 backdrop-blur-md text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>

          <div class="absolute bottom-3 left-4 right-4">
            <span class="text-xs uppercase tracking-wider font-semibold text-amber-400">${movie.genre}</span>
            <h3 class="text-xl font-bold font-cinematic text-white drop-shadow">${movie.title}</h3>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${movie.duration_mins} mins</span>
              <span>•</span>
              <span class="flex items-center gap-1"><i data-lucide="globe" class="w-3.5 h-3.5"></i> ${movie.language}</span>
              <span>•</span>
              <span>Dir. ${movie.director}</span>
            </div>
            <p class="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">${movie.synopsis}</p>
          </div>

          <div>
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Showtimes:</div>
            <div class="flex flex-wrap gap-2 mb-4">
              ${movieShows.map(s => `
                <button onclick="selectMovieAndShow(${movie.id}, ${s.show_id})" class="px-2.5 py-1 rounded-lg text-xs font-mono border ${s.show_id === selectedShow?.show_id ? 'bg-amber-500/20 text-amber-300 border-amber-500/60' : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-amber-400/40'} transition-all">
                  Screen ${s.screen_id} • ${s.start_time}:00
                </button>
              `).join('')}
              ${movieShows.length === 0 ? '<span class="text-xs text-slate-500 italic">No scheduled shows</span>' : ''}
            </div>

            <button onclick="selectMovieAndShow(${movie.id}, ${movieShows[0]?.show_id || null})" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
              <i data-lucide="armchair" class="w-4 h-4"></i> View Availability & Book
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Add Movie Modal & Handlers ---
function openAddMovieModal() {
  const modal = document.getElementById("addMovieModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setupLucideIcons();
}

function closeAddMovieModal() {
  const modal = document.getElementById("addMovieModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function setPresetMovie(title, lang, duration, genre, rating, director, poster, synopsis) {
  document.getElementById("addMovieTitle").value = title;
  document.getElementById("addMovieLang").value = lang;
  document.getElementById("addMovieDuration").value = duration;
  document.getElementById("addMovieGenre").value = genre;
  document.getElementById("addMovieRating").value = rating;
  document.getElementById("addMovieDirector").value = director;
  document.getElementById("addMoviePoster").value = poster;
  document.getElementById("addMovieSynopsis").value = synopsis;
}

async function handleAddMovie(e) {
  if (e) e.preventDefault();

  const title = document.getElementById("addMovieTitle").value.trim();
  const director = document.getElementById("addMovieDirector").value.trim();
  const lang = document.getElementById("addMovieLang").value.trim() || "English";
  const duration = parseInt(document.getElementById("addMovieDuration").value, 10) || 120;
  const rating = document.getElementById("addMovieRating").value.trim() || "8.0";
  const genre = document.getElementById("addMovieGenre").value.trim() || "Cinema";
  const poster = document.getElementById("addMoviePoster").value.trim() || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop";
  const synopsis = document.getElementById("addMovieSynopsis").value.trim() || `${title} directed by ${director}.`;
  
  const screenId = parseInt(document.getElementById("addMovieScreen").value, 10) || 1;
  const startHour = parseInt(document.getElementById("addMovieStartHour").value, 10) || 11;
  const endHour = startHour + Math.ceil(duration / 60);

  // If connected to XAMPP MySQL backend, execute real database insert!
  if (isBackendLive) {
    try {
      const response = await fetch(`${API_BASE}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          language: lang,
          duration_mins: duration,
          screen_id: screenId,
          start_time: startHour
        })
      });

      if (response.ok) {
        const result = await response.json();
        Logger.log("BOOKING", `[MYSQL COMMITTED] Movie "${title}" inserted into XAMPP MySQL (MovieID: ${result.movie_id})!`);
        SQLTracker.record(
          `INSERT INTO movies (title, language, duration_mins) VALUES ('${title.replace(/'/g, "''")}', '${lang}', ${duration});`,
          "XAMPP MySQL Live Insert"
        );
        SQLTracker.record(
          `INSERT INTO shows (movie_id, screen_id, start_time, end_time) VALUES (${result.movie_id}, ${screenId}, ${startHour}, ${endHour});`,
          "XAMPP MySQL Live Show Schedule"
        );

        // Sync fresh data from MySQL
        await syncDataFromMySQL();
        closeAddMovieModal();
        selectMovie(result.movie_id, true);
        if (result.show_id) selectShow(result.show_id);
        switchTab("availability");

        alert(`✅ Movie "${title}" inserted directly into XAMPP MySQL!\n\nOpen phpMyAdmin (http://localhost/phpmyadmin) and view table 'cinema_booking.movies' to see your new record!`);
        return;
      }
    } catch (apiErr) {
      console.warn("Backend API insert failed, falling back to local state:", apiErr);
    }
  }

  // Fallback: Local Storage state insertion
  const newMovieId = store.movies.length > 0 ? Math.max(...store.movies.map(m => m.id)) + 1 : 1;
  const newMovie = {
    id: newMovieId,
    title,
    language: lang,
    duration_mins: duration,
    genre,
    rating,
    director,
    poster,
    backdrop: poster,
    synopsis
  };
  store.movies.push(newMovie);

  const newShowId = store.shows.length > 0 ? Math.max(...store.shows.map(s => s.show_id)) + 1 : 1;
  const newShow = {
    show_id: newShowId,
    movie_id: newMovieId,
    screen_id: screenId,
    start_time: startHour,
    end_time: endHour,
    label: `${startHour < 10 ? '0' + startHour : startHour}:00 - ${endHour < 10 ? '0' + endHour : endHour}:00`
  };
  store.shows.push(newShow);

  const screen = store.screens.find(s => s.screen_id === screenId) || store.screens[0];
  store.showSeats[newShowId] = screen.seats.map(seat => ({
    seat_id: seat.id,
    seat_number: seat.seat_number,
    seat_type: seat.type,
    status: "available"
  }));

  SQLTracker.record(
    `INSERT INTO movies (movie_id, title, language, duration_mins) VALUES (${newMovieId}, '${title.replace(/'/g, "''")}', '${lang}', ${duration});`,
    "DML: Add New Movie Entity (Offline)"
  );

  Logger.log("SYSTEM", `New movie registered: "${title}" (MovieID: ${newMovieId}) | Show scheduled: ID ${newShowId}`);

  store.saveState();
  closeAddMovieModal();
  renderMoviesTab();
  selectMovie(newMovieId, true);
  selectShow(newShowId);
  switchTab("availability");

  alert(`Movie "${title}" added in browser storage mode.\n(To sync with XAMPP MySQL, start server with start.bat)`);
}

async function deleteMovie(movieId) {
  const movie = store.movies.find(m => m.id === movieId);
  if (!movie) return;

  if (!confirm(`Are you sure you want to remove "${movie.title}" and its scheduled shows?`)) {
    return;
  }

  if (isBackendLive) {
    try {
      const res = await fetch(`${API_BASE}/api/movies/${movieId}`, { method: 'DELETE' });
      if (res.ok) {
        Logger.log("SYSTEM", `Movie ID ${movieId} deleted from XAMPP MySQL.`);
        SQLTracker.record(`DELETE FROM movies WHERE movie_id = ${movieId};`, "XAMPP MySQL Live Delete");
        await syncDataFromMySQL();
        return;
      }
    } catch (e) {
      console.warn("API delete failed, fallback:", e);
    }
  }

  // Fallback: local remove
  const associatedShowIds = store.shows.filter(s => s.movie_id === movieId).map(s => s.show_id);
  store.shows = store.shows.filter(s => s.movie_id !== movieId);
  associatedShowIds.forEach(id => {
    delete store.showSeats[id];
  });
  store.movies = store.movies.filter(m => m.id !== movieId);

  SQLTracker.record(`DELETE FROM movies WHERE movie_id = ${movieId};`, "DML: Cascading Delete Movie & Shows");
  Logger.log("SYSTEM", `Movie "${movie.title}" (ID: ${movieId}) deleted from catalog.`);

  if (selectedMovie?.id === movieId) {
    selectedMovie = store.movies[0];
    selectedShow = store.shows.find(s => s.movie_id === selectedMovie?.id) || store.shows[0];
  }

  store.saveState();
  renderMoviesTab();
  if (selectedMovie) {
    selectMovie(selectedMovie.id, true);
  }
}

function selectMovieAndShow(movieId, showId) {
  selectMovie(movieId, false);
  if (showId) {
    selectShow(showId);
  }
  switchTab("availability");
}

function selectMovie(movieId, clearSelectedSeats = true) {
  const movie = store.movies.find(m => m.id === movieId);
  if (!movie) return;
  selectedMovie = movie;

  if (clearSelectedSeats) {
    selectedSeatNumbers.clear();
  }

  // Update Hero section in Availability tab
  const heroContainer = document.getElementById("availabilityMovieHero");
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div class="relative w-28 h-40 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl border border-white/10">
          <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${movie.genre}
            </span>
            <span class="text-xs text-slate-400 font-mono">
              <i data-lucide="clock" class="inline w-3.5 h-3.5 mr-1"></i>${movie.duration_mins} mins
            </span>
            <span class="text-xs text-slate-400 font-mono">
              <i data-lucide="globe" class="inline w-3.5 h-3.5 mr-1"></i>${movie.language}
            </span>
            <span class="text-xs text-amber-400 font-mono font-bold">
              ★ ${movie.rating}/10
            </span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold font-cinematic text-white mb-2">${movie.title}</h2>
          <p class="text-xs text-slate-300 max-w-2xl line-clamp-2 leading-relaxed mb-4">${movie.synopsis}</p>

          <!-- Shows for this movie -->
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Showtime:</span>
            <div id="showButtonsList" class="flex flex-wrap gap-2"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Populate shows for this movie
  renderShowButtons();
  setupLucideIcons();
}

function renderShowButtons() {
  const list = document.getElementById("showButtonsList");
  if (!list) return;

  const shows = store.shows.filter(s => s.movie_id === selectedMovie.id);
  if (shows.length === 0) {
    list.innerHTML = `<span class="text-xs text-slate-500">No shows scheduled.</span>`;
    return;
  }

  // Default to first show if current selectedShow doesn't match movie
  if (!shows.some(s => s.show_id === selectedShow?.show_id)) {
    selectedShow = shows[0];
  }

  list.innerHTML = shows.map(s => {
    const isSelected = s.show_id === selectedShow?.show_id;
    return `
      <button onclick="selectShow(${s.show_id})" class="px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all flex items-center gap-2 ${
        isSelected
          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
          : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-white'
      }">
        <i data-lucide="film" class="w-3.5 h-3.5"></i>
        Screen ${s.screen_id} • ${s.label.split(' - ')[0]}
      </button>
    `;
  }).join('');

  renderSeatingLayout();
}

function selectShow(showId) {
  const show = store.shows.find(s => s.show_id === showId);
  if (!show) return;
  selectedShow = show;
  selectedSeatNumbers.clear();

  Logger.log("INFO", `Switched to Show ID ${show.show_id} (Screen ${show.screen_id}, ${show.start_time}:00)`);
  SQLTracker.record(`SELECT ss.seat_number, ss.seat_type, ss.status FROM show_seats ss WHERE ss.show_id = ${show.show_id};`, "Query Show Seats Availability");

  renderShowButtons();
  renderSeatingLayout();
  updateSelectionSummary();
  updateAvailabilityStats();
}

// =============================================================================
// SEATING LAYOUT & AVAILABILITY MATRIX
// =============================================================================
function renderSeatingLayout() {
  if (!selectedShow) return;

  const screen = store.screens.find(s => s.screen_id === selectedShow.screen_id);
  if (!screen) return;

  const currentSeats = store.showSeats[selectedShow.show_id] || [];

  // Update screen header
  const titleElem = document.getElementById("activeScreenTitle");
  if (titleElem) {
    titleElem.innerHTML = `Screen ${screen.screen_number} &nbsp;•&nbsp; <span class="text-amber-400 font-normal">Pacific Multiplex</span>`;
  }

  const container = document.getElementById("cinemaHallSeats");
  if (!container) return;

  // Group seats by tier: Platinum, Gold, Silver
  const platinumSeats = currentSeats.filter(s => s.seat_type === "Platinum");
  const goldSeats = currentSeats.filter(s => s.seat_type === "Gold");
  const silverSeats = currentSeats.filter(s => s.seat_type === "Silver");

  let html = '';

  // Render Platinum Section (VIP Top Row)
  html += renderSeatRowSection("Platinum", "VIP Recliner Section • ₹400", platinumSeats, "border-purple-500/30", "text-purple-300");

  // Render Gold Section (Middle Row)
  html += renderSeatRowSection("Gold", "Prime Club Section • ₹300", goldSeats, "border-amber-500/30", "text-amber-300");

  // Render Silver Section (Front Row)
  html += renderSeatRowSection("Silver", "Standard Classic Section • ₹200", silverSeats, "border-slate-500/30", "text-slate-300");

  container.innerHTML = html;
  setupLucideIcons();
  updateAvailabilityStats();
}

function renderSeatRowSection(tierName, tierLabel, seats, borderColor, textColor) {
  if (!seats || seats.length === 0) return '';

  return `
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3 px-2 border-b border-white/5 pb-2">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full ${tierName === 'Platinum' ? 'bg-purple-400' : tierName === 'Gold' ? 'bg-amber-400' : 'bg-slate-400'}"></span>
          <span class="text-xs font-bold uppercase tracking-wider ${textColor}">${tierLabel}</span>
        </div>
        <span class="text-[11px] font-mono text-slate-400">
          ${seats.filter(s => s.status === 'available').length} / ${seats.length} Available
        </span>
      </div>

      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        ${seats.map(seat => {
          const isBooked = seat.status === 'booked';
          const isSelected = selectedSeatNumbers.has(seat.seat_number);
          const tierClass = `seat-tier-${seat.seat_type.toLowerCase()}`;
          const stateClass = isBooked ? 'seat-booked' : isSelected ? 'seat-selected' : 'seat-available';

          return `
            <div 
              class="seat-chair ${tierClass} ${stateClass}" 
              onclick="${isBooked ? '' : `toggleSeatSelection(${seat.seat_number})`}"
              title="Seat ${seat.seat_number} • ${seat.seat_type} (₹${SEAT_PRICING[seat.seat_type]}) • ${isBooked ? 'Booked' : 'Available'}"
            >
              <div class="seat-back">
                ${isBooked ? '<i data-lucide="lock" class="w-3 h-3 text-slate-500"></i>' : isSelected ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : seat.seat_number}
              </div>
              <div class="seat-cushion"></div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function toggleSeatSelection(seatNumber) {
  if (selectedSeatNumbers.has(seatNumber)) {
    selectedSeatNumbers.delete(seatNumber);
    Logger.log("INFO", `Deselected seat #${seatNumber}`);
  } else {
    selectedSeatNumbers.add(seatNumber);
    Logger.log("INFO", `Selected seat #${seatNumber} for Show #${selectedShow.show_id}`);
  }
  renderSeatingLayout();
  updateSelectionSummary();
}

function filterSeatTier(tier) {
  activeFilterTier = tier;
  // Visual button styling
  ["ALL", "Platinum", "Gold", "Silver"].forEach(t => {
    const btn = document.getElementById(`filterBtn-${t}`);
    if (btn) {
      if (t === tier) {
        btn.classList.add("bg-amber-500/20", "text-amber-300", "border-amber-500/60");
        btn.classList.remove("text-slate-400");
      } else {
        btn.classList.remove("bg-amber-500/20", "text-amber-300", "border-amber-500/60");
        btn.classList.add("text-slate-400");
      }
    }
  });

  const seats = document.querySelectorAll(".seat-chair");
  seats.forEach(el => {
    if (tier === "ALL") {
      el.style.opacity = "";
      el.style.pointerEvents = "";
    } else {
      if (el.classList.contains(`seat-tier-${tier.toLowerCase()}`)) {
        el.style.opacity = "1";
        el.style.pointerEvents = "";
      } else {
        el.style.opacity = "0.2";
        el.style.pointerEvents = "none";
      }
    }
  });
}

function updateAvailabilityStats() {
  if (!selectedShow) return;
  const currentSeats = store.showSeats[selectedShow.show_id] || [];
  const avail = currentSeats.filter(s => s.status === "available").length;
  const booked = currentSeats.filter(s => s.status === "booked").length;
  const selected = selectedSeatNumbers.size;

  const availElem = document.getElementById("statAvail");
  const bookedElem = document.getElementById("statBooked");
  const totalElem = document.getElementById("statTotal");

  if (availElem) availElem.innerText = avail;
  if (bookedElem) bookedElem.innerText = booked;
  if (totalElem) totalElem.innerText = currentSeats.length;

  const pillAvail = document.getElementById("seatsAvailBadge");
  if (pillAvail) pillAvail.innerText = `${avail} Available`;
}

function updateSelectionSummary() {
  const currentSeats = store.showSeats[selectedShow.show_id] || [];
  const selectedListContainer = document.getElementById("selectedSeatsBadges");
  const priceDisplay = document.getElementById("summaryTotalPrice");
  const bookBtn = document.getElementById("proceedToBookBtn");

  if (selectedSeatNumbers.size === 0) {
    if (selectedListContainer) {
      selectedListContainer.innerHTML = `<span class="text-xs text-slate-500 italic">No seats selected yet. Click on available chairs above.</span>`;
    }
    if (priceDisplay) priceDisplay.innerText = "₹0";
    if (bookBtn) {
      bookBtn.disabled = true;
      bookBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
    return;
  }

  // Calculate prices
  let baseAmount = 0;
  const seatChips = [];

  Array.from(selectedSeatNumbers).sort((a,b)=>a-b).forEach(seatNum => {
    const seatObj = currentSeats.find(s => s.seat_number === seatNum);
    const tier = seatObj ? seatObj.seat_type : "Silver";
    const price = SEAT_PRICING[tier] || 200;
    baseAmount += price;

    seatChips.push(`
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
        Seat ${seatNum} (${tier} • ₹${price})
        <button onclick="toggleSeatSelection(${seatNum})" class="hover:text-red-400 ml-0.5">✕</button>
      </span>
    `);
  });

  if (selectedListContainer) {
    selectedListContainer.innerHTML = seatChips.join('');
  }

  if (priceDisplay) {
    priceDisplay.innerText = `₹${baseAmount}`;
  }

  if (bookBtn) {
    bookBtn.disabled = false;
    bookBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

// =============================================================================
// CHECKOUT & PAYMENT WORKFLOW
// =============================================================================
function openCheckoutModal() {
  if (selectedSeatNumbers.size === 0) return;

  const currentSeats = store.showSeats[selectedShow.show_id] || [];
  let baseAmount = 0;
  const seatDetails = [];

  Array.from(selectedSeatNumbers).sort((a,b)=>a-b).forEach(seatNum => {
    const seatObj = currentSeats.find(s => s.seat_number === seatNum);
    const tier = seatObj ? seatObj.seat_type : "Silver";
    const price = SEAT_PRICING[tier];
    baseAmount += price;
    seatDetails.push({ seatNum, tier, price });
  });

  const gst = Math.round(baseAmount * 0.18);
  const total = baseAmount + gst;

  // Fill modal fields
  document.getElementById("checkoutMovieTitle").innerText = selectedMovie.title;
  document.getElementById("checkoutShowInfo").innerText = `Screen ${selectedShow.screen_id} • ${selectedShow.label}`;
  document.getElementById("checkoutCustomerName").innerText = store.currentCustomer.name;
  document.getElementById("checkoutCustomerPhone").innerText = store.currentCustomer.phone_no;
  
  document.getElementById("checkoutSeatsList").innerText = Array.from(selectedSeatNumbers).join(", ");
  document.getElementById("checkoutBaseAmount").innerText = `₹${baseAmount}`;
  document.getElementById("checkoutGstAmount").innerText = `₹${gst} (18% GST)`;
  document.getElementById("checkoutGrandTotal").innerText = `₹${total}`;

  // Reset payment selection to UPI
  selectPaymentMethod("UPI");

  const modal = document.getElementById("checkoutModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setupLucideIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

let activePaymentMethod = "UPI";
function selectPaymentMethod(method) {
  activePaymentMethod = method;
  ["UPI", "CreditCard", "Cash"].forEach(m => {
    const btn = document.getElementById(`payMethod-${m}`);
    const view = document.getElementById(`payView-${m}`);
    if (btn && view) {
      if (m === method) {
        btn.classList.add("border-amber-400", "bg-amber-500/10", "text-amber-300");
        view.classList.remove("hidden");
      } else {
        btn.classList.remove("border-amber-400", "bg-amber-500/10", "text-amber-300");
        view.classList.add("hidden");
      }
    }
  });
}

/**
 * Execute Booking with Mutex Lock Protection (Mirrors BookingService::bookShowSeats)
 */
async function confirmBookingAndPay() {
  const confirmBtn = document.getElementById("confirmPaymentBtn");
  confirmBtn.disabled = true;
  confirmBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin inline mr-2"></i> Locking Mutex & Committing DB...`;
  setupLucideIcons();

  const seatsToBook = Array.from(selectedSeatNumbers);
  const showId = selectedShow.show_id;
  const customer = store.currentCustomer;

  // 1. Acquire Mutex Lock (OS Concept: std::lock_guard<mutex>)
  Logger.log("INFO", `Attempting to acquire seatMutex for customer ${customer.name} (ID: ${customer.cust_id})`);
  await seatMutex.acquire(`Customer Thread: ${customer.name}`);

  // Small delay to make the OS mutex lock observable in the HUD
  await new Promise(r => setTimeout(r, 600));

  try {
    // 2. Validate seat availability inside Critical Section
    const currentSeats = store.showSeats[showId] || [];
    const unavailableSeats = seatsToBook.filter(sNum => {
      const s = currentSeats.find(seat => seat.seat_number === sNum);
      return !s || s.status !== "available";
    });

    if (unavailableSeats.length > 0) {
      Logger.log("WARN", `Booking REJECTED! Seats already booked: [${unavailableSeats.join(', ')}]`);
      alert(`Booking Failed: One or more selected seats (${unavailableSeats.join(', ')}) were just booked by another user.`);
      seatMutex.release();
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = `Confirm & Pay`;
      closeCheckoutModal();
      renderSeatingLayout();
      return;
    }

    // 3. Price Calculation
    let totalPrice = 0;
    seatsToBook.forEach(sNum => {
      const s = currentSeats.find(seat => seat.seat_number === sNum);
      totalPrice += SEAT_PRICING[s.seat_type];
    });
    totalPrice += Math.round(totalPrice * 0.18); // with GST

    // --- If connected to XAMPP MySQL backend, execute real database insert! ---
    if (isBackendLive) {
      try {
        const res = await fetch(`${API_BASE}/api/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cust_id: customer.cust_id,
            show_id: showId,
            seats: seatsToBook,
            total_amount: totalPrice,
            payment_method: activePaymentMethod
          })
        });

        if (res.ok) {
          const resData = await res.json();
          const dbBookingId = resData.booking_id;
          
          SQLTracker.record(
            `INSERT INTO bookings (cust_id, show_id, total_amount, booking_status) VALUES (${customer.cust_id}, ${showId}, ${totalPrice}, 1);`,
            "XAMPP MySQL Live Booking Insert"
          );
          SQLTracker.record(
            `UPDATE show_seats SET status = 'booked' WHERE show_id = ${showId} AND seat_number IN (${seatsToBook.join(',')});`,
            "XAMPP MySQL Row-level Lock & Update"
          );

          Logger.log("BOOKING", `[MYSQL COMMITTED] Booking BK${dbBookingId} committed to XAMPP MySQL | Seats [${seatsToBook.join(', ')}]`);
          
          await syncDataFromMySQL();
          selectedSeatNumbers.clear();
          closeCheckoutModal();
          renderSeatingLayout();
          updateSelectionSummary();
          renderTicketsTab();

          const createdBooking = store.bookings.find(b => b.booking_id === dbBookingId) || {
            booking_id: dbBookingId,
            cust_id: customer.cust_id,
            customer_name: customer.name,
            customer_phone: customer.phone_no,
            show_id: showId,
            movie_title: selectedMovie.title,
            screen_id: selectedShow.screen_id,
            start_time: selectedShow.start_time,
            seats: seatsToBook,
            total_amount: totalPrice,
            payment_method: activePaymentMethod,
            booking_status: 1,
            booked_at: new Date().toISOString()
          };

          simulateForkTicketPrinter(createdBooking);
          showTicketDetails(createdBooking);
          alert(`✅ Booking BK${dbBookingId} saved directly into XAMPP MySQL database!\n\nCheck tables 'bookings', 'booking_seats', and 'payments' in phpMyAdmin.`);
          return;
        } else {
          const errData = await res.json();
          alert(`Booking Rejected by MySQL: ${errData.error || 'Seats unavailable'}`);
          return;
        }
      } catch (bkErr) {
        console.warn("Backend booking API error, fallback to local:", bkErr);
      }
    }

    // 4. Update in-memory showSeats state (Offline Fallback)
    currentSeats.forEach(s => {
      if (seatsToBook.includes(s.seat_number)) {
        s.status = "booked";
      }
    });

    // 5. Generate Booking Record
    const nextBookingId = store.bookings.length > 0 ? Math.max(...store.bookings.map(b => b.booking_id)) + 1 : 101;
    const newBooking = {
      booking_id: nextBookingId,
      cust_id: customer.cust_id,
      customer_name: customer.name,
      customer_phone: customer.phone_no,
      show_id: showId,
      movie_title: selectedMovie.title,
      screen_id: selectedShow.screen_id,
      start_time: selectedShow.start_time,
      seats: seatsToBook,
      total_amount: totalPrice,
      payment_method: activePaymentMethod,
      booking_status: 1, // 1 = Confirmed
      booked_at: new Date().toISOString()
    };
    store.bookings.unshift(newBooking);

    // 6. Record Simulated SQL Queries
    SQLTracker.record(
      `INSERT INTO bookings (cust_id, show_id, total_amount, booking_status) VALUES (${customer.cust_id}, ${showId}, ${totalPrice}, 1);`,
      "Transactional DB Write: Booking Master Record"
    );
    seatsToBook.forEach(seatNum => {
      SQLTracker.record(
        `INSERT INTO booking_seats (booking_id, show_seat_id) VALUES (${nextBookingId}, (SELECT show_seat_id FROM show_seats WHERE show_id=${showId} AND seat_number=${seatNum}));`,
        "Transactional Junction Table Record"
      );
      SQLTracker.record(
        `UPDATE show_seats SET status = 'booked' WHERE show_id = ${showId} AND seat_number = ${seatNum};`,
        "Row-level State Transition"
      );
    });
    SQLTracker.record(
      `INSERT INTO payments (booking_id, amount, payment_method) VALUES (${nextBookingId}, ${totalPrice}, '${activePaymentMethod}');`,
      "Payment Settlement"
    );

    // 7. Log Event
    Logger.log("BOOKING", `Customer ${customer.name} (ID: ${customer.cust_id}) booked seats [${seatsToBook.join(', ')}] via ${activePaymentMethod} | Amount: Rs.${totalPrice} | BookingID: BK${nextBookingId}`);

    // 8. Simulate TicketPrinter Child Process (OS Concept: fork() & waitpid())
    simulateForkTicketPrinter(newBooking);

    // Save and refresh UI
    store.saveState();
    selectedSeatNumbers.clear();
    closeCheckoutModal();
    renderSeatingLayout();
    updateSelectionSummary();
    renderTicketsTab();

    // Show success ticket preview
    showTicketDetails(newBooking);

  } finally {
    // Release Mutex (lock_guard destructor behavior)
    seatMutex.release();
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = `Confirm & Pay`;
  }
}

/**
 * Simulate OS Concept: Process Isolation (fork & waitpid)
 */
function simulateForkTicketPrinter(booking) {
  const childPid = Math.floor(1000 + Math.random() * 9000);
  const parentPid = 412;
  Logger.log("SYSTEM", `TicketPrinter: fork() called by parent (PID ${parentPid}). Child process spawned with PID ${childPid}.`);
  Logger.log("SYSTEM", `[Child Process PID ${childPid}] Formatting and rendering thermal ticket stub for BK${booking.booking_id}...`);
  setTimeout(() => {
    Logger.log("SYSTEM", `[Child Process PID ${childPid}] Ticket buffer flushed. Child exited with code 0.`);
    Logger.log("SYSTEM", `Parent process (PID ${parentPid}) reaped child via waitpid() [No zombie process created].`);
  }, 400);
}

// =============================================================================
// TICKET BOARDING PASS & CANCELLATION
// =============================================================================
function renderTicketsTab() {
  const container = document.getElementById("ticketsListContainer");
  if (!container) return;

  const myBookings = store.bookings.filter(b => b.cust_id === store.currentCustomer.cust_id);

  if (myBookings.length === 0) {
    container.innerHTML = `
      <div class="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto">
        <div class="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center mb-4 border border-amber-500/20">
          <i data-lucide="ticket" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold font-cinematic text-white mb-2">No Bookings Found</h3>
        <p class="text-xs text-slate-400 mb-6 leading-relaxed">You haven't booked any cinema tickets under account "${store.currentCustomer.name}" yet. Explore now showing movies and select your favorite recliners.</p>
        <button onclick="switchTab('availability')" class="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
          Browse Now Showing
        </button>
      </div>
    `;
    setupLucideIcons();
    return;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      ${myBookings.map(b => renderSingleTicketCard(b)).join('')}
    </div>
  `;
  setupLucideIcons();
}

function renderSingleTicketCard(booking) {
  const isConfirmed = booking.booking_status === 1;
  const movie = store.movies.find(m => m.title === booking.movie_title) || store.movies[0];

  return `
    <div class="cinema-ticket flex flex-col justify-between p-6 relative">
      <div class="ticket-notch-left"></div>
      <div class="ticket-notch-right"></div>
      <div class="ticket-perforation"></div>

      <!-- Top Section -->
      <div>
        <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-cinematic">
              PVR
            </div>
            <div>
              <span class="text-[10px] tracking-widest uppercase font-semibold text-amber-400">Pacific Multiplex</span>
              <h4 class="text-base font-bold text-white font-cinematic">Cinema Boarding Pass</h4>
            </div>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-mono ${
              isConfirmed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }">
              ${isConfirmed ? 'CONFIRMED' : 'CANCELLED'}
            </span>
            <div class="text-[10px] font-mono text-slate-400 mt-1">BK#${booking.booking_id}</div>
          </div>
        </div>

        <div class="flex gap-4 items-center mb-4">
          <img src="${movie.poster}" alt="${booking.movie_title}" class="w-16 h-22 object-cover rounded-lg border border-white/10 shadow-md flex-shrink-0" />
          <div class="flex-1">
            <h3 class="text-xl font-bold font-cinematic text-white leading-tight">${booking.movie_title}</h3>
            <p class="text-xs text-slate-400 font-mono mt-0.5">Screen ${booking.screen_id} • ${booking.start_time}:00 Show</p>
            <div class="mt-2 flex flex-wrap gap-2 text-xs">
              <span class="text-slate-400">Seats:</span>
              <span class="font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                ${booking.seats.join(', ')}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-slate-950/60 border border-white/5 mb-6 text-center text-xs">
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">Customer</span>
            <span class="text-slate-200 font-medium truncate block">${booking.customer_name}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">Payment</span>
            <span class="text-slate-200 font-medium block">${booking.payment_method}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">Total Paid</span>
            <span class="text-amber-400 font-mono font-bold block">₹${booking.total_amount}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Stub Section (Under Perforation) -->
      <div class="pt-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-1.5 rounded-lg bg-white">
            <svg class="w-12 h-12" viewBox="0 0 100 100" fill="black">
              <!-- Simulated QR Code Matrix -->
              <rect x="5" y="5" width="25" height="25" fill="black" />
              <rect x="10" y="10" width="15" height="15" fill="white" />
              <rect x="70" y="5" width="25" height="25" fill="black" />
              <rect x="75" y="10" width="15" height="15" fill="white" />
              <rect x="5" y="70" width="25" height="25" fill="black" />
              <rect x="10" y="75" width="15" height="15" fill="white" />
              <rect x="40" y="20" width="20" height="10" fill="black" />
              <rect x="40" y="45" width="20" height="20" fill="black" />
              <rect x="70" y="45" width="20" height="10" fill="black" />
              <rect x="20" y="45" width="10" height="15" fill="black" />
            </svg>
          </div>
          <div class="text-[10px] font-mono text-slate-400">
            <div class="text-slate-300 font-semibold">SECURITY HASH</div>
            <div>SHA256: 8a4f...${booking.booking_id}</div>
            <div>BOOKED: ${new Date(booking.booked_at).toLocaleDateString()}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="printTicketPreview(${booking.booking_id})" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print
          </button>
          ${isConfirmed ? `
            <button onclick="cancelBooking(${booking.booking_id})" class="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-semibold text-xs transition-all flex items-center gap-1.5">
              <i data-lucide="x-circle" class="w-3.5 h-3.5"></i> Cancel
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function showTicketDetails(booking) {
  printTicketPreview(booking.booking_id);
}

function printTicketPreview(bookingId) {
  const booking = store.bookings.find(b => b.booking_id === bookingId);
  if (!booking) return;

  const movie = store.movies.find(m => m.title === booking.movie_title) || store.movies[0];
  const modalContent = document.getElementById("ticketModalBody");

  modalContent.innerHTML = `
    <div id="printableTicket" class="p-6 bg-slate-900 rounded-2xl border border-amber-500/30 text-white font-sans">
      <div class="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
        <div>
          <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">PACIFIC CINEMA MULTIPLEX</span>
          <h2 class="text-2xl font-bold font-cinematic">Electronic Cinema Ticket</h2>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono text-slate-400">BOOKING REFERENCE</span>
          <div class="text-lg font-bold font-mono text-amber-400">BK#${booking.booking_id}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <span class="text-xs text-slate-400 block">Movie Title</span>
          <div class="text-lg font-bold text-white">${booking.movie_title}</div>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Auditorium / Screen</span>
          <div class="text-lg font-bold text-white">Screen ${booking.screen_id}</div>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Show Time</span>
          <div class="text-base font-semibold text-white">${booking.start_time}:00 HRS</div>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Reserved Seats</span>
          <div class="text-base font-bold font-mono text-amber-300">${booking.seats.join(', ')}</div>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Customer Name</span>
          <div class="text-sm font-semibold text-white">${booking.customer_name} (${booking.customer_phone})</div>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Amount Paid</span>
          <div class="text-lg font-bold font-mono text-emerald-400">₹${booking.total_amount} (${booking.payment_method})</div>
        </div>
      </div>

      <div class="border-t border-dashed border-white/20 pt-4 flex items-center justify-between">
        <div class="text-[11px] text-slate-400 font-mono">
          <div>* Please arrive 15 minutes prior to showtime.</div>
          <div>* Outside food and drinks are strictly prohibited.</div>
          <div>* Handled via process isolation: TicketPrinter child process.</div>
        </div>
        <div class="font-mono text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
          ${booking.booking_status === 1 ? 'STATUS: CONFIRMED' : 'STATUS: CANCELLED'}
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById("ticketModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setupLucideIcons();
}

function closeTicketModal() {
  const modal = document.getElementById("ticketModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function triggerRealPrint() {
  window.print();
}

/**
 * Cancel Booking (Mirrors Customer::cancelMyBooking & BookingService::CancelBooking)
 */
async function cancelBooking(bookingId) {
  if (!confirm(`Are you sure you want to cancel Booking #BK${bookingId}? Seats will be released back to the hall immediately.`)) {
    return;
  }

  const booking = store.bookings.find(b => b.booking_id === bookingId);
  if (!booking) return;

  if (booking.booking_status === 0) {
    alert("This booking is already cancelled.");
    return;
  }

  // If connected to XAMPP MySQL backend, execute real database cancellation
  if (isBackendLive) {
    try {
      const res = await fetch(`${API_BASE}/api/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId })
      });

      if (res.ok) {
        SQLTracker.record(`UPDATE bookings SET booking_status = 0 WHERE booking_id = ${bookingId};`, "XAMPP MySQL Live Cancel");
        Logger.log("BOOKING", `Booking BK${bookingId} cancelled in XAMPP MySQL.`);
        await syncDataFromMySQL();
        renderTicketsTab();
        renderSeatingLayout();
        updateAvailabilityStats();
        alert(`✅ Booking BK${bookingId} cancelled in XAMPP MySQL!\nSeats released back to available pool in database.`);
        return;
      }
    } catch (cErr) {
      console.warn("Backend cancel error, fallback to local:", cErr);
    }
  }

  // Fallback: local cancel
  booking.booking_status = 0;

  const showSeatsList = store.showSeats[booking.show_id];
  if (showSeatsList) {
    showSeatsList.forEach(s => {
      if (booking.seats.includes(s.seat_number)) {
        s.status = "available";
      }
    });
  }

  SQLTracker.record(
    `UPDATE bookings SET booking_status = 0 WHERE booking_id = ${bookingId};`,
    "DML: Soft Delete Booking (Offline)"
  );
  booking.seats.forEach(sNum => {
    SQLTracker.record(
      `UPDATE show_seats SET status = 'available' WHERE show_id = ${booking.show_id} AND seat_number = ${sNum};`,
      "DML: Release Seat Locks to Available"
    );
  });

  Logger.log("BOOKING", `Booking BK${bookingId} CANCELLED by customer ${store.currentCustomer.name}. Seats [${booking.seats.join(', ')}] returned to available pool.`);

  store.saveState();
  renderTicketsTab();
  renderSeatingLayout();
  updateAvailabilityStats();
}

// =============================================================================
// USER PROFILE & LOGIN (Mirrors Customer.cpp: phone lookup / registration)
// =============================================================================
function openUserModal() {
  document.getElementById("loginPhone").value = store.currentCustomer.phone_no;
  document.getElementById("loginName").value = store.currentCustomer.name;
  const modal = document.getElementById("userModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeUserModal() {
  const modal = document.getElementById("userModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

async function handleCustomerLogin(e) {
  if (e) e.preventDefault();
  const phone = parseInt(document.getElementById("loginPhone").value.trim(), 10);
  const name = document.getElementById("loginName").value.trim();

  if (!phone || isNaN(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // If connected to XAMPP MySQL backend, execute real customer lookup / insert
  if (isBackendLive) {
    try {
      const res = await fetch(`${API_BASE}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone_no: phone })
      });

      if (res.ok) {
        const cData = await res.json();
        store.currentCustomer = cData.customer;
        Logger.log("INFO", `Customer ${store.currentCustomer.name} authenticated with XAMPP MySQL (CustID: ${store.currentCustomer.cust_id}).`);
        SQLTracker.record(
          `SELECT cust_id, name FROM customers WHERE phone_no = ${phone} LIMIT 1;`,
          "XAMPP MySQL Customer Auth"
        );
        store.saveState();
        updateUserBadge();
        closeUserModal();
        renderTicketsTab();
        return;
      }
    } catch (custErr) {
      console.warn("Backend customer auth error, fallback to local:", custErr);
    }
  }

  // Fallback: local lookup
  let customer = store.customers.find(c => c.phone_no === phone);

  if (customer) {
    store.currentCustomer = customer;
    Logger.log("INFO", `Existing customer authenticated: ${customer.name} (Phone: ${customer.phone_no}, CustID: ${customer.cust_id})`);
    SQLTracker.record(`SELECT cust_id, name FROM customers WHERE phone_no = ${phone} LIMIT 1;`, "Authenticate Customer (Offline)");
  } else {
    const nextCustId = store.customers.length > 0 ? Math.max(...store.customers.map(c => c.cust_id)) + 1 : 1;
    customer = {
      cust_id: nextCustId,
      name: name || `Customer_${phone.toString().slice(-4)}`,
      phone_no: phone
    };
    store.customers.push(customer);
    store.currentCustomer = customer;
    Logger.log("INFO", `New customer registered: ${customer.name} (Phone: ${customer.phone_no}, New CustID: ${customer.cust_id})`);
    SQLTracker.record(`INSERT INTO customers (name, phone_no) VALUES ('${customer.name}', ${customer.phone_no});`, "Register Customer (Offline)");
  }

  store.saveState();
  updateUserBadge();
  closeUserModal();
  renderTicketsTab();
}

function updateUserBadge() {
  const badge = document.getElementById("userBadgeText");
  if (badge) {
    badge.innerText = `${store.currentCustomer.name} (ID: ${store.currentCustomer.cust_id})`;
  }
}

// =============================================================================
// OS & DBMS PBL INSPECTOR (Interactive Simulator Lab)
// =============================================================================
function toggleInspector() {
  const drawer = document.getElementById("inspectorDrawer");
  if (!drawer) return;
  drawer.classList.toggle("translate-x-full");
}

function switchInspectorTab(subTab) {
  ["concurrency", "tables", "sql", "logs", "schema"].forEach(t => {
    const btn = document.getElementById(`inspectorTabBtn-${t}`);
    const view = document.getElementById(`inspectorView-${t}`);
    if (btn && view) {
      if (t === subTab) {
        btn.classList.add("text-amber-400", "border-b-2", "border-amber-400", "bg-white/5");
        btn.classList.remove("text-slate-400");
        view.classList.remove("hidden");
      } else {
        btn.classList.remove("text-amber-400", "border-b-2", "border-amber-400", "bg-white/5");
        btn.classList.add("text-slate-400");
        view.classList.add("hidden");
      }
    }
  });

  if (subTab === "tables") {
    if (isBackendLive) {
      syncDataFromMySQL().then(() => renderActiveDatabaseTable());
    } else {
      renderActiveDatabaseTable();
    }
  }
  setupLucideIcons();
}

// =============================================================================
// DATABASE TABLE VIEWER & SQL DUMP EXPORTER (Workbench In-Browser)
// =============================================================================
let activeViewerTable = "movies";
let tableSearchQuery = "";

function selectViewerTable(tblName) {
  activeViewerTable = tblName;
  const allTables = ["movies", "shows", "show_seats", "customers", "bookings", "booking_seats", "payments", "screens", "seats"];
  allTables.forEach(t => {
    const btn = document.getElementById(`tblBtn-${t}`);
    if (btn) {
      if (t === tblName) {
        btn.classList.add("bg-amber-500/20", "text-amber-300", "border-amber-500/60", "font-bold");
        btn.classList.remove("text-slate-400");
      } else {
        btn.classList.remove("bg-amber-500/20", "text-amber-300", "border-amber-500/60", "font-bold");
        btn.classList.add("text-slate-400");
      }
    }
  });
  renderActiveDatabaseTable();
}

function handleTableSearch(val) {
  tableSearchQuery = val.trim().toLowerCase();
  renderActiveDatabaseTable();
}

function getFlattenedShowSeats() {
  const list = [];
  let counter = 1;
  for (const showId in store.showSeats) {
    store.showSeats[showId].forEach(s => {
      list.push({
        show_seat_id: counter++,
        show_id: parseInt(showId),
        seat_id: s.seat_id,
        seat_number: s.seat_number,
        seat_type: s.seat_type,
        status: s.status
      });
    });
  }
  return list;
}

function getFlattenedBookingSeats() {
  const list = [];
  let counter = 1;
  store.bookings.forEach(b => {
    b.seats.forEach(seatNum => {
      list.push({
        id: counter++,
        booking_id: b.booking_id,
        show_id: b.show_id,
        seat_number: seatNum
      });
    });
  });
  return list;
}

function getFlattenedPayments() {
  let counter = 1;
  return store.bookings.map(b => ({
    payment_id: counter++,
    booking_id: b.booking_id,
    amount: b.total_amount,
    payment_method: b.payment_method || "UPI",
    paid_at: b.booked_at ? new Date(b.booked_at).toLocaleString() : new Date().toLocaleString()
  }));
}

function getFlattenedSeats() {
  const list = [];
  store.screens.forEach(sc => {
    sc.seats.forEach(s => {
      list.push({
        seat_id: s.id,
        screen_id: sc.screen_id,
        seat_number: s.seat_number,
        seat_type: s.type
      });
    });
  });
  return list;
}

function renderActiveDatabaseTable() {
  const container = document.getElementById("databaseTableContainer");
  if (!container) return;

  // Update counts on buttons
  const cntMovies = document.getElementById("cnt-movies");
  const cntShows = document.getElementById("cnt-shows");
  const cntShowSeats = document.getElementById("cnt-show_seats");
  const cntCustomers = document.getElementById("cnt-customers");
  const cntBookings = document.getElementById("cnt-bookings");
  const cntBookingSeats = document.getElementById("cnt-booking_seats");
  const cntPayments = document.getElementById("cnt-payments");

  const flattenedShowSeats = getFlattenedShowSeats();
  const flattenedBookingSeats = getFlattenedBookingSeats();
  const flattenedPayments = getFlattenedPayments();
  const flattenedSeats = getFlattenedSeats();

  if (cntMovies) cntMovies.innerText = store.movies.length;
  if (cntShows) cntShows.innerText = store.shows.length;
  if (cntShowSeats) cntShowSeats.innerText = flattenedShowSeats.length;
  if (cntCustomers) cntCustomers.innerText = store.customers.length;
  if (cntBookings) cntBookings.innerText = store.bookings.length;
  if (cntBookingSeats) cntBookingSeats.innerText = flattenedBookingSeats.length;
  if (cntPayments) cntPayments.innerText = flattenedPayments.length;

  // Table Configuration Map
  const tableConfigs = {
    movies: {
      columns: [
        { key: "id", label: "movie_id", badge: "PK", type: "INT" },
        { key: "title", label: "title", type: "VARCHAR(255)" },
        { key: "language", label: "language", type: "VARCHAR(50)" },
        { key: "duration_mins", label: "duration_mins", type: "INT" },
        { key: "genre", label: "genre", type: "VARCHAR(50)" },
        { key: "rating", label: "rating", type: "VARCHAR(10)" }
      ],
      rows: store.movies
    },
    shows: {
      columns: [
        { key: "show_id", label: "show_id", badge: "PK", type: "INT" },
        { key: "movie_id", label: "movie_id", badge: "FK", type: "INT" },
        { key: "screen_id", label: "screen_id", badge: "FK", type: "INT" },
        { key: "start_time", label: "start_time", type: "INT" },
        { key: "end_time", label: "end_time", type: "INT" },
        { key: "label", label: "schedule_slot", type: "VARCHAR" }
      ],
      rows: store.shows
    },
    show_seats: {
      columns: [
        { key: "show_seat_id", label: "show_seat_id", badge: "PK", type: "INT" },
        { key: "show_id", label: "show_id", badge: "FK", type: "INT" },
        { key: "seat_id", label: "seat_id", badge: "FK", type: "INT" },
        { key: "seat_number", label: "seat_number", type: "INT" },
        { key: "seat_type", label: "seat_type", type: "VARCHAR(20)" },
        { key: "status", label: "status", type: "VARCHAR(20)" }
      ],
      rows: flattenedShowSeats
    },
    customers: {
      columns: [
        { key: "cust_id", label: "cust_id", badge: "PK", type: "INT" },
        { key: "name", label: "name", type: "VARCHAR(100)" },
        { key: "phone_no", label: "phone_no", badge: "UNIQUE", type: "BIGINT" }
      ],
      rows: store.customers
    },
    bookings: {
      columns: [
        { key: "booking_id", label: "booking_id", badge: "PK", type: "INT" },
        { key: "cust_id", label: "cust_id", badge: "FK", type: "INT" },
        { key: "show_id", label: "show_id", badge: "FK", type: "INT" },
        { key: "total_amount", label: "total_amount (₹)", type: "INT" },
        { key: "booking_status", label: "booking_status", type: "TINYINT(1)" },
        { key: "booked_at", label: "booked_at", type: "TIMESTAMP" }
      ],
      rows: store.bookings
    },
    booking_seats: {
      columns: [
        { key: "id", label: "id", badge: "PK", type: "INT" },
        { key: "booking_id", label: "booking_id", badge: "FK", type: "INT" },
        { key: "show_id", label: "show_id", badge: "FK", type: "INT" },
        { key: "seat_number", label: "seat_number", type: "INT" }
      ],
      rows: flattenedBookingSeats
    },
    payments: {
      columns: [
        { key: "payment_id", label: "payment_id", badge: "PK", type: "INT" },
        { key: "booking_id", label: "booking_id", badge: "FK", type: "INT" },
        { key: "amount", label: "amount (₹)", type: "INT" },
        { key: "payment_method", label: "payment_method", type: "VARCHAR(20)" },
        { key: "paid_at", label: "paid_at", type: "TIMESTAMP" }
      ],
      rows: flattenedPayments
    },
    screens: {
      columns: [
        { key: "screen_id", label: "screen_id", badge: "PK", type: "INT" },
        { key: "screen_number", label: "screen_number", type: "INT" },
        { key: "silver_count", label: "silver_count", type: "INT" },
        { key: "gold_count", label: "gold_count", type: "INT" },
        { key: "platinum_count", label: "platinum_count", type: "INT" },
        { key: "total_seats", label: "total_seats", type: "INT" }
      ],
      rows: store.screens
    },
    seats: {
      columns: [
        { key: "seat_id", label: "seat_id", badge: "PK", type: "INT" },
        { key: "screen_id", label: "screen_id", badge: "FK", type: "INT" },
        { key: "seat_number", label: "seat_number", type: "INT" },
        { key: "seat_type", label: "seat_type", type: "VARCHAR(20)" }
      ],
      rows: flattenedSeats
    }
  };

  const config = tableConfigs[activeViewerTable] || tableConfigs["movies"];

  // Meta update
  const nameBadge = document.getElementById("activeTableNameBadge");
  const countBadge = document.getElementById("activeTableRowCountBadge");
  if (nameBadge) nameBadge.innerText = `cinema_booking.${activeViewerTable}`;

  // Filter rows by tableSearchQuery if any
  let rows = config.rows;
  if (tableSearchQuery) {
    rows = rows.filter(r => {
      return Object.values(r).some(val => 
        String(val).toLowerCase().includes(tableSearchQuery)
      );
    });
  }

  if (countBadge) {
    countBadge.innerText = `Showing ${rows.length} of ${config.rows.length} records`;
  }

  if (rows.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-xs text-slate-400 font-mono">
        <i data-lucide="database" class="w-8 h-8 text-slate-600 mx-auto mb-2"></i>
        Table "${activeViewerTable}" is currently empty or no records match your search filter "${escapeHtml(tableSearchQuery)}".
      </div>
    `;
    setupLucideIcons();
    return;
  }

  // Generate Table HTML
  let html = `
    <table class="w-full text-left font-mono text-xs border-collapse">
      <thead>
        <tr class="bg-slate-900 border-b border-white/10 text-[11px] text-slate-300">
          <th class="p-3 w-12 text-slate-500 text-center">#</th>
          ${config.columns.map(col => `
            <th class="p-3 whitespace-nowrap">
              <div class="flex items-center gap-1.5">
                <span class="text-white font-bold">${col.label}</span>
                ${col.badge ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-bold ${col.badge === 'PK' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : col.badge === 'FK' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'}">${col.badge}</span>` : ''}
              </div>
              <span class="text-[9px] text-slate-500 font-normal block">${col.type}</span>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        ${rows.map((row, idx) => `
          <tr class="hover:bg-white/5 transition-colors">
            <td class="p-3 text-slate-500 text-center text-[10px]">${idx + 1}</td>
            ${config.columns.map(col => {
              let val = row[col.key] !== undefined ? row[col.key] : "-";
              
              // Formatting special badges
              if (col.key === "status") {
                const isAvail = String(val).toLowerCase() === "available";
                return `
                  <td class="p-3 whitespace-nowrap">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isAvail ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
                      ${val}
                    </span>
                  </td>
                `;
              }
              if (col.key === "booking_status") {
                const isConf = val === 1 || val === true;
                return `
                  <td class="p-3 whitespace-nowrap">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isConf ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">
                      ${isConf ? '1 (CONFIRMED)' : '0 (CANCELLED)'}
                    </span>
                  </td>
                `;
              }
              if (col.key === "booked_at") {
                return `<td class="p-3 text-slate-400 whitespace-nowrap text-[11px]">${new Date(val).toLocaleString()}</td>`;
              }
              if (col.key === "total_amount" || col.key === "amount") {
                return `<td class="p-3 text-amber-300 font-bold whitespace-nowrap">₹${val}</td>`;
              }
              return `<td class="p-3 text-slate-200 whitespace-nowrap">${escapeHtml(String(val))}</td>`;
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = html;
  setupLucideIcons();
}

/**
 * Generates and downloads a complete, valid MySQL dump of all current tables
 */
function exportDatabaseSQL() {
  const flattenedShowSeats = getFlattenedShowSeats();
  const flattenedBookingSeats = getFlattenedBookingSeats();
  const flattenedPayments = getFlattenedPayments();
  const flattenedSeats = getFlattenedSeats();

  let sql = `-- ========================================================\n`;
  sql += `-- Cinema Ticket Booking System - Database SQL Snapshot\n`;
  sql += `-- Generated on: ${new Date().toISOString()}\n`;
  sql += `-- Schema: cinema_booking (9 Relational Tables)\n`;
  sql += `-- ========================================================\n\n`;
  sql += `CREATE DATABASE IF NOT EXISTS \`cinema_booking\`;\n`;
  sql += `USE \`cinema_booking\`;\n`;
  sql += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

  // 1. customers
  sql += `-- 1. Customers\n`;
  sql += `DROP TABLE IF EXISTS \`customers\`;\n`;
  sql += `CREATE TABLE \`customers\` (\n  \`cust_id\` INT NOT NULL AUTO_INCREMENT,\n  \`name\` VARCHAR(100) NOT NULL,\n  \`phone_no\` BIGINT NOT NULL,\n  PRIMARY KEY (\`cust_id\`),\n  UNIQUE KEY \`idx_phone\` (\`phone_no\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (store.customers.length > 0) {
    sql += `INSERT INTO \`customers\` (\`cust_id\`, \`name\`, \`phone_no\`) VALUES\n`;
    sql += store.customers.map(c => `(${c.cust_id}, '${c.name.replace(/'/g, "''")}', ${c.phone_no})`).join(',\n') + `;\n\n`;
  }

  // 2. movies
  sql += `-- 2. Movies\n`;
  sql += `DROP TABLE IF EXISTS \`movies\`;\n`;
  sql += `CREATE TABLE \`movies\` (\n  \`movie_id\` INT NOT NULL AUTO_INCREMENT,\n  \`title\` VARCHAR(255) NOT NULL,\n  \`language\` VARCHAR(50) DEFAULT NULL,\n  \`duration_mins\` INT DEFAULT NULL,\n  PRIMARY KEY (\`movie_id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (store.movies.length > 0) {
    sql += `INSERT INTO \`movies\` (\`movie_id\`, \`title\`, \`language\`, \`duration_mins\`) VALUES\n`;
    sql += store.movies.map(m => `(${m.id}, '${m.title.replace(/'/g, "''")}', '${m.language}', ${m.duration_mins})`).join(',\n') + `;\n\n`;
  }

  // 3. screens
  sql += `-- 3. Screens\n`;
  sql += `DROP TABLE IF EXISTS \`screens\`;\n`;
  sql += `CREATE TABLE \`screens\` (\n  \`screen_id\` INT NOT NULL AUTO_INCREMENT,\n  \`screen_number\` INT NOT NULL,\n  \`silver_count\` INT DEFAULT 0,\n  \`gold_count\` INT DEFAULT 0,\n  \`platinum_count\` INT DEFAULT 0,\n  PRIMARY KEY (\`screen_id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  sql += `INSERT INTO \`screens\` (\`screen_id\`, \`screen_number\`, \`silver_count\`, \`gold_count\`, \`platinum_count\`) VALUES\n`;
  sql += store.screens.map(s => `(${s.screen_id}, ${s.screen_number}, ${s.silver_count}, ${s.gold_count}, ${s.platinum_count})`).join(',\n') + `;\n\n`;

  // 4. seats
  sql += `-- 4. Seats\n`;
  sql += `DROP TABLE IF EXISTS \`seats\`;\n`;
  sql += `CREATE TABLE \`seats\` (\n  \`seat_id\` INT NOT NULL AUTO_INCREMENT,\n  \`screen_id\` INT NOT NULL,\n  \`seat_number\` INT NOT NULL,\n  \`seat_type\` VARCHAR(20) NOT NULL,\n  PRIMARY KEY (\`seat_id\`),\n  CONSTRAINT \`fk_seats_screen\` FOREIGN KEY (\`screen_id\`) REFERENCES \`screens\` (\`screen_id\`) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  sql += `INSERT INTO \`seats\` (\`seat_id\`, \`screen_id\`, \`seat_number\`, \`seat_type\`) VALUES\n`;
  sql += flattenedSeats.map(s => `(${s.seat_id}, ${s.screen_id}, ${s.seat_number}, '${s.seat_type}')`).join(',\n') + `;\n\n`;

  // 5. shows
  sql += `-- 5. Shows\n`;
  sql += `DROP TABLE IF EXISTS \`shows\`;\n`;
  sql += `CREATE TABLE \`shows\` (\n  \`show_id\` INT NOT NULL AUTO_INCREMENT,\n  \`movie_id\` INT NOT NULL,\n  \`screen_id\` INT NOT NULL,\n  \`start_time\` INT NOT NULL,\n  \`end_time\` INT NOT NULL,\n  PRIMARY KEY (\`show_id\`),\n  CONSTRAINT \`fk_shows_movie\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\` (\`movie_id\`) ON DELETE CASCADE,\n  CONSTRAINT \`fk_shows_screen\` FOREIGN KEY (\`screen_id\`) REFERENCES \`screens\` (\`screen_id\`) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (store.shows.length > 0) {
    sql += `INSERT INTO \`shows\` (\`show_id\`, \`movie_id\`, \`screen_id\`, \`start_time\`, \`end_time\`) VALUES\n`;
    sql += store.shows.map(s => `(${s.show_id}, ${s.movie_id}, ${s.screen_id}, ${s.start_time}, ${s.end_time})`).join(',\n') + `;\n\n`;
  }

  // 6. show_seats
  sql += `-- 6. Show Seats (Live status)\n`;
  sql += `DROP TABLE IF EXISTS \`show_seats\`;\n`;
  sql += `CREATE TABLE \`show_seats\` (\n  \`show_seat_id\` INT NOT NULL AUTO_INCREMENT,\n  \`show_id\` INT NOT NULL,\n  \`seat_id\` INT NOT NULL,\n  \`seat_number\` INT NOT NULL,\n  \`seat_type\` VARCHAR(20) NOT NULL,\n  \`status\` VARCHAR(20) DEFAULT 'available',\n  PRIMARY KEY (\`show_seat_id\`),\n  CONSTRAINT \`fk_show_seats_show\` FOREIGN KEY (\`show_id\`) REFERENCES \`shows\` (\`show_id\`) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (flattenedShowSeats.length > 0) {
    sql += `INSERT INTO \`show_seats\` (\`show_seat_id\`, \`show_id\`, \`seat_id\`, \`seat_number\`, \`seat_type\`, \`status\`) VALUES\n`;
    sql += flattenedShowSeats.map(s => `(${s.show_seat_id}, ${s.show_id}, ${s.seat_id}, ${s.seat_number}, '${s.seat_type}', '${s.status}')`).join(',\n') + `;\n\n`;
  }

  // 7. bookings
  sql += `-- 7. Bookings\n`;
  sql += `DROP TABLE IF EXISTS \`bookings\`;\n`;
  sql += `CREATE TABLE \`bookings\` (\n  \`booking_id\` INT NOT NULL AUTO_INCREMENT,\n  \`cust_id\` INT NOT NULL,\n  \`show_id\` INT NOT NULL,\n  \`total_amount\` INT NOT NULL,\n  \`booking_status\` TINYINT(1) DEFAULT 1,\n  \`booked_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (\`booking_id\`),\n  CONSTRAINT \`fk_bookings_cust\` FOREIGN KEY (\`cust_id\`) REFERENCES \`customers\` (\`cust_id\`) ON DELETE CASCADE,\n  CONSTRAINT \`fk_bookings_show\` FOREIGN KEY (\`show_id\`) REFERENCES \`shows\` (\`show_id\`) ON DELETE CASCADE\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (store.bookings.length > 0) {
    sql += `INSERT INTO \`bookings\` (\`booking_id\`, \`cust_id\`, \`show_id\`, \`total_amount\`, \`booking_status\`) VALUES\n`;
    sql += store.bookings.map(b => `(${b.booking_id}, ${b.cust_id}, ${b.show_id}, ${b.total_amount}, ${b.booking_status})`).join(',\n') + `;\n\n`;
  }

  // 8. booking_seats
  sql += `-- 8. Booking Seats\n`;
  sql += `DROP TABLE IF EXISTS \`booking_seats\`;\n`;
  sql += `CREATE TABLE \`booking_seats\` (\n  \`id\` INT NOT NULL AUTO_INCREMENT,\n  \`booking_id\` INT NOT NULL,\n  \`show_id\` INT NOT NULL,\n  \`seat_number\` INT NOT NULL,\n  PRIMARY KEY (\`id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (flattenedBookingSeats.length > 0) {
    sql += `INSERT INTO \`booking_seats\` (\`id\`, \`booking_id\`, \`show_id\`, \`seat_number\`) VALUES\n`;
    sql += flattenedBookingSeats.map(bs => `(${bs.id}, ${bs.booking_id}, ${bs.show_id}, ${bs.seat_number})`).join(',\n') + `;\n\n`;
  }

  // 9. payments
  sql += `-- 9. Payments\n`;
  sql += `DROP TABLE IF EXISTS \`payments\`;\n`;
  sql += `CREATE TABLE \`payments\` (\n  \`payment_id\` INT NOT NULL AUTO_INCREMENT,\n  \`booking_id\` INT NOT NULL,\n  \`amount\` INT NOT NULL,\n  \`payment_method\` VARCHAR(20) DEFAULT NULL,\n  \`paid_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (\`payment_id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n`;
  if (flattenedPayments.length > 0) {
    sql += `INSERT INTO \`payments\` (\`payment_id\`, \`booking_id\`, \`amount\`, \`payment_method\`) VALUES\n`;
    sql += flattenedPayments.map(p => `(${p.payment_id}, ${p.booking_id}, ${p.amount}, '${p.payment_method}')`).join(',\n') + `;\n\n`;
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;
  sql += `-- Snapshot generation complete.\n`;

  // Trigger browser download
  const blob = new Blob([sql], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cinema_booking_dump_${new Date().toISOString().slice(0, 10)}.sql`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  Logger.log("SYSTEM", "Database snapshot exported successfully as SQL file.");
  SQLTracker.record("EXPORT DATABASE cinema_booking TO SQL FILE;", "Database Backup / Dump");
  alert("Database SQL Dump generated and downloaded to your computer!\n\nYou can submit this .sql file or open it in any text editor to see all current tables and rows.");
}

function renderLiveLogs() {
  const container = document.getElementById("terminalLogs");
  if (!container) return;

  container.innerHTML = store.logs.slice(-50).map(entry => `
    <div class="log-line">
      <span class="log-ts">[${entry.ts.split(' ')[1]}]</span>
      <span class="log-badge-${entry.level}">[${entry.level}]</span>
      <span class="log-msg">${escapeHtml(entry.message)}</span>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

function renderLiveSQL() {
  const container = document.getElementById("sqlConsole");
  if (!container) return;

  container.innerHTML = store.sqlQueries.slice(0, 30).map(q => `
    <div class="p-3 rounded-lg bg-slate-950/80 border border-white/5 mb-2 font-mono text-xs">
      <div class="flex items-center justify-between text-[10px] text-slate-400 mb-1">
        <span class="text-amber-400 font-bold uppercase tracking-wider">${escapeHtml(q.context)}</span>
        <span>${q.time}</span>
      </div>
      <div class="text-emerald-300 font-semibold break-all leading-relaxed">${escapeHtml(q.sql)}</div>
    </div>
  `).join('');
}

function updateMutexUI(isLocked, owner) {
  const indicator = document.getElementById("mutexStatusBadge");
  if (!indicator) return;

  if (isLocked) {
    indicator.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
      <span class="text-amber-300 font-mono font-bold text-xs">LOCKED (${owner})</span>
    `;
    indicator.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/50";
  } else {
    indicator.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span class="text-emerald-300 font-mono font-bold text-xs">UNLOCKED (FREE)</span>
    `;
    indicator.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30";
  }
}

/**
 * Interactive OS Simulator: Simulates two threads attempting to book the same seat at the exact same millisecond
 */
async function runConcurrencyRaceSimulation() {
  const resultDiv = document.getElementById("raceSimulationResult");
  resultDiv.innerHTML = `
    <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 mb-3 animate-pulse">
      <i data-lucide="loader" class="w-4 h-4 animate-spin inline mr-2"></i> Spawning Thread-A (User: Ayush) and Thread-B (User: Sneha) simultaneously competing for Seat #7...
    </div>
  `;
  setupLucideIcons();

  Logger.log("LOCK", "=== INITIATING CONCURRENCY RACE CONDITION TEST ===");

  // Find a target seat number (e.g. 7 or first available)
  const targetSeat = 7;
  const currentSeats = store.showSeats[selectedShow.show_id];
  const seatObj = currentSeats.find(s => s.seat_number === targetSeat);
  if (seatObj) seatObj.status = "available"; // reset to test

  // Thread A function
  const runThreadA = async () => {
    Logger.log("INFO", "[Thread-A: Ayush] Requesting seatMutex lock...");
    await seatMutex.acquire("Thread-A: Ayush");
    Logger.log("INFO", `[Thread-A: Ayush] IN CRITICAL SECTION: Verifying Seat #${targetSeat} availability.`);
    
    // Hold mutex momentarily to simulate IO / Network latency
    await new Promise(r => setTimeout(r, 800));

    // Reserve seat
    if (seatObj && seatObj.status === "available") {
      seatObj.status = "booked";
      Logger.log("BOOKING", `[Thread-A: Ayush] SUCCESS! Reserved Seat #${targetSeat}. Writing to DB.`);
    }
    seatMutex.release();
    return "SUCCESS";
  };

  // Thread B function (launched 50ms after Thread A, competing for identical seat)
  const runThreadB = async () => {
    await new Promise(r => setTimeout(r, 50));
    Logger.log("INFO", "[Thread-B: Sneha] Requesting seatMutex lock...");
    await seatMutex.acquire("Thread-B: Sneha");
    Logger.log("INFO", `[Thread-B: Sneha] IN CRITICAL SECTION: Verifying Seat #${targetSeat} availability.`);

    // Check status
    if (seatObj && seatObj.status === "available") {
      seatObj.status = "booked";
      Logger.log("BOOKING", `[Thread-B: Sneha] Reserved Seat #${targetSeat}`);
    } else {
      Logger.log("WARN", `[Thread-B: Sneha] REJECTED! Seat #${targetSeat} was already locked and booked by Thread-A! Race condition safely avoided.`);
    }
    seatMutex.release();
    return "REJECTED_SAFELY";
  };

  // Run both concurrently
  const [resA, resB] = await Promise.all([runThreadA(), runThreadB()]);

  resultDiv.innerHTML = `
    <div class="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono space-y-2">
      <div class="text-emerald-400 font-bold flex items-center gap-1.5">
        <i data-lucide="shield-check" class="w-4 h-4"></i> Mutex Critical Section Protected State!
      </div>
      <div class="text-slate-300">
        • <strong>Thread-A (Ayush):</strong> Successfully acquired lock, validated seat #${targetSeat}, and completed booking.
      </div>
      <div class="text-amber-300">
        • <strong>Thread-B (Sneha):</strong> Safely blocked in wait queue; once unblocked, detected seat #${targetSeat} was already taken and aborted gracefully without data corruption.
      </div>
      <div class="text-[11px] text-slate-500 border-t border-white/5 pt-2">
        Zero dirty reads. Zero double-booking anomalies. POSIX Mutex invariant upheld.
      </div>
    </div>
  `;
  setupLucideIcons();
  renderSeatingLayout();
}

/**
 * Simulate SIGINT (Ctrl + C) Graceful Shutdown
 */
function simulateSigIntShutdown() {
  Logger.log("SIGNAL", "=== CAUGHT SIGINT (Signal 2: SIGINT). Shutting down gracefully... ===");
  Logger.log("SYSTEM", "Flushing active log buffer to booking.log...");
  Logger.log("SYSTEM", "Closing MySQL connection pool and releasing singleton resources.");
  alert("SIGINT (Ctrl+C) Graceful Shutdown simulated!\n\nAll logs flushed to buffer, active transactions committed, and database connection closed cleanly without memory leaks.");
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Window Onload
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
