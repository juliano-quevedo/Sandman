/**
 * Menu hambúrguer (mobile).
 * Mantém aria-expanded sincronizado, fecha ao clicar num link ou com Esc.
 */
export function initMenu({
  toggleSelector = '[data-menu-toggle]',
  navSelector = '[data-nav]',
} = {}) {
  const toggle = document.querySelector(toggleSelector);
  const nav = document.querySelector(navSelector);
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.textContent = open ? '×' : '☰';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
