/* 
   CMS Admin Terminal Logic
   Handles Auth, Navigation, and REST API CRUD Operations
*/

const API_BASE = 'http://127.0.0.1:8080/api';
let authToken = localStorage.getItem('admin_token');

// Global arrays to hold data for editing
let projectsData = [];
let logsData = [];
let socialLinksData = [];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Check Auth State
    if (authToken) {
        document.getElementById('auth-overlay').classList.add('hidden');
        document.getElementById('dashboard-wrapper').classList.remove('hidden');
        loadDashboardData();
    }

    // --- Authentication ---
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('login-btn');
        const err = document.getElementById('login-error');
        const pass = document.getElementById('admin-password').value;
        const btnText = btn.querySelector('.btn-text');
        
        btn.classList.add('loading');
        btnText.innerText = "AUTHENTICATING...";
        err.classList.add('hidden');

        try {
            const res = await fetch(`${API_BASE}/auth`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ password: pass })
            });
            const data = await res.json();
            
            if (res.ok && data.status === "SUCCESS") {
                localStorage.setItem('admin_token', data.token);
                authToken = data.token;
                document.getElementById('auth-overlay').classList.add('hidden');
                document.getElementById('dashboard-wrapper').classList.remove('hidden');
                loadDashboardData();
                showToast('Authentication Successful');
            } else {
                throw new Error("Invalid Passcode");
            }
        } catch (error) {
            err.classList.remove('hidden');
        } finally {
            btn.classList.remove('loading');
            btnText.innerText = "INITIALIZE LINK";
        }
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('admin_token');
        location.reload();
    });

    // --- Sidebar Navigation ---
    const navItems = document.querySelectorAll('.hud-nav .nav-item');
    const viewSections = document.querySelectorAll('.hud-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            viewSections.forEach(v => {
                if (v.id === targetId) {
                    v.classList.remove('hidden');
                } else {
                    v.classList.add('hidden');
                }
            });
        });
    });

    // --- Form Submissions: Projects ---
    const submitProject = async (e, isPublished) => {
        e.preventDefault();
        
        const id = document.getElementById('proj-id').value;
        const payload = {
            title: document.getElementById('proj-title').value,
            status: document.getElementById('proj-status').value,
            tags: document.getElementById('proj-tags').value,
            github_url: document.getElementById('proj-github').value,
            video_url: document.getElementById('proj-video').value,
            description: document.getElementById('proj-desc').value,
            is_published: isPublished
        };

        if (id) {
            await fetchAPI(`/projects/${id}`, 'PUT', payload);
            showToast('Module Updated');
        } else {
            await fetchAPI('/projects', 'POST', payload);
            showToast('Module Injected');
        }

        closeModal('modal-project');
        loadProjects();
        loadOverview();
    };

    document.getElementById('btn-proj-draft').addEventListener('click', (e) => submitProject(e, false));
    document.getElementById('btn-proj-publish').addEventListener('click', (e) => submitProject(e, true));
    document.getElementById('form-project').addEventListener('submit', (e) => submitProject(e, true)); // Default enter key to publish

    // --- Form Submissions: Logs ---
    const submitLog = async (e, isPublished) => {
        e.preventDefault();
        
        const id = document.getElementById('log-id').value;
        const payload = {
            type: document.getElementById('log-type').value,
            title: document.getElementById('log-title').value,
            organization: document.getElementById('log-org').value,
            date: document.getElementById('log-date').value,
            location: document.getElementById('log-location').value,
            description: document.getElementById('log-desc').value,
            is_published: isPublished
        };

        if (id) {
            await fetchAPI(`/logs/${id}`, 'PUT', payload);
            showToast('Log Updated');
        } else {
            await fetchAPI('/logs', 'POST', payload);
            showToast('Log Injected');
        }

        closeModal('modal-log');
        loadLogs();
        loadOverview();
    };

    document.getElementById('btn-log-draft').addEventListener('click', (e) => submitLog(e, false));
    document.getElementById('btn-log-publish').addEventListener('click', (e) => submitLog(e, true));
    document.getElementById('form-log').addEventListener('submit', (e) => submitLog(e, true));

    // --- Form Submissions: Skills ---
    document.getElementById('form-skill').addEventListener('submit', async (e) => {
        e.preventDefault();
        const skill = document.getElementById('skill-input').value;
        await fetchAPI('/skills', 'POST', { skill });
        document.getElementById('form-skill').reset();
        loadSkills();
        showToast('Skill Matrix Updated');
    });

    // --- Dynamic Config Form Submissions ---
    const handleConfigSubmit = async (e, endpoint, getPayload) => {
        e.preventDefault();
        const payload = getPayload();
        await fetchAPI(`/config/${endpoint}`, 'PUT', payload);
        showToast('Config Updated');
    };

    document.getElementById('form-identity').addEventListener('submit', (e) => handleConfigSubmit(e, 'identity', () => ({
        name: document.getElementById('ident-name').value,
        title: document.getElementById('ident-title').value,
        logo_text: document.getElementById('ident-logo').value,
        profile_image_url: document.getElementById('ident-image').value
    })));

    document.getElementById('form-hero').addEventListener('submit', (e) => handleConfigSubmit(e, 'hero', () => ({
        title: document.getElementById('hero-title').value,
        subtitle: document.getElementById('hero-subtitle').value,
        action_text: document.getElementById('hero-action').value
    })));

    document.getElementById('form-about').addEventListener('submit', (e) => handleConfigSubmit(e, 'about', () => ({
        text: document.getElementById('about-text').value,
        resume_url: document.getElementById('about-resume').value
    })));

    document.getElementById('form-contact').addEventListener('submit', (e) => handleConfigSubmit(e, 'contact', () => ({
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        location: document.getElementById('contact-location').value
    })));

    // --- Form Submissions: Social Links ---
    document.getElementById('form-social').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('social-id').value;
        const payload = {
            platform: document.getElementById('social-platform').value,
            icon: document.getElementById('social-icon').value,
            url: document.getElementById('social-url').value
        };

        if (id) {
            await fetchAPI(`/social_links/${id}`, 'PUT', payload);
            showToast('Social Link Updated');
        } else {
            await fetchAPI('/social_links', 'POST', payload);
            showToast('Social Link Added');
        }

        closeModal('modal-social');
        loadSocialLinks();
    });

});

// --- API Helpers & Data Loading ---

async function fetchAPI(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    return res.json();
}

function loadDashboardData() {
    loadOverview();
    loadProjects();
    loadLogs();
    loadSkills();
    loadConfigs();
    loadSocialLinks();
}

async function loadOverview() {
    const data = await fetchAPI('/dashboard/overview');
    document.getElementById('metric-projects').innerText = data.active_projects;
    document.getElementById('metric-logs').innerText = data.total_logs;
}

async function loadProjects() {
    projectsData = await fetchAPI('/projects');
    const tbody = document.querySelector('#projects-table tbody');
    tbody.innerHTML = '';
    
    projectsData.forEach(p => {
        const isPub = p.is_published ? '<span class="badge published">PUBLISHED</span>' : '<span class="badge draft">DRAFT</span>';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.title}</strong></td>
            <td>${isPub}</td>
            <td><span style="color: var(--neon-accent);">${p.status}</span></td>
            <td>${p.tags}</td>
            <td>
                <button class="action-btn edit" onclick="editProject('${p.id}')"><i data-lucide="edit"></i></button>
                <button class="action-btn delete" onclick="deleteItem('/projects/${p.id}', loadProjects)"><i data-lucide="trash-2"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

async function loadLogs() {
    logsData = await fetchAPI('/logs');
    const tbody = document.querySelector('#logs-table tbody');
    tbody.innerHTML = '';
    
    logsData.forEach(l => {
        const isPub = l.is_published ? '<span class="badge published">PUBLISHED</span>' : '<span class="badge draft">DRAFT</span>';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${l.type}</td>
            <td><strong>${l.title}</strong></td>
            <td>${isPub}</td>
            <td>${l.date}</td>
            <td>
                <button class="action-btn edit" onclick="editLog('${l.id}')"><i data-lucide="edit"></i></button>
                <button class="action-btn delete" onclick="deleteItem('/logs/${l.id}', loadLogs)"><i data-lucide="trash-2"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

async function loadSkills() {
    const data = await fetchAPI('/skills');
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    data.forEach(s => {
        const tag = document.createElement('div');
        tag.className = 'hud-skill-tag';
        tag.innerHTML = `
            <span>${s}</span>
            <button onclick="deleteItem('/skills/${s}', loadSkills)"><i data-lucide="x" style="width: 14px; height: 14px;"></i></button>
        `;
        container.appendChild(tag);
    });
    lucide.createIcons();
}

async function loadConfigs() {
    const ident = await fetchAPI('/config/identity');
    document.getElementById('ident-name').value = ident.name || '';
    document.getElementById('ident-title').value = ident.title || '';
    document.getElementById('ident-logo').value = ident.logo_text || '';
    document.getElementById('ident-image').value = ident.profile_image_url || '';

    const hero = await fetchAPI('/config/hero');
    document.getElementById('hero-title').value = hero.title || '';
    document.getElementById('hero-subtitle').value = hero.subtitle || '';
    document.getElementById('hero-action').value = hero.action_text || '';

    const about = await fetchAPI('/config/about');
    document.getElementById('about-text').value = about.text || '';
    document.getElementById('about-resume').value = about.resume_url || '';

    const contact = await fetchAPI('/config/contact');
    document.getElementById('contact-email').value = contact.email || '';
    document.getElementById('contact-phone').value = contact.phone || '';
    document.getElementById('contact-location').value = contact.location || '';
}

async function loadSocialLinks() {
    socialLinksData = await fetchAPI('/social_links');
    const tbody = document.querySelector('#social-table tbody');
    tbody.innerHTML = '';
    
    socialLinksData.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${s.platform}</strong></td>
            <td>${s.url}</td>
            <td><i data-lucide="${s.icon}"></i> ${s.icon}</td>
            <td>
                <button class="action-btn edit" onclick="editSocialLink('${s.id}')"><i data-lucide="edit"></i></button>
                <button class="action-btn delete" onclick="deleteItem('/social_links/${s.id}', loadSocialLinks)"><i data-lucide="trash-2"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

async function deleteItem(endpoint, reloadCallback) {
    if(confirm('WARN: Confirm deletion of record? This cannot be undone.')) {
        await fetchAPI(endpoint, 'DELETE');
        showToast('Record Purged');
        reloadCallback();
        loadOverview();
    }
}

// --- UI Helpers for Modals ---

function openProjectModal() {
    document.getElementById('form-project').reset();
    document.getElementById('proj-id').value = '';
    document.getElementById('modal-project-title').innerText = 'INITIALIZE NEW MODULE';
    document.getElementById('modal-project').classList.remove('hidden');
}

function editProject(id) {
    const p = projectsData.find(x => x.id === id);
    if (!p) return;
    document.getElementById('modal-project-title').innerText = 'EDIT MODULE ' + p.title.toUpperCase();
    document.getElementById('proj-id').value = p.id;
    document.getElementById('proj-title').value = p.title;
    document.getElementById('proj-status').value = p.status;
    document.getElementById('proj-tags').value = p.tags;
    document.getElementById('proj-github').value = p.github_url || '';
    document.getElementById('proj-video').value = p.video_url || '';
    document.getElementById('proj-desc').value = p.description;
    
    document.getElementById('modal-project').classList.remove('hidden');
}

function openLogModal() {
    document.getElementById('form-log').reset();
    document.getElementById('log-id').value = '';
    document.getElementById('modal-log-title').innerText = 'INITIALIZE NEW LOG';
    document.getElementById('modal-log').classList.remove('hidden');
}

function editLog(id) {
    const l = logsData.find(x => x.id === id);
    if (!l) return;
    document.getElementById('modal-log-title').innerText = 'EDIT LOG ' + l.title.toUpperCase();
    document.getElementById('log-id').value = l.id;
    document.getElementById('log-type').value = l.type;
    document.getElementById('log-title').value = l.title;
    document.getElementById('log-org').value = l.organization;
    document.getElementById('log-date').value = l.date;
    document.getElementById('log-location').value = l.location;
    document.getElementById('log-desc').value = l.description;
    
    document.getElementById('modal-log').classList.remove('hidden');
}

function openSocialModal() {
    document.getElementById('form-social').reset();
    document.getElementById('social-id').value = '';
    document.getElementById('modal-social-title').innerText = 'NEW SOCIAL LINK';
    document.getElementById('modal-social').classList.remove('hidden');
}

function editSocialLink(id) {
    const s = socialLinksData.find(x => x.id === id);
    if (!s) return;
    document.getElementById('modal-social-title').innerText = 'EDIT SOCIAL LINK';
    document.getElementById('social-id').value = s.id;
    document.getElementById('social-platform').value = s.platform;
    document.getElementById('social-icon').value = s.icon;
    document.getElementById('social-url').value = s.url;
    
    document.getElementById('modal-social').classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
