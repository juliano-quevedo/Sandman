const DURATION_MS = 250;

/**
 * Anima abrir/fechar de <details> (FAQ) com a Web Animations API.
 * Sem JS (ou com prefers-reduced-motion) o <details> nativo continua funcionando.
 */
export function initAccordion(selector = '[data-accordion] details') {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll(selector).forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('[data-accordion-content]');
    if (!summary || !content) return;

    let animation = null;

    const run = (from, to, onDone) => {
      animation?.cancel();
      content.style.overflow = 'hidden';
      animation = content.animate(
        { height: [`${from}px`, `${to}px`], opacity: [from ? 1 : 0, to ? 1 : 0] },
        { duration: DURATION_MS, easing: 'ease' },
      );
      animation.onfinish = () => {
        content.style.overflow = '';
        animation = null;
        onDone?.();
      };
      animation.oncancel = () => {
        content.style.overflow = '';
      };
    };

    summary.addEventListener('click', (event) => {
      if (reduceMotion.matches) return;
      event.preventDefault();

      if (details.open) {
        run(content.offsetHeight, 0, () => {
          details.open = false;
        });
      } else {
        details.open = true;
        run(0, content.scrollHeight);
      }
    });
  });
}
