/**
 * Transcend Astro — Express Server
 * Serves static files + API routes for lead management, authentication, and email automation
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const {
  seedAdmin, createLead, getAllLeads, getLeadById,
  updateLead, deleteLead, searchLeads, filterLeads,
  addActivity, getActivities, getAdminByUsername
} = require('./db');
const { sendThankYouEmail } = require('./email-service');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'transcend-astro-secret-key-2026';

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static File Serving ---
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// --- Seed Admin User ---
const adminUser = process.env.ADMIN_USER || 'admin';
const adminPass = process.env.ADMIN_PASS || 'TranscendAdmin2026';
seedAdmin(adminUser, adminPass);

// --- JWT Auth Middleware ---
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized — Invalid token' });
  }
}

// =============================================
// AUTH ROUTES
// =============================================

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = getAdminByUsername.get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, username: admin.username });
});

// =============================================
// LEAD ROUTES (Public)
// =============================================

// Create lead from contact form
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, city, property_type, package: pkg, preferred_date, message } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = createLead.run({
      name: name || '',
      email: email || '',
      phone: phone || '',
      city: city || '',
      property_type: property_type || '',
      package: pkg || '',
      preferred_date: preferred_date || '',
      message: message || '',
      source: 'contact_form'
    });

    // Log activity
    addActivity.run(result.lastInsertRowid, 'lead_created', `New lead from contact form: ${name}`);

    // Send thank you email (async, don't block response)
    sendThankYouEmail({ name, email }).catch(err => {
      console.error('[Server] Email send error:', err);
    });

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Lead created successfully'
    });
  } catch (error) {
    console.error('[Server] Create lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create lead from onboarding form
app.post('/api/leads/onboarding', async (req, res) => {
  try {
    const data = req.body;
    
    const result = createLead.run({
      name: data.name || '',
      email: data.email || '',
      phone: data.mobile || '',
      city: data.city || '',
      property_type: data.property_type || '',
      package: '',
      preferred_date: '',
      message: `DOB: ${data.dob || 'N/A'}, TOB: ${data.tob || 'N/A'}, POB: ${data.pob || 'N/A'}. Floors: ${data.floors || 'N/A'}. Status: ${data.home_status || 'N/A'}. Notes: ${data.notes || ''}`,
      source: 'onboarding_form'
    });

    addActivity.run(result.lastInsertRowid, 'lead_created', `New lead from onboarding form: ${data.name}`);

    sendThankYouEmail({ name: data.name, email: data.email }).catch(err => {
      console.error('[Server] Email send error:', err);
    });

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Onboarding lead created successfully'
    });
  } catch (error) {
    console.error('[Server] Onboarding lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================
// LEAD ROUTES (Admin - Protected)
// =============================================

// Get all leads
app.get('/api/leads', authMiddleware, (req, res) => {
  try {
    const { search, status, priority, source, date_from, date_to } = req.query;
    
    let leads;
    if (search) {
      leads = searchLeads(search);
    } else if (status || priority || source || date_from || date_to) {
      leads = filterLeads({ status, priority, source, date_from, date_to });
    } else {
      leads = getAllLeads.all();
    }
    
    res.json(leads);
  } catch (error) {
    console.error('[Server] Get leads error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single lead with activities
app.get('/api/leads/:id', authMiddleware, (req, res) => {
  try {
    const lead = getLeadById.get(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    const activities = getActivities.all(req.params.id);
    res.json({ ...lead, activities });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update lead
app.put('/api/leads/:id', authMiddleware, (req, res) => {
  try {
    const lead = getLeadById.get(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    const data = { ...req.body, id: parseInt(req.params.id) };
    updateLead.run(data);

    // Log status change
    if (req.body.status && req.body.status !== lead.status) {
      addActivity.run(req.params.id, 'status_change', `Status changed from "${lead.status}" to "${req.body.status}"`);
    }
    if (req.body.notes && req.body.notes !== lead.notes) {
      addActivity.run(req.params.id, 'note_added', `Notes updated`);
    }

    res.json({ success: true, message: 'Lead updated' });
  } catch (error) {
    console.error('[Server] Update lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete lead
app.delete('/api/leads/:id', authMiddleware, (req, res) => {
  try {
    const lead = getLeadById.get(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    deleteLead.run(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add activity to lead
app.post('/api/leads/:id/activities', authMiddleware, (req, res) => {
  try {
    const { type, description } = req.body;
    if (!type || !description) {
      return res.status(400).json({ error: 'Type and description are required' });
    }

    addActivity.run(req.params.id, type, description);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export leads as CSV
app.get('/api/leads/export/csv', authMiddleware, (req, res) => {
  try {
    const leads = getAllLeads.all();
    
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Property Type', 'Package', 'Preferred Date', 'Source', 'Status', 'Priority', 'Notes', 'Created At'];
    const csvRows = [headers.join(',')];
    
    leads.forEach(lead => {
      const row = [
        lead.id,
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.city || '').replace(/"/g, '""')}"`,
        `"${(lead.property_type || '').replace(/"/g, '""')}"`,
        `"${(lead.package || '').replace(/"/g, '""')}"`,
        `"${(lead.preferred_date || '').replace(/"/g, '""')}"`,
        `"${(lead.source || '').replace(/"/g, '""')}"`,
        `"${(lead.status || '').replace(/"/g, '""')}"`,
        `"${(lead.priority || '').replace(/"/g, '""')}"`,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        `"${(lead.created_at || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=transcend_leads_${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// =============================================
// START SERVER
// =============================================

app.listen(PORT, () => {
  console.log(`\n  ✦ Transcend Astro Server running on http://localhost:${PORT}`);
  console.log(`  ✦ Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`  ✦ API docs: POST /api/leads, GET /api/leads (auth)\n`);
});
