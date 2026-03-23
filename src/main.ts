import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createIcons, Server, Cloud, Network, Shield, ShieldCheck, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase, Blocks, Download } from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// --- Icon Initialization ---
createIcons({
  icons: { Server, Cloud, Network, Shield, ShieldCheck, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase, Blocks, Download }
})

// --- DOM Elements ---
let currentLang = "fr";
const bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement
const cursorGlow = document.querySelector('.cursor-glow') as HTMLElement

// --- Direct Hero Reveal (no preloader) ---
function initHeroAnimations() {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title, .hero-subtitle, .hero-cta', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
  );
  
  tl.fromTo('.floating-card',
    { y: 40, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: 'back.out(1.2)' },
    "-=0.6"
  );
}

window.addEventListener('load', () => {
  initHeroAnimations();
});

// --- Custom Glow Cursor ---
window.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power3.out' });
  }
});

// --- Dynamic Availability ---
function updateAvailability() {
  const headerAvail = document.getElementById('header-avail') as HTMLElement;
  const headerAvailText = document.getElementById('header-avail-text');
  const dot = headerAvail?.querySelector('.dot') as HTMLElement;
  
  const isAvailable = true; 
  
  if (headerAvail && headerAvailText && dot) {
    if (isAvailable) {
      headerAvailText.textContent = 'Disponible';
      headerAvail.classList.remove('busy');
      dot.classList.add('pulse');
      dot.style.background = '#10b981';
    } else {
      headerAvailText.textContent = 'En mission';
      headerAvail.classList.add('busy');
      dot.classList.remove('pulse');
      dot.style.background = '#f59e0b';
    }
  }
}
updateAvailability();

// --- Background Particles ---
function initBackgroundParticles() {
  if (!bgCanvas) return;
  const ctx = bgCanvas.getContext('2d');
  if (!ctx) return;
  
  let width = bgCanvas.width = window.innerWidth;
  let height = bgCanvas.height = window.innerHeight;
  
  const particles: any[] = [];
  const count = 50;
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1
    });
  }
  
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.fill();
      
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    });
    
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => { width = bgCanvas.width = window.innerWidth; height = bgCanvas.height = window.innerHeight; });
}
initBackgroundParticles();

// --- Content Data (Skills, Projects) ---
const skillsData = [
  {
    category: currentLang === 'fr' ? 'Systèmes & Infrastructure' : 'Systems & Infrastructure',
    icon: 'server',
    items: ['Windows Server', 'Linux (RHEL, Debian)', 'VMware vSphere', 'Active Directory, GPO', 'DNS / DHCP']
  },
  {
    category: currentLang === 'fr' ? 'Cloud & Écosystème Microsoft' : 'Cloud & Microsoft Ecosystem',
    icon: 'cloud',
    items: ['Microsoft 365', 'Azure AD (Entra ID)', 'Exchange Online', 'SharePoint', 'ADFS']
  },
  {
    category: currentLang === 'fr' ? 'Réseau' : 'Network',
    icon: 'network',
    items: ['Cisco Switches & Routeurs', 'Architecture LAN / WAN', 'Firewalls', 'VPNs']
  },
  {
    category: currentLang === 'fr' ? 'Virtualisation & Espace de travail' : 'Virtualization & Workspace',
    icon: 'terminal', 
    items: ['Citrix Virtual Apps', 'Environnements VDI', 'Publication d\'applications']
  },
  {
    category: currentLang === 'fr' ? 'Sauvegarde & Sécurité' : 'Backup & Security',
    icon: 'shield',
    items: ['Veeam Backup & Replication', 'WSUS', 'Gestion des correctifs', 'Sécurité des accès']
  },
  {
    category: currentLang === 'fr' ? 'Supervision' : 'Monitoring',
    icon: 'activity',
    items: ['Zabbix', 'Grafana', 'SNMP', 'Gestion des logs']
  },
  {
    category: currentLang === 'fr' ? 'Automatisation & DevOps' : 'Automation & DevOps',
    icon: 'terminal',
    items: ['PowerShell', 'Ansible', 'Scripting Bash', 'Git', 'Outils Internes']
  }
];

const projectsData = [
  {
    title: currentLang === 'fr' ? 'Migration vers Microsoft 365 & Exchange Online' : 'Migration to Microsoft 365 & Exchange Online',
    icon: 'cloud',
    desc: currentLang === 'fr' ? 'Modernisation des services collaboratifs et amélioration de la disponibilité.' : 'Modernization of collaborative services and availability improvement.',
    achievements: [
      'Configuration globale du tenant',
      'Synchronisation Active Directory vers Entra ID',
      'Migration fluide des boîtes aux lettres'
    ],
    tech: ['Microsoft 365', 'Exchange Online', 'Entra ID']
  },
  {
    title: currentLang === 'fr' ? 'Modernisation de l\'infrastructure de sauvegarde avec Veeam' : 'Backup infrastructure modernization with Veeam',
    icon: 'shield',
    desc: currentLang === 'fr' ? 'Amélioration de la fiabilité et des capacités de restauration de l’infrastructure.' : 'Improvement of reliability and infrastructure restore capabilities.',
    achievements: [
      'Audit de l\'existant et définition des stratégies',
      'Déploiement Veeam Backup & Replication',
      'Tests de restauration concluants'
    ],
    tech: ['Veeam Backup & Replication', 'Virtualisation', 'Plan de résilience']
  },
  {
    title: currentLang === 'fr' ? 'Plateforme de supervision Zabbix & Grafana' : 'Zabbix & Grafana monitoring platform',
    icon: 'activity',
    desc: currentLang === 'fr' ? 'Solution centralisée pour anticiper et détecter proactivement les incidents.' : 'Centralized solution to proactively anticipate and detect incidents.',
    achievements: [
      'Architecture complète de supervision',
      'Mise en place des règles et alertes',
      'Tableaux de bord sur mesure (Grafana)'
    ],
    tech: ['Zabbix', 'Grafana', 'Linux']
  }
];

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  
  skillsData.forEach(skill => {
    const el = document.createElement('div');
    el.className = 'skill-category gs-reveal-skill';
    el.innerHTML = `
      <div class="skill-header">
        <div class="skill-icon"><i data-lucide="${skill.icon}"></i></div>
        <h3>${skill.category}</h3>
      </div>
      <div class="skill-list">
        ${skill.items.map(i => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    `;
    container.appendChild(el);
  });
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  projectsData.forEach(proj => {
    const el = document.createElement('div');
    el.className = 'project-card gs-reveal-project';
    el.innerHTML = `
      <div class="project-icon-box">
        <i data-lucide="${proj.icon}"></i>
      </div>
      <div class="project-content w-full">
        <h3>${proj.title}</h3>
        <p class="project-summary">${proj.desc}</p>
        <ul class="project-achievements">
          ${proj.achievements.map(a => `<li><i data-lucide="check-circle" class="icon-accent icon-sm"></i> ${a}</li>`).join('')}
        </ul>
        <div class="project-tech">
          ${proj.tech.map(t => `<span class="tech-item">${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

// Render dynamic content
renderSkills();
renderProjects();

// Set initial hidden state for animated cards before creating ScrollTriggers
gsap.set('.skill-category', { opacity: 0, y: 50 });

// Re-init lucide icons for dynamically added elements
createIcons({
  icons: { Server, Cloud, Network, Shield, ShieldCheck, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase, Blocks, Download }
});

// --- Scroll Animations (GSAP) ---
const initScrollAnimations = () => {
  gsap.utils.toArray('.section-title').forEach((title: any) => {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      animation: gsap.from(title, { opacity: 0, x: -50, duration: 1.2, ease: 'power3.out' })
    });
  });

  gsap.utils.toArray('.gs-reveal-item').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' })
    });
  });

  gsap.utils.toArray('.gs-reveal-fast').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' })
    });
  });

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section: any) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link: any) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Skill cards via ScrollTrigger on container (already have gsap.set initial state)
  ScrollTrigger.create({
    trigger: '#skills-container',
    start: 'top 85%',
    toggleActions: 'play none none none',
    animation: gsap.to('.skill-category', { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out' })
  });

  gsap.utils.toArray('.gs-reveal-project').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' })
    });
  });
  
  ScrollTrigger.create({
    trigger: '.form-container',
    start: 'top 85%',
    animation: gsap.from('.gs-reveal-form', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out' })
  });

  // Review cards: same timing as projects, no gs-reveal-item conflict
  gsap.utils.toArray('.review-card').forEach((card: any) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none',
      animation: gsap.from(card, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' }),
      onEnter: () => {
        const stars = card.querySelectorAll('.star');
        stars.forEach((star: HTMLElement, i: number) => {
          setTimeout(() => star.classList.add('filled'), 400 + i * 180);
        });
      }
    });
  });
};

setTimeout(initScrollAnimations, 200);

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear().toString();

const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinksMenu = document.querySelector('.nav-links') as HTMLElement;

if (mobileBtn && navLinksMenu) {
  mobileBtn.addEventListener('click', () => {
    if (navLinksMenu.style.display === 'flex') {
      navLinksMenu.style.display = 'none';
    } else {
      navLinksMenu.style.display = 'flex';
      navLinksMenu.style.flexDirection = 'column';
      navLinksMenu.style.position = 'absolute';
      navLinksMenu.style.top = '100%';
      navLinksMenu.style.left = '0';
      navLinksMenu.style.width = '100%';
      navLinksMenu.style.background = 'rgba(10, 10, 12, 0.95)';
      navLinksMenu.style.padding = '20px';
      navLinksMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    }
  });
}

// --- Language Translation System ---
const langBtn = document.querySelector('.lang-btn') as HTMLElement | null;

const switchLanguage = () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    if(langBtn) langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    
    // Static HTML elements
    document.querySelectorAll<HTMLElement>('[data-en]').forEach(el => {
        if (!el.dataset.fr) el.dataset.fr = el.innerHTML;
        el.innerHTML = currentLang === 'fr' ? el.dataset.fr : el.dataset.en!;
    });

    // Placeholders
    document.querySelectorAll<HTMLElement>('[data-en-placeholder]').forEach(el => {
        if (!el.dataset.frPlaceholder) el.dataset.frPlaceholder = el.getAttribute('placeholder') || '';
        el.setAttribute('placeholder', currentLang === 'fr' ? el.dataset.frPlaceholder : el.dataset.enPlaceholder!);
    });

    // Re-render dynamic content
    const sc = document.getElementById('skills-container');
    const pc = document.getElementById('projects-container');
    if (sc) sc.innerHTML = '';
    if (pc) pc.innerHTML = '';
    renderSkills();
    renderProjects();
    
    // Re-trigger scroll triggers for dynamic content to be revealed
    ScrollTrigger.refresh();
};

if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchLanguage();
    });
}
