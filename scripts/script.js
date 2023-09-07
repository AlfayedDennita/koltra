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
import { categoryItemTemplate } from './templates/categoryItem.js';
import { siteGroupTemplate } from './templates/siteGroup.js';
import {
  siteGroupPostTemplate,
  siteGroupPostSkeleton,
} from './templates/siteGroupPost.js';

function init() {
  renderNavItems();
  listenToNavActions();
  renderHeadlinePosts();
  renderCategoryItems();
  listenToCategoryButtons();
  renderSiteGroups();
  renderSiteGroupNews();
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
    const isNavOpened = document.body.dataset.openNav === 'true';

    if (isNavOpened) {
      delete document.body.dataset.openNav;
    } else {
      document.body.dataset.openNav = 'true';
    }

    const navToggle = document.querySelector('.header__nav-toggle');
    navToggle.setAttribute(
      'title',
      (isNavOpened ? 'Close' : 'Open') + ' Navigation'
    );
  }
}

function listenToNavActions() {
  const navToggle = document.querySelector('.header__nav-toggle');
  navToggle.addEventListener('click', toggleNav);

  const navLinks = document.querySelectorAll('.header__nav-link');
  for (const navLink of navLinks) {
    navLink.addEventListener('click', () => {
      toggleNav();

      const targetSiteGroup = document.querySelector(
        navLink.getAttribute('href')
      );
      targetSiteGroup?.scrollIntoView();
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

function renderCategoryItems() {
  const categoryList = document.querySelector(
    '.news-by-category__category-list'
  );
  categoryList.innerHTML = '';
  for (const [index, category] of CATEGORIES.entries()) {
    categoryList.innerHTML += categoryItemTemplate({
      ...category,
      selected: index === 0,
    });
  }
}

function listenToCategoryButtons() {
  const categoryButtons = document.querySelectorAll(
    '.news-by-category__category-button'
  );

  for (const categoryButton of categoryButtons) {
    categoryButton.addEventListener('click', () => {
      const selectedButtonClass = 'news-by-category__category-button--selected';
      const selectedCategoryButton = document.querySelector(
        '.' + selectedButtonClass
      );

      if (categoryButton !== selectedCategoryButton) {
        selectedCategoryButton.classList.remove(selectedButtonClass);
        categoryButton.classList.add(selectedButtonClass);

        renderSiteGroupNews(categoryButton.dataset.category);
      }
    });
  }
}

function renderSiteGroups() {
  const sitesWrapper = document.querySelector(
    '.news-by-category__sites-wrapper'
  );
  sitesWrapper.innerHTML = '';

  for (const { name, path, logoSrc, homePage } of SITES) {
    sitesWrapper.innerHTML += siteGroupTemplate({
      siteId: path,
      siteName: name,
      siteLogoSrc: logoSrc,
      siteHomePage: homePage,
    });
  }
}

function renderSiteGroupNews(category = 'hot') {
  for (const { path, categoryPaths } of SITES) {
    const siteGroupPostsWrapper = document.querySelector(
      `#${path} .site-group__posts-wrapper`
    );

    siteGroupPostsWrapper.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      siteGroupPostsWrapper.innerHTML += siteGroupPostSkeleton();
    }

    const getPostData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}${path}/${categoryPaths[category]}`
        );
        const {
          data: { posts },
        } = await res.json();

        siteGroupPostsWrapper.innerHTML = '';

        for (const [index, post] of posts.entries()) {
          const maxPosts = Math.min(posts.length, 5);

          if (maxPosts < index + 1) {
            break;
          }

          siteGroupPostsWrapper.innerHTML += siteGroupPostTemplate({
            link: post.link,
            title: post.title,
            thumbnailSrc: post.thumbnail,
            date: post.pubDate
              ? Intl.DateTimeFormat('id').format(new Date(post.pubDate))
              : 'Tanpa Tanggal',
          });
        }
      } catch (error) {
        siteGroupPostsWrapper.innerHTML = loadErrorTemplate();
      }
    };

    getPostData();
  }
}
