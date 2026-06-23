(function() {
    // ========== 1. LOGO LOADER CONTROLLER ==========
  window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('book-loader');
    const mainContent = document.getElementById('main-content');
    

    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transform = 'scale(1.2)'; // Smooth zoom-out effect on exit
      
      mainContent.classList.remove('hidden-content');
      mainContent.classList.add('show-content');
      
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 2200);
  });
 

  // ========== 2. PARALLAX EFFECT ON SCROLL ==========
  const heroText = document.querySelector('.hero-text-layer');
  window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;
    
    if (heroText && scrollValue < 600) {
      heroText.style.transform = `translateY(${scrollValue * 0.35}px)`;
      heroText.style.opacity = 1 - (scrollValue / 500);
    }
  });

  // ========== 3. CTA EVENTS INTERACTIVITY ==========
  const trialBtn = document.getElementById('freeTrialBtn');
  const demoBtn = document.getElementById('demoBtn');
  
  if (trialBtn) {
    trialBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('✨ Start your free trial: Experience SAS® Analytics — 30-day trial available!');
    });
  }
  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('📞 Request a demo: Our team will reach out with a personalized walkthrough.');
    });
  }

  const learnLinks = document.querySelectorAll('.learn-link');
  learnLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔍 Learn more about industry-specific analytics solutions. Contact SAS for detailed resources.');
    });
  });

})();

// ========== 4. HERO CANVAS BACKGROUND ANIMATION ==========
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  if (canvas) {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const bars = [
  { height: 0, target: 0.3 },
  { height: 0, target: 0.45 },
  { height: 0, target: 0.55 },
  { height: 0, target: 0.65 },
  { height: 0, target: 0.75 },
  { height: 0, target: 0.85 },
  { height: 0, target: 0.95 },
  { height: 0, target: 0.80 },
  { height: 0, target: 0.60 },
  { height: 0, target: 0.40 },
];

function drawGrid() {
  const W = canvas.width;
  const H = canvas.height;
  ctx.strokeStyle = 'rgba(230, 57, 70, 0.08)';
  ctx.lineWidth = 1;

  const colGap = 60;
  for (let x = 0; x < W; x += colGap) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  const rowGap = 50;
  for (let y = 0; y < H; y += rowGap) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawBars() {
  const W = canvas.width;
  const H = canvas.height;
  const barWidth = 40;
  const gap = 20;
  const totalWidth = bars.length * (barWidth + gap);
  const startX = (W - totalWidth) / 2;
  const baseY = H - 60;

  bars.forEach((bar, i) => {
    if (bar.height < bar.target) bar.height += 0.008;

    const barH = bar.height * (H - 180);
    const x = startX + i * (barWidth + gap);
    const y = baseY - barH;

    const grad = ctx.createLinearGradient(x, y, x, baseY);
    grad.addColorStop(0, 'rgba(230, 57, 70, 0.7)');
    grad.addColorStop(1, 'rgba(150, 10, 20, 0.1)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, 6);
    ctx.fill();
  });
}

function animate() {
  if (!canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawBars();
  requestAnimationFrame(animate);
}
animate();