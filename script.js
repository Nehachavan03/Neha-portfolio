/* ===== Typing Effect ===== */
const textArray = [
  "BTech CSE Student",
  "Cloud Computing Enthusiast",
  "AI & ML Enthusiast"
];

let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  if (charIndex < textArray[index].length) {
    typingElement.textContent += textArray[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 80);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent =
      textArray[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    index = (index + 1) % textArray.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* ===== Scroll Reveal ===== */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => revealObserver.observe(el));


/* ===== Active Navbar Highlight ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === current) {
      link.classList.add("active");
    }
  });
});

/* ===== Skill Pill Click Glow ===== */
const skillPills = document.querySelectorAll(".skill-pill");

skillPills.forEach(pill => {
  pill.addEventListener("click", () => {
    pill.classList.toggle("active");
  });
});

/* Tool Pill Click Glow */
document.querySelectorAll(".tool-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    pill.classList.toggle("active");
  });
});

document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

window.addEventListener("scroll", () => {
  const scroll =
    (window.scrollY /
      (document.body.scrollHeight - window.innerHeight)) *
    100;
  document.querySelector(".scroll-progress").style.width = scroll + "%";
});

/* ================= VORTEX BACKGROUND ================= */

const canvas = document.getElementById("vortex-bg");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];
let mouse = { x: 0, y: 0 };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * Math.min(w, h) * 0.5;
    this.speed = 0.002 + Math.random() * 0.003;
    this.size = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.angle += this.speed;

    const cx = mouse.x || w / 2;
    const cy = mouse.y || h / 2;

    const x = cx + Math.cos(this.angle) * this.radius;
    const y = cy + Math.sin(this.angle) * this.radius * 0.6;

    this.radius *= 0.999;

    if (this.radius < 10) this.reset();

    ctx.beginPath();
    ctx.fillStyle = `rgba(34,211,238,${this.alpha})`;
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 600; i++) {
    particles.push(new Particle());
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}
animate();
