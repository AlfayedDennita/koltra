import { SITES, CATEGORIES } from './sources.js';
import navItemTemplate from './templates/navItem.js';
import categoryTemplate from './templates/category.js';

const navList = document.querySelector('nav ul');
navList.innerHTML = '';
SITES.forEach(({ path, name }) => {
  navList.innerHTML += navItemTemplate({ id: path, name });
});

const categoryList = document.querySelector('#categories');
categoryList.innerHTML = '';
CATEGORIES.forEach((category, index) => {
  categoryList.innerHTML += categoryTemplate({
    ...category,
    selected: index === 0,
  });
});

const categoryButtons = document.querySelectorAll('.category');
categoryButtons.forEach((categoryButton) => {
  categoryButton.addEventListener('click', () => {
    if (!categoryButton.classList.contains('selected')) {
      const activeCategory = document.querySelector('.category.selected');
      activeCategory.classList.remove('selected');
      categoryButton.classList.add('selected');
    }
  });
});

const navToggle = document.querySelector('#nav-toggle');
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

const navButtons = document.querySelectorAll('nav a');
navButtons.forEach((navButton) => {
  navButton.addEventListener('click', () => {
    navToggle.classList.remove('open');
    document.body.style.overflowY = 'auto';
  });
});
