/**
 * Transcend Astro — SQLite Database Module
 * Handles all database operations for lead management
 */
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'transcend_leads.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL');

// --- Schema Creation ---
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    city TEXT,
    property_type TEXT,
    package TEXT,
    preferred_date TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'New Lead',
    priority TEXT DEFAULT 'Medium',
    notes TEXT DEFAULT '',
    assigned_to TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS lead_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// --- Seed default admin user if none exists ---
function seedAdmin(username, password) {
  const existing = db.prepare('SELECT id FROM admin_users WHERE username = ?').get(username);
  if (!existing) {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(username, hash);
    console.log(`[DB] Admin user '${username}' created.`);
  }
}

// --- Lead CRUD Operations ---
const createLead = db.prepare(`
  INSERT INTO leads (name, email, phone, city, property_type, package, preferred_date, message, source)
  VALUES (@name, @email, @phone, @city, @property_type, @package, @preferred_date, @message, @source)
`);

const getAllLeads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC');

const getLeadById = db.prepare('SELECT * FROM leads WHERE id = ?');

const updateLead = db.prepare(`
  UPDATE leads SET
    name = COALESCE(@name, name),
    email = COALESCE(@email, email),
    phone = COALESCE(@phone, phone),
    city = COALESCE(@city, city),
    property_type = COALESCE(@property_type, property_type),
    package = COALESCE(@package, package),
    status = COALESCE(@status, status),
    priority = COALESCE(@priority, priority),
    notes = COALESCE(@notes, notes),
    assigned_to = COALESCE(@assigned_to, assigned_to),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = @id
`);

const deleteLead = db.prepare('DELETE FROM leads WHERE id = ?');

const searchLeads = (query) => {
  const searchTerm = `%${query}%`;
  return db.prepare(`
    SELECT * FROM leads 
    WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR city LIKE ? OR status LIKE ? OR notes LIKE ?
    ORDER BY created_at DESC
  `).all(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
};

const filterLeads = (filters) => {
  let sql = 'SELECT * FROM leads WHERE 1=1';
  const params = [];
  
  if (filters.status) { sql += ' AND status = ?'; params.push(filters.status); }
  if (filters.priority) { sql += ' AND priority = ?'; params.push(filters.priority); }
  if (filters.source) { sql += ' AND source = ?'; params.push(filters.source); }
  if (filters.date_from) { sql += ' AND created_at >= ?'; params.push(filters.date_from); }
  if (filters.date_to) { sql += ' AND created_at <= ?'; params.push(filters.date_to); }
  
  sql += ' ORDER BY created_at DESC';
  return db.prepare(sql).all(...params);
};

// --- Activity Log ---
const addActivity = db.prepare(`
  INSERT INTO lead_activities (lead_id, type, description)
  VALUES (?, ?, ?)
`);

const getActivities = db.prepare(`
  SELECT * FROM lead_activities WHERE lead_id = ? ORDER BY created_at DESC
`);

// --- Admin Authentication ---
const getAdminByUsername = db.prepare('SELECT * FROM admin_users WHERE username = ?');

module.exports = {
  db,
  seedAdmin,
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  searchLeads,
  filterLeads,
  addActivity,
  getActivities,
  getAdminByUsername
};
