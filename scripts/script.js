import { BASE_URL, SITES, CATEGORIES } from './sources.js';
import navItemTemplate from './templates/navItem.js';
import {
  headlineMainArticleTemplate,
  headlineMainArticleSkeleton,
} from './templates/headlineMainArticle.js';
import {
  headlineSideArticleTemplate,
  headlineSideArticleSkeleton,
} from './templates/headlineSideArticle.js';
import loadErrorTemplate from './templates/loadError.js';
import categoryTemplate from './templates/category.js';

const navList = document.querySelector('.nav__list');
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

function getRandomArrayIndex(array) {
  return Math.floor(Math.random() * (array.length - 1));
}

async function renderHeadlineNews() {
  const mainArticleWrapper = document.querySelector(
    '.headline__main-article-wrapper'
  );
  const sideArticlesWrapper = document.querySelector(
    '.headline__side-articles-wrapper'
  );

  mainArticleWrapper.innerHTML = '';
  sideArticlesWrapper.innerHTML = '';

  mainArticleWrapper.innerHTML += headlineMainArticleSkeleton();
  for (let i = 0; i < 4; i++) {
    sideArticlesWrapper.innerHTML += headlineSideArticleSkeleton();
  }

  const headlineNews = [];

  for (let i = 0; i < 5; i++) {
    const randomSiteIndex = getRandomArrayIndex(SITES);
    const randomCategoryIndex = getRandomArrayIndex(CATEGORIES);
    const site = SITES[randomSiteIndex];
    const sitePath = site.path;
    const categoryPath = site.categoryPaths[CATEGORIES[randomCategoryIndex].id];

    try {
      const res = await fetch(`${BASE_URL}${sitePath}/${categoryPath}`);
      const news = await res.json();

      if (!news.success) {
        throw new Error();
      }

      headlineNews.push({
        siteName: site.name,
        siteLogoSrc: site.logoSrc,
        ...news.data.posts[getRandomArrayIndex(news.data.posts)],
      });
    } catch (error) {
      headlineNews.push(null);
    }
  }

  mainArticleWrapper.innerHTML = '';
  sideArticlesWrapper.innerHTML = '';

  headlineNews.forEach((news, index) => {
    if (index === 0) {
      if (news === null) {
        mainArticleWrapper.innerHTML += loadErrorTemplate();
      } else {
        mainArticleWrapper.innerHTML += headlineMainArticleTemplate({
          link: news.link,
          thumbnailSrc: news.thumbnail,
          title: news.title,
          description: news.description,
          siteName: news.siteName,
          siteLogoSrc: news.siteLogoSrc,
        });
      }
    } else {
      if (news === null) {
        sideArticlesWrapper.innerHTML += loadErrorTemplate();
      } else {
        sideArticlesWrapper.innerHTML += headlineSideArticleTemplate({
          link: news.link,
          thumbnailSrc: news.thumbnail,
          title: news.title,
          description: news.description,
          siteName: news.siteName,
          siteLogoSrc: news.siteLogoSrc,
        });
      }
    }
  });
}

renderHeadlineNews();

function toggleNav() {
  if (!window.matchMedia('(min-width: 768px)').matches) {
    navToggle.classList.toggle('nav-toggle--open');

    const isNavOpened = navToggle.classList.contains('nav-toggle--open');

    navToggle.setAttribute(
      'title',
      (isNavOpened ? 'Close' : 'Open') + ' Navigation'
    );

    if (isNavOpened) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }
}

const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  toggleNav();
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    toggleNav();

    const target = document.querySelector(navLink.getAttribute('href'));
    target?.scrollIntoView();
  });
});
