/**
 * Progressive enhancement only — the page is fully readable with this
 * script disabled. Two things happen here:
 *   1. The subnav link for the section in view gets an active state.
 *   2. Sections ease in on first scroll into view.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.doc-section[id]');
  const navLinks = document.querySelectorAll('.subnav a');

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const reveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((section) => {
      section.classList.add('will-animate');
      reveal.observe(section);
    });
  }
});