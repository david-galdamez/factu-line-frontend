//Make a mouse tracking for 3d rotation
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.content-section');
  if (section) {
    section.addEventListener('mousemove', (e) => {
      const { width, height, left, top } = section.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      const rotateY = (x / width) * 60;
      const rotateX = -(y / height) * 60;

      section.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // Reveal on scroll using IntersectionObserver
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = Array.from(document.querySelectorAll('.reveal-on-scroll'));
  if (prefersReduced) {
    // If user prefers reduced motion, just reveal immediately
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if ('IntersectionObserver' in window && revealElements.length) {
    const observerOpts = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add revealed class
          entry.target.classList.add('revealed');
          // If stagger container, add small stagger to children
          if (entry.target.classList.contains('reveal-stagger')) {
            Array.from(entry.target.children).forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
            });
          }
          obs.unobserve(entry.target);
        }
      });
    }, observerOpts);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal all
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
