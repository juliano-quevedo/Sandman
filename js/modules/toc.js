/**
 * Destaca no índice a seção visível (aria-current="true").
 * Melhoria progressiva — o índice funciona normalmente sem este módulo.
 */
export function initToc({ linkSelector = '[data-toc] a[href^="#"]' } = {}) {
  const links = [...document.querySelectorAll(linkSelector)];
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}
