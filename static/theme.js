// Theme management following web.dev pattern
const storageKey = 'theme-preference';

const theme = {
  value: getColorPreference(),
};

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', theme.value);

  document
    .querySelector('#themeToggle')
    ?.setAttribute('aria-label', theme.value);

  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme.value === 'dark' ? '#1e1e2e' : '#fdf6e3'
    );
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

// Set early to prevent flash
reflectPreference();

// Set up toggle on page load
window.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('#themeToggle');

  themeToggle.addEventListener('click', () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
  });
});

// Sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });
