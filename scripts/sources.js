export const BASE_URL = 'https://api-berita-indonesia.vercel.app/';
export const SITES = [
  {
    name: 'ANTARA News',
    path: 'antara',
    logo: 'antara.png',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'olahraga',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'Merdeka.com',
    path: 'merdeka',
    logo: 'merdeka.png',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'olahraga',
      technology: 'teknologi',
      automotive: 'otomotif',
      lifestyle: 'gaya',
    },
  },
  {
    name: 'SINDONews',
    path: 'sindonews',
    logo: 'sindonews.png',
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
    path: 'suara',
    logo: 'suara.png',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'bola',
      technology: 'tekno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
    },
  },
  {
    name: 'Tribun',
    path: 'tribun',
    logo: 'tribun.png',
    categoryPaths: {
      hot: 'terbaru',
      sport: 'bola',
      technology: 'techno',
      automotive: 'otomotif',
      lifestyle: 'lifestyle',
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
