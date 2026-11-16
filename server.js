/**
 * ==============================================================================
 * CINEMA TICKET BOOKING SYSTEM - LIVE BACKEND SERVER (XAMPP MYSQL INTEGRATED)
 * Connects directly to MySQL in XAMPP (host: localhost:3306, user: root, db: cinema_booking)
 * Provides REST API endpoints and static file serving for the frontend.
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let mysql;
try {
  mysql = require('mysql2/promise');
} catch (e) {
  console.warn('[WARN] mysql2 module not found, fallback to standard mock mode.');
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// XAMPP MySQL Configuration (Default for XAMPP is root with empty password on port 3306)
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cinema_booking',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isDbConnected = false;

// Initialize MySQL Connection
async function initDatabase() {
  if (!mysql) return false;
  try {
    // 1. Test root connection to verify MySQL server is running
    const testConn = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      port: DB_CONFIG.port,
      connectTimeout: 2000
    });

    // Ensure database exists
    await testConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\`;`);
    await testConn.end();

    // 2. Create connection pool to cinema_booking database if not already created
    if (!pool) {
      pool = mysql.createPool(DB_CONFIG);
    }

    // Verify pool connection
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    isDbConnected = true;
    console.log(`\n✅ [MYSQL SUCCESS] Connected directly to XAMPP MySQL at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);

    // Verify tables exist; if empty, initialize schema
    const [tables] = await pool.query('SHOW TABLES');
    if (tables.length === 0) {
      console.log('🔄 [MYSQL INIT] Initializing schema from schema.sql...');
      const schemaFile = fs.existsSync(path.join(__dirname, 'schema.sql'))
        ? path.join(__dirname, 'schema.sql')
        : path.join(__dirname, 'cpp-backend', 'schema.sql');
      if (fs.existsSync(schemaFile)) {
        const sql = fs.readFileSync(schemaFile, 'utf8');
        const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
        for (const stmt of statements) {
          try { await pool.query(stmt); } catch (err) { /* ignore safe dup errors */ }
        }
        console.log('✅ [MYSQL INIT] Schema and seed data successfully initialized in XAMPP MySQL!');
      }
    }
    return true;
  } catch (err) {
    isDbConnected = false;
    return false;
  }
}

// Auto-reconnect timer: Every 3 seconds, if not connected, attempt connection
setInterval(async () => {
  if (!isDbConnected) {
    const ok = await initDatabase();
    if (ok) {
      console.log('🔄 [MYSQL AUTO-RECONNECTED] Successfully reconnected to XAMPP MySQL!');
    }
  }
}, 3000);

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper to parse JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // CORS Headers & Chrome Private Network Access support (for file:// or localhost)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // =========================================================================
  // REST API ENDPOINTS (CONNECTED DIRECTLY TO XAMPP MYSQL)
  // =========================================================================
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // 1. Health & Database Status (Auto-attempts connection if offline)
    if (pathname === '/api/status' || pathname === '/api/health') {
      if (!isDbConnected) {
        await initDatabase();
      }
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'online',
        mysql_connected: isDbConnected,
        database: DB_CONFIG.database,
        host: `${DB_CONFIG.host}:${DB_CONFIG.port}`,
        user: DB_CONFIG.user
      }));
      return;
    }

    // Force Reconnection Attempt
    if (pathname === '/api/reconnect') {
      const ok = await initDatabase();
      res.writeHead(200);
      res.end(JSON.stringify({
        success: ok,
        mysql_connected: isDbConnected,
        database: DB_CONFIG.database
      }));
      return;
    }

    // Guard: If MySQL is not connected
    if (!isDbConnected) {
      res.writeHead(503);
      res.end(JSON.stringify({
        error: 'MySQL is not connected to XAMPP.',
        mysql_connected: false,
        hint: 'Start MySQL in XAMPP Control Panel and restart server.js'
      }));
      return;
    }

    try {
      // 2. GET /api/movies - Query movies from XAMPP MySQL
      if (pathname === '/api/movies' && req.method === 'GET') {
        const [rows] = await pool.query('SELECT * FROM movies ORDER BY movie_id;');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, movies: rows }));
        return;
      }

      // 3. POST /api/movies - Insert movie into XAMPP MySQL
      if (pathname === '/api/movies' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { title, language, duration_mins, screen_id, start_time } = body;

        if (!title || !duration_mins) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Title and duration are required.' }));
          return;
        }

        // Insert Movie
        const [movieResult] = await pool.query(
          'INSERT INTO movies (title, language, duration_mins) VALUES (?, ?, ?)',
          [title, language || 'English', parseInt(duration_mins, 10)]
        );
        const newMovieId = movieResult.insertId;

        // Schedule Show if screen and start_time provided
        let newShowId = null;
        if (screen_id && start_time) {
          const sId = parseInt(screen_id, 10);
          const st = parseInt(start_time, 10);
          const et = st + Math.ceil(parseInt(duration_mins, 10) / 60);

          const [showResult] = await pool.query(
            'INSERT INTO shows (movie_id, screen_id, start_time, end_time) VALUES (?, ?, ?, ?)',
            [newMovieId, sId, st, et]
          );
          newShowId = showResult.insertId;

          // Initialize show_seats for this show from seats table
          await pool.query(
            `INSERT INTO show_seats (show_id, seat_id, seat_number, seat_type, status)
             SELECT ?, s.seat_id, s.seat_number, s.seat_type, 'available'
             FROM seats s WHERE s.screen_id = ?`,
            [newShowId, sId]
          );
        }

        console.log(`[MYSQL INSERT] Added movie "${title}" (ID: ${newMovieId}) into XAMPP MySQL!`);
        res.writeHead(201);
        res.end(JSON.stringify({
          success: true,
          message: 'Movie and show inserted into XAMPP MySQL successfully.',
          movie_id: newMovieId,
          show_id: newShowId
        }));
        return;
      }

      // 4. DELETE /api/movies - Delete movie from XAMPP MySQL
      if (pathname.startsWith('/api/movies/') && req.method === 'DELETE') {
        const movieId = parseInt(pathname.split('/')[3], 10);
        if (movieId) {
          await pool.query('DELETE FROM movies WHERE movie_id = ?', [movieId]);
          console.log(`[MYSQL DELETE] Deleted movie ID ${movieId} from XAMPP MySQL.`);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: `Movie ${movieId} deleted.` }));
          return;
        }
      }

      // 5. GET /api/shows - Query shows from XAMPP MySQL
      if (pathname === '/api/shows' && req.method === 'GET') {
        const [rows] = await pool.query(`
          SELECT s.show_id, s.movie_id, s.screen_id, s.start_time, s.end_time, m.title AS movie_title
          FROM shows s
          JOIN movies m ON s.movie_id = m.movie_id
          ORDER BY s.show_id;
        `);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, shows: rows }));
        return;
      }

      // 6. GET /api/show_seats - Query show_seats matrix from XAMPP MySQL
      if (pathname === '/api/show_seats' && req.method === 'GET') {
        const [rows] = await pool.query('SELECT * FROM show_seats ORDER BY show_id, seat_number;');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, show_seats: rows }));
        return;
      }

      // 7. GET /api/customers - Query customers from XAMPP MySQL
      if (pathname === '/api/customers' && req.method === 'GET') {
        const [rows] = await pool.query('SELECT * FROM customers ORDER BY cust_id;');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, customers: rows }));
        return;
      }

      // 8. POST /api/customers - Lookup or Register Customer in XAMPP MySQL
      if (pathname === '/api/customers' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { name, phone_no } = body;
        const phone = parseInt(phone_no, 10);

        const [existing] = await pool.query('SELECT * FROM customers WHERE phone_no = ? LIMIT 1', [phone]);
        if (existing.length > 0) {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, customer: existing[0], exists: true }));
          return;
        }

        const [insertRes] = await pool.query(
          'INSERT INTO customers (name, phone_no) VALUES (?, ?)',
          [name || `Customer_${String(phone).slice(-4)}`, phone]
        );
        const newCust = {
          cust_id: insertRes.insertId,
          name: name || `Customer_${String(phone).slice(-4)}`,
          phone_no: phone
        };
        console.log(`[MYSQL CUSTOMER] Registered new customer ${newCust.name} in XAMPP MySQL.`);
        res.writeHead(201);
        res.end(JSON.stringify({ success: true, customer: newCust, exists: false }));
        return;
      }

      // 9. GET /api/bookings - Query bookings from XAMPP MySQL
      if (pathname === '/api/bookings' && req.method === 'GET') {
        const [rows] = await pool.query(`
          SELECT b.booking_id, b.cust_id, b.show_id, b.total_amount, b.booking_status, b.booked_at,
                 c.name AS customer_name, c.phone_no AS customer_phone,
                 m.title AS movie_title, s.screen_id, s.start_time,
                 p.payment_method
          FROM bookings b
          JOIN customers c ON b.cust_id = c.cust_id
          JOIN shows s ON b.show_id = s.show_id
          JOIN movies m ON s.movie_id = m.movie_id
          LEFT JOIN payments p ON b.booking_id = p.booking_id
          ORDER BY b.booking_id DESC;
        `);

        // Attach seats to each booking
        for (const b of rows) {
          const [seatRows] = await pool.query(`
            SELECT ss.seat_number FROM booking_seats bs
            JOIN show_seats ss ON bs.show_seat_id = ss.show_seat_id
            WHERE bs.booking_id = ?
          `, [b.booking_id]);
          b.seats = seatRows.map(sr => sr.seat_number);
        }

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, bookings: rows }));
        return;
      }

      // 10. POST /api/book - ACID Transactional Booking in XAMPP MySQL
      if (pathname === '/api/book' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { cust_id, show_id, seats, total_amount, payment_method } = body;

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
          // Check availability with FOR UPDATE lock (row-level lock)
          const placeholders = seats.map(() => '?').join(',');
          const [availCheck] = await connection.query(
            `SELECT show_seat_id, seat_number, status FROM show_seats
             WHERE show_id = ? AND seat_number IN (${placeholders}) FOR UPDATE`,
            [show_id, ...seats]
          );

          const unavailable = availCheck.filter(s => s.status !== 'available');
          if (unavailable.length > 0) {
            await connection.rollback();
            connection.release();
            res.writeHead(409);
            res.end(JSON.stringify({
              error: 'Seats already booked in database.',
              unavailable_seats: unavailable.map(u => u.seat_number)
            }));
            return;
          }

          // 1. Insert into bookings
          const [bRes] = await connection.query(
            'INSERT INTO bookings (cust_id, show_id, total_amount, booking_status) VALUES (?, ?, ?, 1)',
            [cust_id, show_id, total_amount]
          );
          const newBookingId = bRes.insertId;

          // 2. Link booking_seats and update show_seats
          for (const sObj of availCheck) {
            await connection.query(
              'INSERT INTO booking_seats (booking_id, show_seat_id) VALUES (?, ?)',
              [newBookingId, sObj.show_seat_id]
            );
            await connection.query(
              "UPDATE show_seats SET status = 'booked' WHERE show_seat_id = ?",
              [sObj.show_seat_id]
            );
          }

          // 3. Insert into payments
          await connection.query(
            'INSERT INTO payments (booking_id, amount, payment_method) VALUES (?, ?, ?)',
            [newBookingId, total_amount, payment_method || 'UPI']
          );

          await connection.commit();
          connection.release();

          console.log(`[MYSQL BOOKING] Booking BK${newBookingId} committed to XAMPP MySQL!`);
          res.writeHead(201);
          res.end(JSON.stringify({
            success: true,
            booking_id: newBookingId,
            message: 'Booking saved in XAMPP MySQL.'
          }));
          return;

        } catch (txnErr) {
          await connection.rollback();
          connection.release();
          throw txnErr;
        }
      }

      // 11. POST /api/cancel - Cancel Booking in XAMPP MySQL
      if (pathname === '/api/cancel' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { booking_id } = body;
        const bId = parseInt(booking_id, 10);

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
          // 1. Mark booking cancelled
          await connection.query('UPDATE bookings SET booking_status = 0 WHERE booking_id = ?', [bId]);

          // 2. Find seats to release
          const [seatLinks] = await connection.query(`
            SELECT show_seat_id FROM booking_seats WHERE booking_id = ?
          `, [bId]);

          for (const link of seatLinks) {
            await connection.query(
              "UPDATE show_seats SET status = 'available' WHERE show_seat_id = ?",
              [link.show_seat_id]
            );
          }

          await connection.commit();
          connection.release();

          console.log(`[MYSQL CANCEL] Booking BK${bId} cancelled and seats released in XAMPP MySQL.`);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: `Booking ${bId} cancelled.` }));
          return;

        } catch (cErr) {
          await connection.rollback();
          connection.release();
          throw cErr;
        }
      }

      // 12. GET /api/database/dump - Query all 9 tables in one payload for Live Table Viewer
      if (pathname === '/api/database/dump' && req.method === 'GET') {
        const [movies] = await pool.query('SELECT * FROM movies ORDER BY movie_id;');
        const [shows] = await pool.query('SELECT * FROM shows ORDER BY show_id;');
        const [showSeats] = await pool.query('SELECT * FROM show_seats ORDER BY show_seat_id;');
        const [customers] = await pool.query('SELECT * FROM customers ORDER BY cust_id;');
        const [bookings] = await pool.query('SELECT * FROM bookings ORDER BY booking_id DESC;');
        const [bookingSeats] = await pool.query('SELECT * FROM booking_seats ORDER BY id;');
        const [payments] = await pool.query('SELECT * FROM payments ORDER BY payment_id DESC;');
        const [screens] = await pool.query('SELECT * FROM screens ORDER BY screen_id;');
        const [seats] = await pool.query('SELECT * FROM seats ORDER BY seat_id;');

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          tables: {
            movies,
            shows,
            show_seats: showSeats,
            customers,
            bookings,
            booking_seats: bookingSeats,
            payments,
            screens,
            seats
          }
        }));
        return;
      }

      res.writeHead(404);
      res.end(JSON.stringify({ error: `API endpoint ${pathname} not found.` }));
      return;

    } catch (apiErr) {
      console.error(`[API ERROR] ${req.method} ${pathname}:`, apiErr.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: apiErr.message }));
      return;
    }
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, pathname);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// Start Server and Database
server.listen(PORT, async () => {
  console.log(`\n================================================================`);
  console.log(`  🎬 PVR PACIFIC - CINEMA BOOKING AVAILABILITY MODULE`);
  console.log(`  🚀 Server is live at: http://localhost:${PORT}`);
  console.log(`================================================================`);
  await initDatabase();
});

// Process signal handling (Mirrors Main.cpp handleSigInt)
process.on('SIGINT', async () => {
  console.log('\n[SIGNAL] Caught SIGINT (Ctrl+C). Closing MySQL pool and server...');
  if (pool) {
    try { await pool.end(); } catch (e) {}
  }
  server.close(() => {
    console.log('[SYSTEM] Server terminated gracefully. Goodbye!\n');
    process.exit(0);
  });
});
