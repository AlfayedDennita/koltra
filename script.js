const navToggle = document.querySelector('#nav-toggle');
const navButtons = document.querySelectorAll('nav a');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');

  const isNavOpened = navToggle.classList.contains('open');

  navToggle.setAttribute(
    'title',
    (isNavOpened ? 'Close' : 'Open') + ' Navigation'
  );

  if (isNavOpened) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }
});

navButtons.forEach((navButton) => {
  navButton.addEventListener('click', () => {
    navToggle.classList.remove('open');
    document.body.style.overflowY = 'auto';
  });
});
