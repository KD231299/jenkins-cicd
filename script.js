// Small interactive bits: year & theme toggle
document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  if (document.documentElement.style.filter === 'invert(0.98) hue-rotate(180deg)') {
    document.documentElement.style.filter = '';
    localStorage.removeItem('portfolio-theme');
  } else {
    // quick "darken" visual toggle (keeps CSS minimal)
    document.documentElement.style.filter = 'invert(0.98) hue-rotate(180deg)';
    localStorage.setItem('portfolio-theme','dark');
  }
});

// Remember theme across reload
if (localStorage.getItem('portfolio-theme') === 'dark') {
  document.documentElement.style.filter = 'invert(0.98) hue-rotate(180deg)';
}
