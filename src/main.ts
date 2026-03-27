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
    items: ['Windows Server', 'Linux', 'Exchange 2016', 'Active Directory', 'GPO', 'DNS/DHCP']
  },
  {
    category: currentLang === 'fr' ? 'Réseau & Virtualisation' : 'Network & Virtualization',
    icon: 'network',
    items: ['VMware', 'Cisco', 'Architecture LAN/WAN', 'VLAN', 'TCP/IP', 'Citrix']
  },
  {
    category: currentLang === 'fr' ? 'Automatisation & DevOps' : 'Automation & DevOps',
    icon: 'terminal',
    items: ['PowerShell', 'Ansible', 'Terraform', 'GitLab CI', 'Scripts internes']
  },
  {
    category: currentLang === 'fr' ? 'Backup & Supervision' : 'Backup & Monitoring',
    icon: 'shield',
    items: ['Veeam Backup', 'Zabbix', 'Grafana']
  },
  {
    category: currentLang === 'fr' ? 'Cloud & Microsoft 365' : 'Cloud & Microsoft 365',
    icon: 'cloud',
    items: ['Exchange Online', 'Teams', 'SharePoint', 'Azure AD (Entra)', 'GCP']
  },
  {
    category: currentLang === 'fr' ? 'Support & Process' : 'Support & Process',
    icon: 'briefcase',
    items: ['Support L2/L3', 'Documentation', 'Amélioration continue']
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
      start: 'top 75%',
      animation: gsap.from(title, { opacity: 0, x: -80, duration: 1.5, ease: 'power3.out' })
    });
  });

  gsap.utils.toArray('.gs-reveal-item').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 75%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 80, duration: 1.5, ease: 'power3.out' })
    });
  });

  ScrollTrigger.create({
    trigger: '.terminal-window',
    start: 'top 75%',
    onEnter: () => {
      const cmdEl = document.querySelector('.cmd') as HTMLElement;
      const outputEl = document.getElementById('term-output');
      if (cmdEl && outputEl && !cmdEl.classList.contains('typed')) {
        cmdEl.classList.add('typed');
        const text = cmdEl.getAttribute('data-text') || '';
        let i = 0;
        cmdEl.innerHTML = '<span class="blinking-cursor"></span>';
        const interval = setInterval(() => {
          cmdEl.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor"></span>';
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            setTimeout(() => {
              cmdEl.innerHTML = text; // remove cursor from first line
              gsap.to(outputEl, {
                height: 'auto',
                duration: 2,
                ease: 'power2.out',
                onComplete: () => ScrollTrigger.refresh()
              });
              gsap.fromTo(outputEl.querySelectorAll('p, .success-text'), 
                { opacity: 0, x: -10 }, 
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.3, ease: 'power2.out' }
              );
            }, 400);
          }
        }, 50);
      }
    }
  });

  gsap.utils.toArray('.gs-reveal-fast').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 75%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 80, duration: 1.5, ease: 'power3.out' })
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
    start: 'top 75%',
    toggleActions: 'play none none none',
    animation: gsap.to('.skill-category', { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' })
  });

  gsap.utils.toArray('.gs-reveal-project').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 75%',
      toggleActions: 'play none none none',
      animation: gsap.from(elem, { opacity: 0, y: 80, duration: 1.5, ease: 'power3.out' })
    });
  });
  
  ScrollTrigger.create({
    trigger: '.form-container',
    start: 'top 75%',
    animation: gsap.from('.gs-reveal-form', { opacity: 0, y: 80, duration: 1.8, ease: 'power3.out' })
  });
  
  // Education Timeline Custom Animation
  const eduTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.education-grid',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  eduTl.from('.education-timeline-line', { scaleY: 0, transformOrigin: 'top', opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'transform' })
       .from('.edu-card', { opacity: 0, y: 30, duration: 0.8, stagger: 0.3, ease: 'power3.out', clearProps: 'transform' }, "-=0.8");

  // Review cards: same timing as projects, no gs-reveal-item conflict
  gsap.utils.toArray('.review-card').forEach((card: any) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 75%',
      toggleActions: 'play none none none',
      animation: gsap.from(card, { opacity: 0, y: 80, duration: 1.5, ease: 'power3.out' }),
      onEnter: () => {
        const stars = card.querySelectorAll('.star');
        stars.forEach((star: HTMLElement, i: number) => {
          setTimeout(() => star.classList.add('filled'), 600 + i * 200);
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

// Magnetic Card Glow Follower
document.querySelectorAll('.magnetic-card').forEach((card: any) => {
  card.addEventListener('mousemove', (e: any) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.magnetic-glow') as HTMLElement;
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    }
  });
});

// --- Contact Form Submission & Feedback ---
const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.innerHTML;
    
    // Status tracking for UX
    submitBtn.disabled = true;
    submitBtn.innerHTML = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';

    const formData = new FormData(contactForm);
    
    try {
      // Note: Use Formspree (or replace with your preferred service like EmailJS)
      // Here we use a placeholder endpoint. You can obtain your own at formspree.io
      const response = await fetch('https://formspree.io/f/mvzvzgpg', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        submitBtn.innerHTML = currentLang === 'fr' ? 'Message envoyé ! ✅' : 'Message sent! ✅';
        submitBtn.classList.add('btn-success');
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('btn-success');
        }, 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = currentLang === 'fr' ? 'Erreur ❌ Réessayez' : 'Error ❌ Try again';
      submitBtn.classList.add('btn-error');
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-error');
      }, 3000);
    }
  });
}

