export function scrollToSection(lenis, id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = options.offset ?? -80;

  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset, ...options });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
