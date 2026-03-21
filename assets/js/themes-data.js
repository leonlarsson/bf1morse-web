/**
 * THEME REGISTRY — loaded synchronously in <head> to prevent FOUC.
 * themes.js (ES module) reads window.__BF1_THEMES from here.
 *
 * To add a new theme: append one object to the array below.
 * Vars may reference other vars: 'var(--accent-primary)' resolves at
 * computed-value time, so order within the object doesn't matter.
 */
function __setFavicon(bg, accent) {
  const el = document.querySelector('link[rel="icon"]');
  if (!el) return;
  el.href = "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>` +
    `<rect width='32' height='32' fill='${bg}'/>` +
    `<circle cx='9' cy='16' r='3.5' fill='${accent}'/>` +
    `<rect x='15' y='13' width='12' height='6' fill='${accent}'/>` +
    `</svg>`
  );
}

window.__BF1_THEMES = [
  {
    id: 'original',
    name: 'Original',
    bsTheme: 'dark',
    onApply() { __setFavicon('#0b0d14', '#5b86e5'); },
    vars: {
      // ── Backgrounds ─────────────────────────────────
      '--bg-base':        '#0b0d14',
      '--bg-surface':     '#10131e',
      '--bg-card':        '#181b28',
      '--bg-card-raised': '#1d2134',
      '--bg-input':       '#0e1020',

      // ── Borders ─────────────────────────────────────
      '--border-subtle':  'rgba(255, 255, 255, 0.05)',
      '--border-default': 'rgba(255, 255, 255, 0.09)',
      '--border-strong':  'rgba(255, 255, 255, 0.18)',

      // ── Text ────────────────────────────────────────
      '--text-primary':   '#e2e5f0',
      '--text-secondary': '#8890a8',
      '--text-muted':     '#454a66',

      // ── Accents ─────────────────────────────────────
      '--accent-primary':       '#5b86e5',
      '--accent-primary-faint': 'rgba(91, 134, 229, 0.22)',
      '--accent-yellow':        '#c8a84b',
      '--accent-yellow-dim':    '#8a7030',
      '--accent-red':           '#ed4245',
      '--accent-blue':          '#5b86e5',
      '--accent-green':         '#3ba55c',

      // ── Radii ───────────────────────────────────────
      '--radius-sm':   '6px',
      '--radius-md':   '10px',
      '--radius-lg':   '16px',
      '--radius-full': '20px',

      // ── Shadows ─────────────────────────────────────
      '--shadow-sm': '0 1px 3px rgba(0,0,0,0.5)',
      '--shadow-md': '0 4px 20px rgba(0,0,0,0.45)',
      '--shadow-lg': '0 8px 40px rgba(0,0,0,0.55)',

      // ── Ambient glow ────────────────────────────────
      '--glow-bg': '\n        radial-gradient(ellipse 80% 40% at 50% -10%, rgba(91,134,229,0.07) 0%, transparent 70%),\n        radial-gradient(ellipse 50% 30% at 90% 90%,  rgba(200,168,75,0.04) 0%, transparent 60%)',

      // ── Typography ──────────────────────────────────
      '--ui-text-transform':      'none',
      '--title-letter-spacing':   '-0.6px',
      '--tagline-letter-spacing': '1px',
      '--label-letter-spacing':   '0.9px',

      // ── Title ───────────────────────────────────────
      '--color-title-link':       '#ed4245',
      '--color-title-link-hover': '#1D9BF0',
      '--color-title-span':       '#5b86e5',

      // ── Header links ────────────────────────────────
      '--color-header-link':        '#3ba55c',
      '--color-header-link-hover':  'rgba(59, 165, 92, 0.7)',
      '--header-link-decoration':   'underline',
      '--header-link-border':       'none',
      '--header-link-spacing':      '0px',

      // ── Labels ──────────────────────────────────────
      '--color-label':            'var(--text-secondary)',
      '--label-link-decoration':  'underline',
      '--label-link-border':      'none',
      '--color-label-link-hover': 'var(--text-primary)',

      // ── Icon buttons ────────────────────────────────
      '--color-icon-hover-border': 'var(--border-strong)',
      '--color-icon-hover-text':   'var(--text-primary)',

      // ── Panel / banner accent borders ───────────────
      '--ui-panel-border-left': 'none',

      // ── Stage buttons ───────────────────────────────
      '--stage-hover-bg':        'rgba(255, 255, 255, 0.05)',
      '--color-stage-hover':     'var(--text-primary)',
      '--stage-hover-transform': 'translateY(-1px)',

      // ── Status heading ──────────────────────────────
      '--status-font-size':             '18px',
      '--status-font-weight':           '500',
      '--color-status-success-border':  '#3ba55c',
      '--color-status-success-bg':      'rgba(59, 165, 92, 0.05)',

      // ── Toggle pills ────────────────────────────────
      '--color-toggle-hover-border':    'var(--border-strong)',
      '--color-toggle-hover-text':      'var(--text-primary)',
      '--color-toggle-checked-border':  'rgba(91, 134, 229, 0.55)',
      '--color-toggle-checked-bg':      'rgba(91, 134, 229, 0.09)',

      // ── Copy button ─────────────────────────────────
      '--color-copy-btn-text':         '#ffffff',
      '--color-copy-btn-hover-bg':     '#4a75d4',
      '--color-copy-btn-hover-shadow': 'rgba(91, 134, 229, 0.40)',

      // ── Info banner ─────────────────────────────────
      '--banner-bg':            'rgba(91, 134, 229, 0.07)',
      '--banner-border-color':  'rgba(91, 134, 229, 0.20)',
      '--color-banner-strong':  '#7ba3f5',
      '--color-dismiss-hover':  'var(--text-primary)',

      // ── Cards ───────────────────────────────────────
      '--card-hover-border':     'rgba(91, 134, 229, 0.30)',
      '--card-hover-glow':       'rgba(91, 134, 229, 0.14)',
      '--color-card-subtitle':   'var(--text-secondary)',
      '--color-card-link':       '#5b86e5',
      '--color-card-link-hover': '#c8a84b',

      // ── Alert warning ───────────────────────────────
      '--alert-warning-bg':     'rgba(255, 193, 7, 0.09)',
      '--alert-warning-border': 'rgba(255, 193, 7, 0.25)',
      '--color-alert-warning':  '#e6b000',
    },
  },
  {
    id: 'original-light',
    name: 'Original Light',
    bsTheme: 'light',
    onApply() { __setFavicon('#eef0f5', '#5b86e5'); },
    // Bootstrap handles its own components via data-bs-theme="light".
    // Our custom elements are driven by the vars below; everything else
    // falls back to the CSS fallback values (same as Original).
    vars: {
      '--bg-base':        '#eef0f5',
      '--bg-surface':     '#f5f6fa',
      '--bg-card':        '#ffffff',
      '--bg-card-raised': '#eef0f5',
      '--bg-input':       '#ffffff',

      '--border-subtle':  'rgba(0, 0, 0, 0.06)',
      '--border-default': 'rgba(0, 0, 0, 0.12)',
      '--border-strong':  'rgba(0, 0, 0, 0.25)',

      '--text-primary':   '#1a1d2e',
      '--text-secondary': '#4a5068',
      '--text-muted':     '#9fa6bc',

      '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08)',
      '--shadow-md': '0 4px 20px rgba(0,0,0,0.10)',
      '--shadow-lg': '0 8px 40px rgba(0,0,0,0.12)',
    },
  },
  {
    id: 'not-marathon',
    name: 'Not Marathon',
    bsTheme: 'dark',
    onApply() { __setFavicon('#000000', '#c0fe04'); },
    vars: {
      // ── Backgrounds ─────────────────────────────────
      '--bg-base':        '#000000',
      '--bg-surface':     '#0a0a0a',
      '--bg-card':        '#0f0f0f',
      '--bg-card-raised': '#161616',
      '--bg-input':       '#080808',

      // ── Borders ─────────────────────────────────────
      '--border-subtle':  'rgba(192, 254, 4, 0.08)',
      '--border-default': 'rgba(192, 254, 4, 0.18)',
      '--border-strong':  'rgba(192, 254, 4, 0.45)',

      // ── Text ────────────────────────────────────────
      '--text-primary':   '#f0f0f0',
      '--text-secondary': '#999999',
      '--text-muted':     '#444444',

      // ── Accents ─────────────────────────────────────
      '--accent-primary':       '#c0fe04',
      '--accent-primary-faint': 'rgba(192, 254, 4, 0.15)',
      '--accent-yellow':        '#c0fe04',
      '--accent-yellow-dim':    '#8ab403',
      '--accent-red':           '#cc2200',
      '--accent-blue':          '#5b86e5',
      '--accent-green':         '#3ba55c',

      // ── Radii — Not Marathon: zero rounded corners ───────
      '--radius-sm':   '0px',
      '--radius-md':   '0px',
      '--radius-lg':   '0px',
      '--radius-full': '0px',

      // ── Shadows ─────────────────────────────────────
      '--shadow-sm': '0 1px 3px rgba(0,0,0,0.8)',
      '--shadow-md': '0 4px 20px rgba(0,0,0,0.8)',
      '--shadow-lg': '0 8px 40px rgba(0,0,0,0.9)',

      // ── Ambient glow ────────────────────────────────
      '--glow-bg': '\n        radial-gradient(ellipse 70% 35% at 50% -5%,  rgba(192,254,4,0.05) 0%, transparent 70%),\n        radial-gradient(ellipse 40% 25% at 90% 95%,  rgba(192,254,4,0.03) 0%, transparent 60%)',

      // ── Typography ──────────────────────────────────
      '--ui-text-transform':      'uppercase',
      '--ui-font':                "'PP Fraktion Mono', var(--font-mono)",
      '--title-letter-spacing':   '-0.4px',
      '--tagline-letter-spacing': '1.5px',
      '--label-letter-spacing':   '1.2px',

      // ── Title ───────────────────────────────────────
      '--color-title-link':       'var(--accent-primary)',
      '--color-title-link-hover': '#ffffff',
      '--color-title-span':       'var(--text-primary)',

      // ── Header links ────────────────────────────────
      '--color-header-link':       'var(--accent-primary)',
      '--color-header-link-hover': '#ffffff',
      '--header-link-decoration':  'none',
      '--header-link-border':      '1px solid var(--accent-yellow-dim)',
      '--header-link-spacing':     '0.8px',

      // ── Labels ──────────────────────────────────────
      '--color-label':            'var(--accent-primary)',
      '--label-link-decoration':  'none',
      '--label-link-border':      '1px solid var(--accent-yellow-dim)',
      '--color-label-link-hover': '#ffffff',

      // ── Icon buttons ────────────────────────────────
      '--color-icon-hover-border': 'var(--accent-primary)',
      '--color-icon-hover-text':   'var(--accent-primary)',

      // ── Panel / banner accent borders ───────────────
      '--ui-panel-border-left': '3px solid var(--accent-primary)',

      // ── Stage buttons ───────────────────────────────
      '--stage-hover-bg':        'rgba(192, 254, 4, 0.05)',
      '--color-stage-hover':     'var(--accent-primary)',
      '--stage-hover-transform': 'none',

      // ── Status heading ──────────────────────────────
      '--status-font-size':            '13px',
      '--status-font-weight':          '600',
      '--color-status-success-border': 'var(--accent-primary)',
      '--color-status-success-bg':     'rgba(192, 254, 4, 0.04)',

      // ── Toggle pills ────────────────────────────────
      '--color-toggle-hover-border':   'var(--accent-primary)',
      '--color-toggle-hover-text':     'var(--accent-primary)',
      '--color-toggle-checked-border': 'var(--accent-primary)',
      '--color-toggle-checked-bg':     'var(--accent-primary-faint)',

      // ── Glow ─────────────────────────────────────────
      '--btn-glow-size':               '0px',

      // ── Copy button ─────────────────────────────────
      '--color-copy-btn-text':         '#000000',
      '--color-copy-btn-hover-bg':     '#ffffff',
      '--color-copy-btn-hover-shadow': 'transparent',

      // ── Info banner ─────────────────────────────────
      '--banner-bg':           'rgba(192, 254, 4, 0.05)',
      '--banner-border-color': 'rgba(192, 254, 4, 0.18)',
      '--color-banner-strong': 'var(--accent-primary)',
      '--color-dismiss-hover': 'var(--accent-primary)',

      // ── Cards ───────────────────────────────────────
      '--card-hover-border':     'rgba(192, 254, 4, 0.30)',
      '--card-hover-glow':       'rgba(192, 254, 4, 0.12)',
      '--color-card-subtitle':   'var(--accent-primary)',
      '--color-card-link':       'var(--accent-primary)',
      '--color-card-link-hover': '#ffffff',

      // ── Alert warning ───────────────────────────────
      '--alert-warning-bg':     'rgba(192, 254, 4, 0.07)',
      '--alert-warning-border': 'rgba(192, 254, 4, 0.22)',
      '--color-alert-warning':  'var(--accent-primary)',
    },
  },
];

// Apply the saved theme immediately — runs synchronously before CSS is parsed,
// so inline vars are in place before the first paint. No flash.
{
  const DEFAULT_THEME = 'original';
  const saved = JSON.parse(localStorage.getItem('theme') || 'null');
  const themes = window.__BF1_THEMES;
  const theme = themes.find(t => t.id === saved?.key)
             || themes.find(t => t.id === DEFAULT_THEME);
  const root = document.documentElement;
  for (const k in theme.vars) root.style.setProperty(k, theme.vars[k]);
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-bs-theme', theme.bsTheme);
  localStorage.setItem('theme', JSON.stringify({ key: theme.id, name: theme.name }));
  theme.onApply?.();
}
