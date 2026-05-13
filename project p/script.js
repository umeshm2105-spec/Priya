// ===== CUSTOM CURSOR =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// ===== FLOATING PARTICLES =====
function createParticles(container) {
  const emojis = ['🌸', '✨', '🎀', '🌷', '💫'];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(p);
  }
}
createParticles(document.getElementById('login-screen'));

// ===== LOGIN =====
const loginScreen = document.getElementById('login-screen');
const loginCard = document.querySelector('.login-card');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');

function checkAuth() {
  if (localStorage.getItem('priya_auth') === 'true') {
    loginScreen.style.display = 'none';
    mainContent.style.display = 'block';
    mainContent.classList.add('visible');
    initMainContent();
  }
}
checkAuth();

loginBtn.addEventListener('click', handleLogin);
document.getElementById('password').addEventListener('keypress', e => { if (e.key === 'Enter') handleLogin(); });

function handleLogin() {
  const pass = document.getElementById('password').value.trim().toLowerCase();
  if (pass === 'priya') {
    localStorage.setItem('priya_auth', 'true');
    loginCard.classList.add('hidden');
    setTimeout(() => {
      loginScreen.style.opacity = '0';
      loadingScreen.classList.add('active');
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loginScreen.style.display = 'none';
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
          setTimeout(() => { mainContent.classList.add('visible'); initMainContent(); }, 50);
        }, 600);
      }, 2500);
    }, 600);
  } else {
    loginCard.classList.add('shake');
    loginError.textContent = 'Hmm, that doesn\'t seem right. Try again 💫';
    setTimeout(() => loginCard.classList.remove('shake'), 500);
  }
}

// ===== MAIN CONTENT INIT =====
function initMainContent() {
  createParticles(document.getElementById('hero'));
  createEmojiOrbs();
  initTypewriter();
  initScrollAnimations();
  initQuotesCarousel();
}

// ===== HERO TYPEWRITER =====
function initTypewriter() {
  const title = document.getElementById('hero-title');
  const text = 'Belated Happy Birthday, Priya 🎂';
  let i = 0;
  title.textContent = '';
  const interval = setInterval(() => {
    title.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(() => document.getElementById('hero-subtitle').classList.add('visible'), 400);
      setTimeout(() => document.getElementById('date-badge').classList.add('visible'), 900);
    }
  }, 70);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Bloom flowers on scroll
        if (entry.target.classList.contains('flower-container')) {
          entry.target.querySelector('.flower').classList.add('bloomed');
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .flower-container').forEach(el => observer.observe(el));
}

// ===== NOTE TYPEWRITER =====
const noteObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.typed) {
      entry.target.dataset.typed = 'true';
      const fullHTML = entry.target.getAttribute('data-content');
      entry.target.innerHTML = '';
      let charIndex = 0;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fullHTML;
      const plainText = tempDiv.textContent;
      
      const typeInterval = setInterval(() => {
        entry.target.textContent = plainText.substring(0, charIndex);
        charIndex++;
        if (charIndex > plainText.length) {
          clearInterval(typeInterval);
          entry.target.innerHTML = fullHTML;
        }
      }, 20);
    }
  });
}, { threshold: 0.3 });

// ===== FLIP CARDS =====
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ===== REVEAL BUBBLES =====
document.querySelectorAll('.reveal-bubble').forEach(bubble => {
  bubble.addEventListener('click', () => {
    if (!bubble.classList.contains('unlocked')) {
      bubble.classList.add('unlocked');
      bubble.querySelector('.lock-icon').textContent = '🔓';
    }
  });
});

// ===== QUOTES CAROUSEL =====
function initQuotesCarousel() {
  const quotes = [
    'Kindness never goes unnoticed.',
    'Some people leave a quiet impact.',
    'The best kind of presence is the kind that stays with you.',
    'Being genuinely kind is a rare and beautiful thing.',
    'You don\'t need to try hard to matter.'
  ];
  const quoteText = document.getElementById('quote-text');
  const dotsContainer = document.getElementById('quote-dots');
  let currentQuote = 0;

  if (!quoteText) return;

  quotes.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showQuote(i));
    dotsContainer.appendChild(dot);
  });

  function showQuote(index) {
    quoteText.classList.remove('visible');
    setTimeout(() => {
      quoteText.textContent = '"' + quotes[index] + '"';
      quoteText.classList.add('visible');
      dotsContainer.querySelectorAll('.quote-dot').forEach((d, i) => d.classList.toggle('active', i === index));
      currentQuote = index;
    }, 400);
  }

  showQuote(0);
  setInterval(() => showQuote((currentQuote + 1) % quotes.length), 4000);
}

// ===== MEMORY JAR =====
document.querySelectorAll('.memory-slip').forEach(slip => {
  const hidden = slip.getAttribute('data-memory');
  slip.addEventListener('click', () => {
    if (!slip.classList.contains('unfolded')) {
      slip.classList.add('unfolded');
      slip.textContent = hidden;
    } else {
      slip.classList.remove('unfolded');
      slip.textContent = '📜 Click to unfold';
    }
  });
});

// ===== WISH GARDEN HOVER BLOOM =====
document.querySelectorAll('.flower-container').forEach(fc => {
  fc.addEventListener('mouseenter', () => fc.querySelector('.flower').classList.add('bloomed'));
});

// ===== CURIOUS BUTTON MODAL =====
const curiousBtn = document.getElementById('curious-btn');
const modal = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

if (curiousBtn) {
  curiousBtn.addEventListener('click', () => {
    modal.classList.add('active');
    launchConfetti();
  });
}
if (modalClose) {
  modalClose.addEventListener('click', () => modal.classList.remove('active'));
}
if (modal) {
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
}

function launchConfetti() {
  const colors = ['#b39ddb', '#e8a4bf', '#fce8dc', '#f9e4ec', '#ede9f7', '#ffd54f'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 1.5 + 's';
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.width = (6 + Math.random() * 8) + 'px';
    c.style.height = (6 + Math.random() * 8) + 'px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// ===== MUSIC TOGGLE =====
const musicToggle = document.getElementById('music-toggle');
let audioCtx, oscillator, gainNode, isPlaying = false;

if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbient();
      musicToggle.textContent = '🔊';
    } else {
      stopAmbient();
      musicToggle.textContent = '🔇';
    }
    isPlaying = !isPlaying;
  });
}

function startAmbient() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // Create a soft ambient pad using multiple oscillators
  const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.03;
  gainNode.connect(audioCtx.destination);

  notes.forEach(freq => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const g = audioCtx.createGain();
    g.gain.value = 0.02;
    osc.connect(g);
    g.connect(gainNode);
    osc.start();
  });
}

function stopAmbient() {
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
}

// ===== INIT NOTE OBSERVER =====
document.addEventListener('DOMContentLoaded', () => {
  const noteEl = document.querySelector('.note-text');
  if (noteEl) noteObserver.observe(noteEl);
});

// ===== EMOJI ORBS FOR HERO =====
function createEmojiOrbs() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const orbs = ['🌸', '✨', '🎀', '🌷'];
  const positions = [
    {top:'15%',left:'10%'}, {top:'25%',right:'12%'},
    {top:'60%',left:'8%'}, {top:'70%',right:'15%'},
    {top:'40%',left:'85%'}, {top:'80%',left:'20%'}
  ];
  positions.forEach((pos, i) => {
    const orb = document.createElement('div');
    orb.className = 'emoji-orb';
    orb.textContent = orbs[i % orbs.length];
    Object.assign(orb.style, pos);
    orb.style.animationDelay = (i * 1.5) + 's';
    hero.appendChild(orb);
  });
}
