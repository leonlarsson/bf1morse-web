/**
 * THEME REGISTRY
 * ─────────────────────────────────────────────────────
 * To add a new theme: append one object to themes-data.js.
 * This module reads window.__BF1_THEMES (set by themes-data.js,
 * which loads synchronously in <head> to prevent FOUC).
 */

export const THEMES = window.__BF1_THEMES;
const DEFAULT_THEME = 'original';

/** Apply a theme by id, persisting the choice to localStorage. */
export function applyTheme(id) {
  const theme = THEMES.find(t => t.id === id) ?? THEMES[0];
  const root = document.documentElement;

  // Suppress element-level transitions for this frame so colors snap
  // instantly and only the registered @property transitions animate.
  root.classList.add('theme-switching');

  // Stamp every var from every theme first (clears stale values),
  // then overwrite with the new theme's values.
  for (const t of THEMES) {
    for (const key of Object.keys(t.vars)) {
      root.style.removeProperty(key);
    }
  }
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }

  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-bs-theme', theme.bsTheme);
  localStorage.setItem('theme', JSON.stringify({ key: theme.id, name: theme.name }));

  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = theme.name;

  if (typeof theme.onApply === 'function') theme.onApply();

  // Restore element transitions after one frame so hover effects work normally.
  requestAnimationFrame(() => root.classList.remove('theme-switching'));
}

/** Advance to the next theme in the registry. */
export function cycleTheme() {
  const current = document.documentElement.getAttribute('data-theme') ?? THEMES[0].id;
  const idx = THEMES.findIndex(t => t.id === current);
  applyTheme(THEMES[(idx + 1) % THEMES.length].id);
}

/** Sync the theme button label after DOM is ready.
 *  The vars were already applied by themes-data.js before first paint. */
export function initTheme() {
  const saved = JSON.parse(localStorage.getItem('theme') || 'null');
  applyTheme(THEMES.some(t => t.id === saved?.key) ? saved.key : DEFAULT_THEME);
}
