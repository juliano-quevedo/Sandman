const DURATION_MS = 3200;

/**
 * Toast de aviso. Qualquer elemento com [data-toast-trigger] exibe o toast
 * por 3,2 s (e não navega, mesmo sendo um <a href="#...">).
 */
export function initToast({
  triggerSelector = '[data-toast-trigger]',
  toastSelector = '[data-toast]',
} = {}) {
  const toast = document.querySelector(toastSelector);
  const triggers = document.querySelectorAll(triggerSelector);
  if (!toast || triggers.length === 0) return;

  let timer;

  const show = () => {
    toast.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('is-visible'), DURATION_MS);
  };

  triggers.forEach((trigger) =>
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      show();
    }),
  );
}
