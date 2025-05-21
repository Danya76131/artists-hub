const mode = localStorage.getItem('lightmode');
if (mode === 'active') {
  document.documentElement.classList.add('lightmode');
}
