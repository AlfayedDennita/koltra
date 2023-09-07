export const API_BASE_URL = 'https://api-berita-indonesia.vercel.app/';

export const SITES = [
  {
    name: 'ANTARA News',
    homePage: 'https://www.antaranews.com',
    logoSrc: 'images/site-logos/antara.png',
    path: 'antara',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'olahraga',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'Okezone.com',
    homePage: 'https://www.okezone.com',
    logoSrc: 'images/site-logos/okezone.png',
    path: 'okezone',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'sports',
      technology: 'techno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'SINDONews',
    homePage: 'https://www.sindonews.com',
    logoSrc: 'images/site-logos/sindonews.png',
    path: 'sindonews',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'sports',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'Suara.com',
    homePage: 'https://suara.com',
    logoSrc: 'images/site-logos/suara.png',
    path: 'suara',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'bola',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'Tempo.co',
    homePage: 'https://www.tempo.co',
    logoSrc: 'images/site-logos/tempo.png',
    path: 'tempo',
    categoryPaths: {
      hot: 'nasional',
      sport: 'bola',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'gaya',
    },
  },
];

export const CATEGORIES = [
  {
    id: 'hot',
    name: 'Terbaru',
    icon: 'fa-solid fa-fire',
  },
  {
    id: 'sport',
    name: 'Olahraga',
    icon: 'fa-solid fa-futbol',
  },
  {
    id: 'technology',
    name: 'Teknologi',
    icon: 'fa-solid fa-mobile-screen',
  },
  {
    id: 'automotive',
    name: 'Otomotif',
    icon: 'fa-solid fa-car',
  },
  {
    id: 'lifestyle',
    name: 'Gaya Hidup',
    icon: 'fa-solid fa-heart',
  },
];
