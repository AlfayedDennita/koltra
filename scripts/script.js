import { API_BASE_URL, SITES, CATEGORIES } from './constants.js';

import { navItemTemplate } from './templates/navItem.js';
import { loadErrorTemplate } from './templates/loadError.js';
import {
  headlineMainPostTemplate,
  headlineMainPostSkeleton,
} from './templates/headlineMainPost.js';
import {
  headlineSidePostTemplate,
  headlineSidePostSkeleton,
} from './templates/headlineSidePost.js';
import siteGroupTemplate from './templates/siteGroup.js';
import {
  siteGroupNewsTemplate,
  siteGroupNewsSkeleton,
} from './templates/siteGroupNews.js';
import categoryTemplate from './templates/category.js';

function init() {
  renderNavItems();
  listenToNavActions();
  renderHeadlinePosts();
}

init();

function renderNavItems() {
  const navList = document.querySelector('.header__nav-list');
  navList.innerHTML = '';
  for (const { path, name } of SITES) {
    navList.innerHTML += navItemTemplate({ id: path, name });
  }
}

function toggleNav() {
  if (!window.matchMedia('(min-width: 768px)').matches) {
    const navToggle = document.querySelector('.header__nav-toggle');

    navToggle.classList.toggle('header__nav-toggle--open');

    const isNavOpened = navToggle.classList.contains(
      'header__nav-toggle--open'
    );

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

function listenToNavActions() {
  const navToggle = document.querySelector('.header__nav-toggle');
  navToggle.addEventListener('click', () => {
    toggleNav();
  });

  const navLinks = document.querySelectorAll('.header__nav-link');
  for (const navLink of navLinks) {
    navLink.addEventListener('click', () => {
      toggleNav();

      const target = document.querySelector(navLink.getAttribute('href'));
      target?.scrollIntoView();
    });
  }
}

function getRandomArrayIndex(array) {
  return Math.round(Math.random() * (array.length - 1));
}

async function renderHeadlinePosts() {
  const mainPostWrapper = document.querySelector(
    '.headline__main-post-wrapper'
  );
  const sidePostsWrapper = document.querySelector(
    '.headline__side-posts-wrapper'
  );

  mainPostWrapper.innerHTML = '';
  sidePostsWrapper.innerHTML = '';

  mainPostWrapper.innerHTML += headlineMainPostSkeleton();
  for (let i = 0; i < 4; i++) {
    sidePostsWrapper.innerHTML += headlineSidePostSkeleton();
  }

  const headlinePosts = [];

  for (let i = 0; i < 5; i++) {
    const randomSiteIndex = getRandomArrayIndex(SITES);
    const randomCategoryIndex = getRandomArrayIndex(CATEGORIES);
    const site = SITES[randomSiteIndex];
    const sitePath = site.path;
    const categoryPath = site.categoryPaths[CATEGORIES[randomCategoryIndex].id];

    try {
      const res = await fetch(`${API_BASE_URL}${sitePath}/${categoryPath}`);
      const {
        success,
        data: { posts },
      } = await res.json();

      if (!success) {
        throw new Error();
      }

      headlinePosts.push({
        siteName: site.name,
        siteLogoSrc: site.logoSrc,
        ...posts[getRandomArrayIndex(posts)],
      });
    } catch (error) {
      headlinePosts.push(null);
    }
  }

  mainPostWrapper.innerHTML = '';
  sidePostsWrapper.innerHTML = '';

  for (const [index, post] of headlinePosts.entries()) {
    if (post === null) {
      mainPostWrapper.innerHTML += loadErrorTemplate();
      continue;
    }

    const postData = {
      ...post,
      thumbnailSrc: post.thumbnail,
    };

    if (index === 0) {
      mainPostWrapper.innerHTML += headlineMainPostTemplate(postData);
    } else {
      sidePostsWrapper.innerHTML += headlineSidePostTemplate(postData);
    }
  }
}

const categoryList = document.querySelector('.news-by-category__category-list');
categoryList.innerHTML = '';
CATEGORIES.forEach((category, index) => {
  categoryList.innerHTML += categoryTemplate({
    ...category,
    selected: index === 0,
  });
});

const categoryButtons = document.querySelectorAll(
  '.news-by-category__category-button'
);
categoryButtons.forEach((categoryButton) => {
  categoryButton.addEventListener('click', () => {
    const activeCategory = document.querySelector(
      '.news-by-category__category-button--selected'
    );

    if (categoryButton !== activeCategory) {
      activeCategory.classList.remove(
        'news-by-category__category-button--selected'
      );
      categoryButton.classList.add(
        'news-by-category__category-button--selected'
      );

      renderSiteGroupNews(categoryButton.dataset.category);
    }
  });
});

function renderSiteGroups() {
  const sitesWrapper = document.querySelector(
    '.news-by-category__sites-wrapper'
  );
  sitesWrapper.innerHTML = '';

  SITES.forEach(({ name, path, logoSrc, homePage }) => {
    sitesWrapper.innerHTML += siteGroupTemplate({
      siteId: path,
      siteName: name,
      siteLogoSrc: logoSrc,
      siteHomePage: homePage,
    });
  });
}

renderSiteGroups();

function renderSiteGroupNews(category = 'hot') {
  SITES.forEach(async ({ path, categoryPaths }) => {
    const siteGroupNewsWrapper = document.querySelector(
      `#${path} .site-group__news-wrapper`
    );
    siteGroupNewsWrapper.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      siteGroupNewsWrapper.innerHTML += siteGroupNewsSkeleton();
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}${path}/${categoryPaths[category]}`
      );
      const {
        data: { posts },
      } = await res.json();

      siteGroupNewsWrapper.innerHTML = '';

      for (const [index, post] of posts.entries()) {
        const maxPosts = Math.min(posts.length, 5);

        if (maxPosts < index + 1) {
          break;
        }

        siteGroupNewsWrapper.innerHTML += siteGroupNewsTemplate({
          link: post.link,
          title: post.title,
          thumbnailSrc: post.thumbnail,
          date: post.pubDate
            ? Intl.DateTimeFormat('id').format(new Date(post.pubDate))
            : null,
        });
      }
    } catch (error) {
      siteGroupNewsWrapper.innerHTML = loadErrorTemplate();
    }
  });
}

renderSiteGroupNews();
