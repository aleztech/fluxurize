document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach(el => observer.observe(el));

  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach(item => {
      const speed = parseFloat(item.dataset.speed || '0.2');
      const offset = scrollY * speed;
      item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  };

  applyParallax();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');
  const closeNav = () => document.body.classList.remove('nav-open');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          closeNav();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) {
        closeNav();
      }
    });
  }

  const toggleHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 6) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
});
