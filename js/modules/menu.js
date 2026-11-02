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
  const icon = toggle.querySelector('[data-menu-icon]');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    icon?.classList.toggle('fa-bars', !open);
    icon?.classList.toggle('fa-xmark', open);
  };

  window.matchMedia('(min-width: 601px)').addEventListener('change', () => setOpen(false));

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}
