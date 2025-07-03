// Theme Toggle with system preference and animated transition
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark-theme');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
  }
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.body.classList.add('theme-transition');
    setTimeout(() => document.body.classList.remove('theme-transition'), 400);
  });
}

// Load theme on page load (with system preference fallback)
window.addEventListener('DOMContentLoaded', () => {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(theme);

  // Set default tab
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });
  const defaultTab = document.querySelector('.tab.active');
  if (defaultTab) {
    const tabId = defaultTab.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'flex';
  }

  // Animate in about cards if present
  document.querySelectorAll('.about-cards .card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px) scale(0.96)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s, transform 0.7s';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0) scale(1)';
    }, 400);
  });
});

// Tab Switching for Portfolio Section with fade animation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    const tabId = this.getAttribute('data-tab');
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
      tabContent.style.display = 'flex';
      tabContent.style.opacity = 1;
    }
  });
});

// Contact Form Submission (prevent default for demo)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Show a modal or toast instead of alert for modern UX
      showToast('Thank you for reaching out!');
      form.reset();
    });
  }
});

// Simple toast notification
function showToast(message) {
  let toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#232946';
  toast.style.color = '#a786fd';
  toast.style.padding = '1rem 2rem';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 24px #a786fd55';
  toast.style.fontWeight = 'bold';
  toast.style.zIndex = 9999;
  toast.style.opacity = 0;
  toast.style.transition = 'opacity 0.4s';
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = 1; }, 10);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => document.body.removeChild(toast), 400);
  }, 3000);
}

// Typewriter effect for hero section
document.addEventListener('DOMContentLoaded', () => {
  const roles = [
    "Passionate about Cybersecurity & Full Stack Development",
    "Frontend Developer",
    "Backend Developer",
    "Tech Enthusiast"
  ];
  let i = 0, j = 0, isDeleting = false, current = "", typeSpeed = 80, pause = 1200;
  const el = document.getElementById('typewriter');
  function type() {
    if (!el) return;
    if (!isDeleting && j <= roles[i].length) {
      current = roles[i].substring(0, j++);
      el.textContent = current + "|";
      setTimeout(type, typeSpeed);
    } else if (isDeleting && j >= 0) {
      current = roles[i].substring(0, j--);
      el.textContent = current + "|";
      setTimeout(type, typeSpeed / 2);
    } else if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, pause);
    } else {
      isDeleting = false;
      i = (i + 1) % roles.length;
      setTimeout(type, typeSpeed);
    }
  }
  type();
});