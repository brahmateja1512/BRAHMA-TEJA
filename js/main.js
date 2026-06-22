/*
   SYS_VER 5.0.0
   Main Frontend Logic - Dynamic Data & GSAP Motion
*/

const API_BASE = 'http://127.0.0.1:8080/api';

document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    initCursor();
    initCanvas();

    try {
        await loadAllData();
        initGSAP();
    } catch (e) {
        console.error("SYS.ERR: Data fetch failed.", e);
        document.getElementById('dyn-hero-title').innerText = "SYSTEM FAILURE";
    } finally {
        setTimeout(() => {
            document.getElementById('preloader').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('preloader').style.display = 'none';
                document.body.classList.remove('loading');
            }, 500);
        }, 1000);
    }
});

async function fetchAPI(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${endpoint}`);
    return res.json();
}

async function loadAllData() {
    const [ident, hero, about, contact, socials, skills, projects, logs] = await Promise.all([
        fetchAPI('/config/identity'),
        fetchAPI('/config/hero'),
        fetchAPI('/config/about'),
        fetchAPI('/config/contact'),
        fetchAPI('/social_links'),
        fetchAPI('/skills'),
        fetchAPI('/projects?is_published=true'),
        fetchAPI('/logs?is_published=true')
    ]);

    // Populate Identity
    document.getElementById('dyn-nav-brand').innerText = ident.logo_text || "SYS.BOOT";
    document.getElementById('dyn-ident-name').innerText = ident.name || "UNREGISTERED USER";
    document.getElementById('dyn-ident-title').innerText = ident.title || "NO TITLE";
    document.getElementById('dyn-footer-name').innerText = ident.name || "";
    document.getElementById('dyn-page-title').innerText = `${ident.name || 'System'} | ${ident.title || 'Online'}`;
    
    if (ident.profile_image_url) {
        const img = document.getElementById('dyn-profile-img');
        img.src = ident.profile_image_url;
        img.classList.remove('hidden');
    }

    // Populate Hero
    document.getElementById('dyn-hero-title').innerText = hero.title || "INITIALIZE.";
    // Subtitle will be typed by GSAP
    document.getElementById('dyn-hero-subtitle').setAttribute('data-text', hero.subtitle || "Awaiting commands.");
    document.getElementById('dyn-hero-action').innerText = hero.action_text || "PROCEED";

    // Populate About
    document.getElementById('dyn-about-text').innerText = about.text || "No data.";
    if (about.resume_url) {
        const resumeBtn = document.getElementById('dyn-resume-link');
        resumeBtn.href = about.resume_url;
        resumeBtn.style.display = 'inline-flex';
    } else {
        document.getElementById('dyn-resume-link').style.display = 'none';
    }

    // Populate Contact
    document.getElementById('dyn-contact-email').href = `mailto:${contact.email}`;
    document.getElementById('dyn-contact-phone').href = `tel:${contact.phone}`;
    document.getElementById('dyn-contact-location').innerText = `LOC: ${contact.location}`;

    // Populate Socials
    const socialContainer = document.getElementById('dyn-social-links');
    socials.forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.target = "_blank";
        a.className = "contact-link";
        a.innerHTML = `<i data-lucide="${s.icon}"></i> ${s.platform.toUpperCase()}`;
        socialContainer.appendChild(a);
    });

    // Populate Skills Ticker
    const ticker = document.getElementById('dynamic-skills-ticker');
    ticker.innerHTML = '';
    if(skills.length > 0) {
        skills.forEach(s => {
            const span = document.createElement('div');
            span.className = 'ticker-item';
            span.innerText = s.toUpperCase();
            ticker.appendChild(span);
        });
        // Duplicate for infinite scroll
        ticker.innerHTML += ticker.innerHTML;
    } else {
        ticker.parentElement.style.display = 'none';
    }

    // Populate Projects
    const projContainer = document.getElementById('cms-projects');
    projContainer.innerHTML = '';
    if(projects.length === 0) {
        projContainer.innerHTML = '<p class="mono text-muted">NO MODULES FOUND.</p>';
    }
    projects.forEach(p => {
        const tagsHtml = p.tags ? p.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('') : '';
        const linksHtml = `
            ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="project-link"><i data-lucide="github"></i> SOURCE</a>` : ''}
            ${p.video_url ? `<a href="${p.video_url}" target="_blank" class="project-link"><i data-lucide="external-link"></i> DEMO</a>` : ''}
        `;
        projContainer.innerHTML += `
            <div class="project-card gs-reveal-up">
                <span class="project-status">STATUS: ${p.status ? p.status.toUpperCase() : 'UNKNOWN'}</span>
                <h3 class="project-title mono">${p.title}</h3>
                <div class="project-tags">${tagsHtml}</div>
                <p class="project-desc">${p.description}</p>
                <div class="project-links mono">${linksHtml}</div>
            </div>
        `;
    });

    // Populate Logs
    const expContainer = document.getElementById('cms-experience');
    const eduContainer = document.getElementById('cms-education');
    expContainer.innerHTML = ''; eduContainer.innerHTML = '';

    logs.forEach(l => {
        const logHtml = `
            <div class="timeline-item gs-reveal-left">
                <span class="log-date">${l.date} // ${l.location ? l.location.toUpperCase() : ''}</span>
                <h4 class="log-title">${l.title}</h4>
                <div class="log-org">${l.organization}</div>
                <p class="log-desc">${l.description}</p>
            </div>
        `;
        if (l.type === 'Experience') {
            expContainer.innerHTML += logHtml;
        } else {
            eduContainer.innerHTML += logHtml;
        }
    });

    if(expContainer.innerHTML === '') expContainer.innerHTML = '<p class="mono text-muted">NO RECORDS.</p>';
    if(eduContainer.innerHTML === '') eduContainer.innerHTML = '<p class="mono text-muted">NO RECORDS.</p>';

    lucide.createIcons();
}

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Typing effect for subtitle
    const subtitle = document.getElementById('dyn-hero-subtitle');
    const text = subtitle.getAttribute('data-text');
    if (text) {
        gsap.to(subtitle, {
            duration: 2,
            text: text,
            ease: "none",
            delay: 1.5
        });
    }

    // Scroll reveals
    gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.fromTo(elem, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: elem, start: "top 85%" }
        });
    });

    gsap.utils.toArray('.gs-reveal-left').forEach(elem => {
        gsap.fromTo(elem, { x: -50, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: elem, start: "top 85%" }
        });
    });

    gsap.utils.toArray('.gs-reveal-right').forEach(elem => {
        gsap.fromTo(elem, { x: 50, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: elem, start: "top 85%" }
        });
    });

    // Ticker animation
    const ticker = document.querySelector('.ticker-track');
    if (ticker && ticker.innerHTML.trim() !== '') {
        gsap.to(ticker, {
            x: "-50%",
            duration: 20,
            ease: "none",
            repeat: -1
        });
    }
}

function initCursor() {
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));
}

function initCanvas() {
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}
