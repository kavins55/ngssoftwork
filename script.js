

// ── NAV SCROLL & HAMBURGER ─────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.remove('open');
}));

// ── SCROLL REVEAL (ADVANCED STAGGER) ───────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add delay for staggering items inside grids
document.querySelectorAll('.services-grid, .port-grid, .trust-grid, .values-grid, .tier-explain-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, index) => {
    child.style.transitionDelay = `${index * 80}ms`;
  });
});

document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));

// ── NUMBER COUNTER ─────────────────────────────
function animCount(el, target) {
  let v = 0, step = target / 60;
  const t = setInterval(() => {
    v += step;
    if (v >= target) { v = target; clearInterval(t); }
    el.textContent = Math.floor(v) + '+';
  }, 20);
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => animCount(el, +el.dataset.count));
      co.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
const st = document.querySelector('.stats-grid');
if (st) co.observe(st);

// ── CONTACT FORM SUBMIT ────────────────────────
const form = document.getElementById('contactForm');
const subBtn = document.getElementById('submitBtn');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    subBtn.innerHTML = 'Sending...';
    subBtn.disabled = true;
    setTimeout(() => {
      subBtn.innerHTML = 'Message Sent Successfully!';
      subBtn.style.background = '#00e5ff';
      subBtn.style.color = '#000';
      form.reset();
      setTimeout(() => {
        subBtn.innerHTML = 'Send Inquiry';
        subBtn.style.background = '';
        subBtn.style.color = '';
        subBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ── HERO BACKGROUND SLIDESHOW & DYNAMIC TEXT ───
const slides = document.querySelectorAll('.hero-slide');
const heroH1 = document.querySelector('.hero-h1');
const heroP = document.querySelector('.hero-p');
let currentSlide = 0;
const slideInterval = 6000; // Change image every 6 seconds (6 SEC HOLD)

const slideshowData = [
  {
    h1: 'SOFTWARE <span class="text-grad grad-blue">SOLUTIONS</span>',
    p: 'Modern websites, apps, automation tools, and smart digital services for your needs.'
  },
  {
    h1: 'CIVIL & <span class="text-grad grad-green">BIM SERVICES</span>',
    p: 'Professional CAD drafting, BIM modeling, structural layouts, and engineering design solutions.'
  },
  {
    h1: '3D MODELING & <span class="text-grad grad-green">RENDERING</span>',
    p: 'High-quality 3D architectural modeling, interior & exterior renders, and photorealistic design visualizations.'
  },
  {
    h1: 'CONSTRUCTION & <span class="text-grad grad-green">PLANNING</span>',
    p: 'Accurate architectural drafting, structural analysis, and professional construction blueprints.'
  },
  {
    h1: 'ARCHITECTURAL <span class="text-grad grad-green">DRAFTING</span>',
    p: 'Detailed 2D technical drawings, blueprint designs, elevations, and CAD drafting layouts.'
  },
  {
    h1: 'VIDEO & <span class="text-grad grad-purple">MEDIA EDITING</span>',
    p: 'Creative video editing, motion graphics, reels, and professional digital media production.'
  },
  {
    h1: 'LOGO & <span class="text-grad grad-orange">BRANDING</span>',
    p: 'Modern logo design, visual branding, and creative identity solutions for startups and businesses.'
  },
  {
    h1: 'NGS <span class="text-grad grad-gold">SOFT WORKS</span>',
    p: 'Simple solutions powered by technology, engineering, and creativity.'
  }
];


function nextSlide() {
  if (slides.length === 0) return;
  
  // Transition background slides
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
  
  const data = slideshowData[currentSlide];
  if (!data) return;
  
  // Transition hero H1 smoothly
  if (heroH1) {
    heroH1.style.opacity = '0';
    heroH1.style.transform = 'translateY(-10px)';
    heroH1.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      heroH1.innerHTML = data.h1;
      
      // Dynamic line height / layout adjustment
      if (currentSlide === 0) {
        heroH1.style.lineHeight = '1.2';
      } else {
        heroH1.style.lineHeight = '1.1';
      }
      
      heroH1.style.opacity = '1';
      heroH1.style.transform = 'translateY(0)';
    }, 600);
  }
  
  // Transition hero paragraph smoothly
  if (heroP) {
    heroP.style.opacity = '0';
    heroP.style.transform = 'translateY(10px)';
    heroP.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      heroP.textContent = data.p;
      
      // Keep styling consistent for all standard paragraphs
      heroP.style.fontSize = '1.1rem';
      heroP.style.fontWeight = '300';
      heroP.style.color = 'var(--text-muted)';
      heroP.style.letterSpacing = 'normal';
      
      heroP.style.opacity = '1';
      heroP.style.transform = 'translateY(0)';
    }, 600);
  }
}

if (slides.length > 0) {
  setInterval(nextSlide, slideInterval);
}

// ── PRELOADER LOGIC ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  
  // Disable body scroll initially
  document.body.classList.add('loading');
  
  // Wait for the progress animation, then fade out
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('loaded');
    }
    document.body.classList.remove('loading');
  }, 2600); // Matches the 2.5s progress bar animation duration
});

// ── PREMIUM BOOKING MODAL INTERACTION ─────────────
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookingModal');
  const modalTitle = document.getElementById('bookingModalTitle');
  const serviceInput = document.getElementById('bookingServiceInput');
  const form = document.getElementById('bookingModalForm');
  const successState = document.getElementById('bookingSuccessState');
  const triggers = document.querySelectorAll('.booking-modal-trigger');
  const closeBtn = document.getElementById('closeBookingModal');
  const successCloseBtn = document.getElementById('bookingSuccessCloseBtn');
  const whatsappBtn = document.getElementById('bookingSuccessWhatsAppBtn');

  if (!modal) return;

  // Open Modal
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service') || 'General Consulting';
      serviceInput.value = serviceName;
      modalTitle.textContent = `Book ${serviceName}`;
      
      // Reset form states
      form.reset();
      form.style.display = 'flex';
      successState.style.display = 'none';
      
      // Show Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close Modal functions
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  };

  closeBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);

  // Close when clicking overlay background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('bookingSubmitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Booking Request...';
    submitBtn.disabled = true;

    // Retrieve form values
    const serviceVal = serviceInput.value;
    const nameVal = document.getElementById('bookingName').value;
    const emailVal = document.getElementById('bookingEmail').value;
    const phoneVal = document.getElementById('bookingPhone').value;
    const reqsVal = document.getElementById('bookingRequirements').value;

    setTimeout(() => {
      // Create beautifully formatted WhatsApp link with complete details
      const waMessage = `Hello NGS Soft Works! I want to book an appointment for *${serviceVal}*.\n\n*My Details*:\n- *Name*: ${nameVal}\n- *Email*: ${emailVal}\n- *Phone*: ${phoneVal}\n\n*Requirements*:\n${reqsVal}`;
      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/917904509269?text=${encodedMessage}`;
      
      // Update success WhatsApp button href
      whatsappBtn.href = waUrl;

      // Open WhatsApp chat directly in a new tab
      window.open(waUrl, '_blank');

      // Reset Submit Button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show success state panel
      form.style.display = 'none';
      successState.style.display = 'flex';
    }, 1200);
  });
});

// ── TERMINAL INTERACTIVE RUNNER ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('run-terminal-btn');
  const termContent = document.getElementById('terminal-content');

  if (runBtn && termContent) {
    runBtn.addEventListener('click', () => {
      // Disable button during execution
      runBtn.disabled = true;
      runBtn.style.opacity = '0.5';
      runBtn.innerHTML = `<span style="color: var(--secondary); font-family: var(--font-mono); font-size: 0.75rem;">[RUNNING RENDER...]</span>`;
      
      termContent.innerHTML = '';
      
      const lines = [
        { text: ' &gt; [EXEC] Booting NGS Soft Works Core v2.4.0...', color: '#a1a1aa' },
        { text: ' &gt; [LOAD] Activating AutoCAD &amp; Revit BIM modules... OK', color: 'var(--primary)' },
        { text: ' &gt; [LOAD] Initializing Full Stack Web Server... OK', color: 'var(--secondary)' },
        { text: ' &gt; [LOAD] Loading OpenAI &amp; Gemini LLM connectors... OK', color: '#10b981' },
        { text: ' &gt; [EXEC] Running luxury gold &amp; silver render pass...', color: '#a1a1aa' },
        { text: ' &gt; [RENDER] Render buffer compiled (60 FPS)... OK', color: 'var(--primary)' },
      ];
      
      let i = 0;
      function printNextLine() {
        if (i < lines.length) {
          const div = document.createElement('div');
          div.style.color = lines[i].color;
          div.style.marginBottom = '6px';
          div.style.fontFamily = 'var(--font-mono)';
          div.style.fontSize = '0.75rem';
          div.style.opacity = '0';
          div.style.transform = 'translateY(5px)';
          div.style.transition = 'all 0.3s ease';
          div.innerHTML = lines[i].text;
          
          termContent.appendChild(div);
          
          // Trigger reveal
          setTimeout(() => {
            div.style.opacity = '1';
            div.style.transform = 'none';
          }, 50);
          
          i++;
          setTimeout(printNextLine, 600);
        } else {
          // Render final beautiful 3D NGS Logo Animation!
          setTimeout(() => {
            termContent.innerHTML = '';
            
            const banner = document.createElement('div');
            banner.style.textAlign = 'center';
            banner.style.padding = '0.3rem 0';
            banner.style.fontFamily = 'var(--font-heading)';
            banner.style.fontSize = '0.9rem';
            banner.style.lineHeight = '1.8';
            banner.style.color = '#fff';
            banner.style.opacity = '0';
            banner.style.transform = 'scale(0.9)';
            banner.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            banner.innerHTML = `
              <div style="color: var(--primary); font-size: 1.15rem; font-weight: 700; margin-bottom: 0.2rem; letter-spacing: 2px;">✦ THANK YOU ✦</div>
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.3rem;">For Visiting NGS Soft Works</div>
              
              <!-- Three.js 3D NGS Logo -->
              <div class="ngs-3d-container">
                <canvas id="ngs-3d-canvas"></canvas>
                <div class="ngs-3d-label">NGS · 3D · RENDER</div>
              </div>

              <div style="border-top: 1px dashed rgba(212,175,55,0.3); border-bottom: 1px dashed rgba(212,175,55,0.3); padding: 0.4rem 0; font-family: var(--font-mono); font-size: 0.65rem; color: var(--secondary);">
                [SYSTEM STATUS: ONLINE &amp; READY]
              </div>
            `;
            
            termContent.appendChild(banner);
            
            // Trigger reveal + launch Three.js 3D NGS logo
            setTimeout(() => {
              banner.style.opacity = '1';
              banner.style.transform = 'none';

              // ── THREE.JS 3D NGS BOLD TEXT RENDER ──────────
              const canvas = document.getElementById('ngs-3d-canvas');
              if (!canvas || typeof THREE === 'undefined') return;

              const W = 200, H = 130;
              canvas.width = W;
              canvas.height = H;

              const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
              renderer.setSize(W, H);
              renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
              renderer.setClearColor(0x000000, 0);

              const scene = new THREE.Scene();
              const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
              camera.position.set(0, 0, 5);

              // Lighting rig
              scene.add(new THREE.AmbientLight(0xffffff, 0.4));
              const goldLight = new THREE.PointLight(0xd4af37, 5, 20);
              goldLight.position.set(3, 3, 3);
              scene.add(goldLight);
              const backLight = new THREE.PointLight(0xffa500, 2, 15);
              backLight.position.set(-3, -2, -2);
              scene.add(backLight);
              const rimLight = new THREE.PointLight(0xffffff, 1.5, 12);
              rimLight.position.set(0, 4, -3);
              scene.add(rimLight);

              // ── Canvas 2D → Texture for bold "NGS" ──
              const tc = document.createElement('canvas');
              tc.width = 512; tc.height = 256;
              const ctx = tc.getContext('2d');

              // Transparent background
              ctx.clearRect(0, 0, 512, 256);

              // Gold gradient text
              const grad = ctx.createLinearGradient(0, 0, 0, 256);
              grad.addColorStop(0,   '#fff7c0');
              grad.addColorStop(0.3, '#f9d976');
              grad.addColorStop(0.6, '#d4af37');
              grad.addColorStop(1,   '#a07820');
              ctx.fillStyle = grad;
              ctx.font = 'bold 160px "Sora", "Space Grotesk", Arial Black, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              // Glow
              ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
              ctx.shadowBlur = 30;
              ctx.fillText('NGS', 256, 128);
              // Second pass for crisp fill on top
              ctx.shadowBlur = 0;
              ctx.fillText('NGS', 256, 128);

              const texture = new THREE.CanvasTexture(tc);
              texture.needsUpdate = true;

              // 3D Plane with the text texture
              const planeMat = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                metalness: 0.6,
                roughness: 0.2,
                emissive: new THREE.Color(0x7a5800),
                emissiveIntensity: 0.2,
                emissiveMap: texture
              });
              const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), planeMat);

              const group = new THREE.Group();
              group.add(planeMesh);
              scene.add(group);

              // Orbiting gold ring
              const ring = new THREE.Mesh(
                new THREE.TorusGeometry(1.8, 0.038, 8, 64),
                new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.12, emissive: 0x7a4500, emissiveIntensity: 0.6 })
              );
              ring.rotation.x = Math.PI * 0.28;
              scene.add(ring);

              // Floating gold particles
              const pGeo = new THREE.BufferGeometry();
              const pCount = 40;
              const pPos = new Float32Array(pCount * 3);
              for (let i = 0; i < pCount; i++) {
                pPos[i*3]   = (Math.random()-0.5)*5.5;
                pPos[i*3+1] = (Math.random()-0.5)*3.5;
                pPos[i*3+2] = (Math.random()-0.5)*3;
              }
              pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
              const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf9d976, size: 0.05, transparent: true, opacity: 0.8 }));
              scene.add(particles);

              // Animation loop
              let t = 0;
              function animateNGS() {
                if (!document.getElementById('ngs-3d-canvas')) return;
                requestAnimationFrame(animateNGS);
                t += 0.012;
                // Gentle rocking rotation
                group.rotation.y = Math.sin(t * 0.35) * 0.45;
                group.rotation.x = Math.sin(t * 0.22) * 0.1;
                group.position.y = Math.sin(t * 0.55) * 0.08;
                // Ring orbits
                ring.rotation.z += 0.009;
                ring.rotation.x = Math.PI * 0.28 + Math.sin(t * 0.3) * 0.08;
                // Particles drift
                particles.rotation.y += 0.003;
                // Dynamic gold light
                goldLight.position.x = Math.sin(t * 0.5) * 4;
                goldLight.position.y = Math.cos(t * 0.4) * 3;
                renderer.render(scene, camera);
              }
              animateNGS();

            }, 100);
            
            // Reset button with thank you state
            runBtn.innerHTML = `<span style="color: var(--primary);">✦ SYSTEM READY ✦</span>`;
            runBtn.style.borderColor = 'var(--primary)';
            runBtn.style.opacity = '1';

            
            // Re-enable button after 5 seconds to let them run it again
            setTimeout(() => {
              runBtn.disabled = false;
              runBtn.innerHTML = `<i data-lucide="play" style="width: 12px; height: 12px; margin-right: 6px; display: inline-block; vertical-align: middle;"></i> Run System Render`;
              runBtn.style.borderColor = 'rgba(212,175,55,0.3)';
              
              // Reset the terminal content back to the initial dashboard state
              termContent.innerHTML = `
                <div class="sys-line"><span>[SYSTEM]</span> Initializing digital transformation stack...</div>
                <div class="sys-line"><span>[SYSTEM]</span> Spawning AI Agent execution threads... OK</div>
                <div class="sys-line"><span>[SYSTEM]</span> Rendering high-fidelity CAD & BIM schedules... OK</div>
                <div class="sys-line highlight"><span>[READY]</span> Multi-Disciplinary Core Engine Online.</div>
              `;

              // Re-instantiate the Lucide play icon
              lucide.createIcons();
            }, 5000);
            
          }, 800);
        }
      }
      
      printNextLine();
    });
  }
});






