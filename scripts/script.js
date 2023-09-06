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
import siteGroupTemplate from './templates/siteGroup.js';
import {
  siteGroupNewsTemplate,
  siteGroupNewsSkeleton,
} from './templates/siteGroupNews.js';
import loadErrorTemplate from './templates/loadError.js';
import categoryTemplate from './templates/category.js';

const navList = document.querySelector('.nav__list');
navList.innerHTML = '';
SITES.forEach(({ path, name }) => {
  navList.innerHTML += navItemTemplate({ id: path, name });
});

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
      const res = await fetch(`${BASE_URL}${path}/${categoryPaths[category]}`);
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
