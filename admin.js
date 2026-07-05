/**
 * Transcend Astro — Admin Dashboard JavaScript
 * Authentication, Kanban board, CRUD, Drag & Drop, Search, Export
 */
(function() {
  const API_BASE = '';
  let token = sessionStorage.getItem('transcend_admin_token');
  let allLeads = [];
  let currentLeadId = null;

  // --- DOM Elements ---
  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const searchInput = document.getElementById('lead-search');
  const kanbanBoard = document.getElementById('kanban-board');
  const panelOverlay = document.getElementById('lead-panel-overlay');
  const leadPanel = document.getElementById('lead-panel');

  // --- Initialize ---
  if (token) {
    showDashboard();
    loadLeads();
  }

  // =============================================
  // AUTHENTICATION
  // =============================================
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    
    const username = document.getElementById('login-user').value;
    const password = document.getElementById('login-pass').value;

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        loginError.textContent = data.error || 'Login failed';
        return;
      }

      token = data.token;
      sessionStorage.setItem('transcend_admin_token', token);
      document.getElementById('dash-username').textContent = data.username;
      showDashboard();
      loadLeads();
    } catch (err) {
      loginError.textContent = 'Server not available. Please start the server.';
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    token = null;
    sessionStorage.removeItem('transcend_admin_token');
    dashboard.style.display = 'none';
    loginScreen.style.display = 'flex';
  });

  function showDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
  }

  // =============================================
  // API HELPERS
  // =============================================
  async function apiFetch(url, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    if (res.status === 401) {
      // Token expired
      token = null;
      sessionStorage.removeItem('transcend_admin_token');
      dashboard.style.display = 'none';
      loginScreen.style.display = 'flex';
      loginError.textContent = 'Session expired. Please login again.';
      throw new Error('Unauthorized');
    }

    return res;
  }

  // =============================================
  // LOAD & RENDER LEADS
  // =============================================
  async function loadLeads(searchQuery = '') {
    try {
      let url = '/api/leads';
      if (searchQuery) url += `?search=${encodeURIComponent(searchQuery)}`;
      
      const res = await apiFetch(url);
      allLeads = await res.json();
      renderKanban(allLeads);
      updateStats(allLeads);
    } catch (err) {
      console.error('Failed to load leads:', err);
    }
  }

  function renderKanban(leads) {
    // Clear all columns
    document.querySelectorAll('.kanban-cards').forEach(col => {
      col.innerHTML = '';
    });

    // Populate columns
    leads.forEach(lead => {
      const column = document.querySelector(`.kanban-cards[data-status="${lead.status}"]`);
      if (!column) return;

      const card = createLeadCard(lead);
      column.appendChild(card);
    });

    // Update column counts
    document.querySelectorAll('.kanban-column').forEach(col => {
      const status = col.dataset.status;
      const count = leads.filter(l => l.status === status).length;
      col.querySelector('.kc-count').textContent = count;
    });

    // Re-initialize drag & drop
    initDragAndDrop();
  }

  function createLeadCard(lead) {
    const card = document.createElement('div');
    card.classList.add('kanban-card');
    card.setAttribute('draggable', 'true');
    card.dataset.id = lead.id;

    const date = new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const priorityClass = `p-${(lead.priority || 'medium').toLowerCase()}`;

    card.innerHTML = `
      <div class="kc-name">${escapeHtml(lead.name || 'Unknown')}</div>
      <div class="kc-email">${escapeHtml(lead.email || '—')}</div>
      <div class="kc-meta">
        <span class="kc-date">${date}</span>
        <span class="kc-priority ${priorityClass}">${lead.priority || 'Medium'}</span>
      </div>
    `;

    card.addEventListener('click', () => openLeadPanel(lead.id));
    return card;
  }

  function updateStats(leads) {
    document.getElementById('stat-total').textContent = leads.length;
    document.getElementById('stat-new').textContent = leads.filter(l => l.status === 'New Lead').length;
    document.getElementById('stat-contacted').textContent = leads.filter(l => l.status === 'Contacted').length;
    document.getElementById('stat-converted').textContent = leads.filter(l => l.status === 'Converted').length;
  }

  // =============================================
  // DRAG & DROP
  // =============================================
  function initDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        columns.forEach(col => col.classList.remove('drag-over'));
      });
    });

    columns.forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        col.classList.add('drag-over');
      });

      col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
      });

      col.addEventListener('drop', async (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        
        const leadId = e.dataTransfer.getData('text/plain');
        const newStatus = col.dataset.status;

        try {
          await apiFetch(`/api/leads/${leadId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
          });
          await loadLeads(searchInput.value);
        } catch (err) {
          console.error('Failed to update lead status:', err);
        }
      });
    });
  }

  // =============================================
  // LEAD DETAIL PANEL
  // =============================================
  async function openLeadPanel(id) {
    currentLeadId = id;
    
    try {
      const res = await apiFetch(`/api/leads/${id}`);
      const lead = await res.json();

      document.getElementById('lp-name').textContent = lead.name || 'Unknown';
      document.getElementById('lp-email').textContent = lead.email || '—';
      document.getElementById('lp-phone').textContent = lead.phone || '—';
      document.getElementById('lp-city').textContent = lead.city || '—';
      document.getElementById('lp-source').textContent = lead.source || '—';
      document.getElementById('lp-date').textContent = new Date(lead.created_at).toLocaleString('en-IN');
      document.getElementById('lp-property').textContent = lead.property_type || '—';
      document.getElementById('lp-package').textContent = lead.package || '—';
      document.getElementById('lp-message').textContent = lead.message || '—';
      document.getElementById('lp-status').value = lead.status || 'New Lead';
      document.getElementById('lp-priority').value = lead.priority || 'Medium';
      document.getElementById('lp-notes').value = lead.notes || '';

      // Set action links
      document.getElementById('lp-email-btn').href = lead.email ? `mailto:${lead.email}` : '#';
      document.getElementById('lp-wa-btn').href = lead.phone ? `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}` : '#';
      document.getElementById('lp-call-btn').href = lead.phone ? `tel:${lead.phone}` : '#';

      // Render timeline
      const timeline = document.getElementById('lp-timeline');
      timeline.innerHTML = '';
      if (lead.activities && lead.activities.length > 0) {
        lead.activities.forEach(activity => {
          const item = document.createElement('div');
          item.className = 'timeline-item';
          item.innerHTML = `
            <div class="ti-content">
              <div class="ti-desc">${escapeHtml(activity.description)}</div>
              <div class="ti-time">${new Date(activity.created_at).toLocaleString('en-IN')}</div>
            </div>
          `;
          timeline.appendChild(item);
        });
      } else {
        timeline.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem;">No activity yet.</p>';
      }

      // Show panel
      panelOverlay.classList.add('active');
      leadPanel.classList.add('active');
    } catch (err) {
      console.error('Failed to load lead:', err);
    }
  }

  function closePanel() {
    panelOverlay.classList.remove('active');
    leadPanel.classList.remove('active');
    currentLeadId = null;
  }

  document.getElementById('lp-close').addEventListener('click', closePanel);
  panelOverlay.addEventListener('click', closePanel);

  // Save status & priority
  document.getElementById('lp-save').addEventListener('click', async () => {
    if (!currentLeadId) return;
    const status = document.getElementById('lp-status').value;
    const priority = document.getElementById('lp-priority').value;

    try {
      await apiFetch(`/api/leads/${currentLeadId}`, {
        method: 'PUT',
        body: JSON.stringify({ status, priority })
      });
      await loadLeads(searchInput.value);
      closePanel();
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  });

  // Save notes
  document.getElementById('lp-save-notes').addEventListener('click', async () => {
    if (!currentLeadId) return;
    const notes = document.getElementById('lp-notes').value;

    try {
      await apiFetch(`/api/leads/${currentLeadId}`, {
        method: 'PUT',
        body: JSON.stringify({ notes })
      });
      // Refresh panel
      openLeadPanel(currentLeadId);
    } catch (err) {
      console.error('Failed to save notes:', err);
    }
  });

  // Delete lead
  document.getElementById('lp-delete').addEventListener('click', async () => {
    if (!currentLeadId) return;
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;

    try {
      await apiFetch(`/api/leads/${currentLeadId}`, { method: 'DELETE' });
      closePanel();
      await loadLeads(searchInput.value);
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  });

  // =============================================
  // SEARCH
  // =============================================
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      loadLeads(searchInput.value);
    }, 300);
  });

  // =============================================
  // EXPORT CSV
  // =============================================
  document.getElementById('export-csv-btn').addEventListener('click', async () => {
    try {
      const res = await apiFetch('/api/leads/export/csv');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcend_leads_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
  });

  // Refresh button
  document.getElementById('refresh-btn').addEventListener('click', () => {
    loadLeads(searchInput.value);
  });

  // =============================================
  // UTILITIES
  // =============================================
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

})();
