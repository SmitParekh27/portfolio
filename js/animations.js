// Typing animation for name
(function() {
  const text = "Smit Parekh";
  const typedElement = document.getElementById("typed-name");
  let index = 0;

  function type() {
    if (index < text.length) {
      typedElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  setTimeout(type, 500);
})();

// Scroll reveal animation
(function() {
  const revealElements = document.querySelectorAll(".scroll-reveal");

  function checkScroll() {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        el.classList.add("revealed");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
})();

// Interactive skill bar animation on scroll
(function() {
  const skillBars = document.querySelectorAll(".skill-bar-fill");
  let animated = false;

  function animateSkills() {
    const skillsSection = document.getElementById("skills");
    const rect = skillsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100 && !animated) {
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.width = bar.parentElement.parentElement.style.getPropertyValue("--level");
        }, index * 100);
      });
      animated = true;
    }
  }

  // Set initial width to 0
  skillBars.forEach(bar => {
    bar.style.width = "0";
    bar.style.transition = "width 1s ease";
  });

  window.addEventListener("scroll", animateSkills);
  animateSkills();
})();

// Custom cursor - Infinity Loop with Particle Explosion and Color Shift
(function() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  // Color shift based on element underneath
  function updateCursorColor(element) {
    if (!element) return;
    
    const tagName = element.tagName.toLowerCase();
    const classList = element.classList;
    
    let color = '#38bdf8'; // default accent
    
    if (tagName === 'a' || tagName === 'button' || classList.contains('btn-primary') || classList.contains('btn-ghost')) {
      color = '#0ea5e9'; // blue
    } else if (classList.contains('area-card') || classList.contains('work-card')) {
      color = '#7c3aed'; // purple
    } else if (classList.contains('skill-card') || classList.contains('tag') || classList.contains('chip')) {
      color = '#10b981'; // green
    } else if (classList.contains('nav-link')) {
      color = '#f59e0b'; // amber
    }
    
    cursor.style.color = color;
    follower.style.borderColor = color + '66';
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Update color based on element
    updateCursorColor(e.target);
  });

  // Particle explosion on click
  document.addEventListener('click', (e) => {
    const particleCount = 12;
    const colors = ['#38bdf8', '#0ea5e9', '#7c3aed', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  });

  function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.5;
    followerY += distY * 0.5;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Expand cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .area-card, .work-card, .skill-card, .chip, .tag, .pill, .social-link, .metric-pill, .logo-circle');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
})();

// Scroll progress bar
(function() {
  const progressBar = document.querySelector('.scroll-progress');
  
  function updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  
  window.addEventListener('scroll', updateProgress);
  updateProgress();
})();

// 3D tilt effect for cards
(function() {
  const tiltCards = document.querySelectorAll('.hero-card, .area-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// Text color change on scroll
(function() {
  const heroName = document.querySelector('.hero-name');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hue = Math.min(scrolled / 3, 200);
    if (heroName) {
      heroName.style.color = `hsl(${hue + 200}, 70%, 70%)`;
    }
  });
})();

// Click ripple effect
(function() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid rgba(56,189,248,0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '9997';
    document.body.appendChild(ripple);
    
    let size = 0;
    const interval = setInterval(() => {
      size += 5;
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.opacity = 1 - (size / 100);
      
      if (size >= 100) {
        clearInterval(interval);
        ripple.remove();
      }
    }, 10);
  });
})();

// Parallax effect on hero section
(function() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / 500);
    }
  });
})();

// Interactive metric counters
(function() {
  const metrics = document.querySelectorAll('.metric-pill');
  let counted = false;
  
  function animateCounters() {
    const heroSection = document.getElementById('home');
    const rect = heroSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && !counted) {
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          metric.style.transform = 'scale(1.1)';
          setTimeout(() => {
            metric.style.transform = '';
          }, 200);
        }, index * 100);
      });
      counted = true;
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  animateCounters();
})();
