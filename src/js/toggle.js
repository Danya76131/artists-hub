(function () {
  const KEY = 'lightmode';
  const btn = document.getElementById('theme-switch');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('lightmode');
    if (isDark) {
      localStorage.setItem(KEY, 'active');
    } else {
      localStorage.removeItem(KEY);
    }
  });
})();
