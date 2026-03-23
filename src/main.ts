import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createIcons, Server, Cloud, Network, Shield, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase } from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// --- Icon Initialization ---
createIcons({
  icons: { Server, Cloud, Network, Shield, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase }
})

// --- DOM Elements ---
const preloader = document.getElementById('preloader')
const progressBar = document.querySelector('.progress-bar') as HTMLElement
const bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement
const cursorGlow = document.querySelector('.cursor-glow') as HTMLElement

// --- Preloader & Initial Reveal ---
window.addEventListener('load', () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 1.2,
          onComplete: () => {
            if (preloader) preloader.style.display = 'none';
            initHeroAnimations();
          }
        });
      }, 500);
    }
  }, 100);
});

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
    category: 'Systèmes & Infrastructure',
    icon: 'server',
    items: ['Windows Server', 'Linux (RHEL, Debian)', 'VMware vSphere', 'Active Directory, GPO', 'DNS / DHCP']
  },
  {
    category: 'Cloud & Écosystème Microsoft',
    icon: 'cloud',
    items: ['Microsoft 365', 'Azure AD (Entra ID)', 'Exchange Online', 'SharePoint', 'ADFS']
  },
  {
    category: 'Réseau',
    icon: 'network',
    items: ['Cisco Switches & Routeurs', 'Architecture LAN / WAN', 'Firewalls', 'VPNs']
  },
  {
    category: 'Virtualisation & Espace de travail',
    icon: 'terminal', 
    items: ['Citrix Virtual Apps', 'Environnements VDI', 'Publication d\'applications']
  },
  {
    category: 'Sauvegarde & Sécurité',
    icon: 'shield',
    items: ['Veeam Backup & Replication', 'WSUS', 'Gestion des correctifs', 'Sécurité des accès']
  },
  {
    category: 'Supervision',
    icon: 'activity',
    items: ['Zabbix', 'Grafana', 'SNMP', 'Gestion des logs']
  },
  {
    category: 'Automatisation & DevOps',
    icon: 'terminal',
    items: ['PowerShell', 'Ansible', 'Scripting Bash', 'Git', 'Outils Internes']
  }
];

const projectsData = [
  {
    title: 'Mise en place d’un tenant Microsoft 365 et migration de la messagerie vers Exchange Online',
    desc: 'Conception et réalisation de la migration de l’infrastructure de messagerie vers Microsoft 365 afin de moderniser les services collaboratifs et améliorer leur disponibilité. Dans le cadre de la modernisation du système d’information, j’ai participé à la mise en place d’un tenant Microsoft 365 et à la migration de l’environnement de messagerie vers Exchange Online. La mission a consisté à préparer l’environnement cible, notamment par la configuration du tenant, la synchronisation des identités avec l’annuaire Active Directory et la préparation des services associés. J’ai ensuite planifié et réalisé la migration des boîtes aux lettres vers Exchange Online en veillant à limiter l’impact pour les utilisateurs. La mission comprenait également l’accompagnement des utilisateurs et la documentation des procédures afin de garantir une adoption fluide des nouveaux outils.',
    tech: ['Microsoft 365', 'Exchange Online', 'Entra ID']
  },
  {
    title: 'Migration et modernisation de l’infrastructure de sauvegarde vers Veeam',
    desc: 'Pilotage du remplacement de la solution de sauvegarde existante par Veeam afin d’améliorer la fiabilité, la supervision et les capacités de restauration de l’infrastructure. Dans un contexte d’amélioration de la résilience du système d’information, j’ai été chargé de piloter le projet de remplacement de la solution de sauvegarde historique par Veeam Backup & Replication. La mission a débuté par une phase d’analyse de l’existant afin d’identifier les volumes de données à protéger. J’ai assuré la mise en œuvre de la solution Veeam, incluant la configuration des jobs de sauvegarde, la définition des stratégies de rétention et l’intégration avec l’environnement de virtualisation. Des tests de restauration ont également été réalisés afin de valider la fiabilité des sauvegardes.',
    tech: ['Veeam Backup & Replication', 'Virtualisation', 'Plan de résilience']
  },
  {
    title: 'Déploiement d’une plateforme de supervision et d’alerte basée sur Zabbix et Grafana',
    desc: 'Conception et déploiement d’une solution de supervision centralisée pour améliorer la visibilité sur l’état du système d’information et anticiper les incidents. J’ai piloté la mise en place d’une solution de monitoring basée sur Zabbix pour la collecte des métriques et Grafana pour la visualisation et la création de tableaux de bord. J’ai conçu l’architecture de la plateforme de supervision et défini les indicateurs clés à surveiller. J’ai ensuite réalisé l’installation, le déploiement des agents sur les serveurs et la mise en place des règles d’alerte afin de détecter rapidement les anomalies. Cette solution a permis d’améliorer significativement la détection proactive des incidents et d’apporter une meilleure visibilité sur la performance des services.',
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
      <div class="project-content w-full">
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <div class="project-tech">
          ${proj.tech.map(t => `<span class="tech-item"><i data-lucide="check-circle" class="icon-accent icon-sm"></i> ${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

// Render dynamic content
renderSkills();
renderProjects();

// Re-init lucide icons for dynamically added elements
createIcons({
  icons: { Server, Cloud, Network, Shield, Database, Activity, Terminal, Phone, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, CheckCircle, Menu, Send, Briefcase }
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
      animation: gsap.from(elem, { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out' })
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

  gsap.utils.toArray('.gs-reveal-skill').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 90%',
      animation: gsap.from(elem, { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out' })
    });
  });

  gsap.utils.toArray('.gs-reveal-project').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 85%',
      animation: gsap.from(elem, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' })
    });
  });
  
  ScrollTrigger.create({
    trigger: '.form-container',
    start: 'top 85%',
    animation: gsap.from('.gs-reveal-form', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out' })
  });
};

setTimeout(initScrollAnimations, 200);

// --- Navbar Scroll Logic ---
const navbar = document.querySelector('.navbar') as HTMLElement;
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 0';
    navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
  } else {
    navbar.style.padding = '0';
    navbar.style.boxShadow = 'none';
  }
});

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
