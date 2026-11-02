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
    let isOpen = details.open;

    const run = (fromHeight, toHeight, fromOpacity, toOpacity, onDone) => {
      animation?.cancel();
      content.style.overflow = 'hidden';
      animation = content.animate(
        {
          height: [`${fromHeight}px`, `${toHeight}px`],
          opacity: [fromOpacity, toOpacity],
        },
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
      if (reduceMotion.matches || typeof content.animate !== 'function') {
        window.setTimeout(() => {
          isOpen = details.open;
        }, 0);
        return;
      }

      event.preventDefault();

      const fromHeight = content.getBoundingClientRect().height;
      const fromOpacity = details.open
        ? Number.parseFloat(getComputedStyle(content).opacity)
        : 0;
      isOpen = !isOpen;

      if (!isOpen) {
        run(fromHeight, 0, fromOpacity, 0, () => {
          details.open = false;
        });
      } else {
        details.open = true;
        run(fromHeight, content.scrollHeight, fromOpacity, 1);
      }
    });
  });
}
