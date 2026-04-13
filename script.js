const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const storageKey = 'site-theme';

function applyTheme(theme) {
    const isLight = theme === 'light';
    body.classList.toggle('light-mode', isLight);
    themeToggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem(storageKey, theme);
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
        return savedTheme;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
});

const initialTheme = getInitialTheme();
applyTheme(initialTheme);
