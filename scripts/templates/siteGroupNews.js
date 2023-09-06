export function siteGroupNewsTemplate({ link, title, thumbnailSrc, date }) {
  return `
    <article class="site-group__news">
      <a
        class="site-group__news-link"
        href="${link}"
        target="_blank"
        ref="external"
        title="${title}"
      >
        <img
          class="site-group__news-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='/images/broken-image.jpg'"
        />
        <div class="site-group__news-content">
          <p class="site-group__news-date">${date ? date : 'Tanpa Tanggal'}</p>
          <h4 class="site-group__news-title truncate">
            ${title}
          </h4>
        </div>
      </a>
    </article>
  `;
}

export function siteGroupNewsSkeleton() {
  return `
    <div class="site-group__news">
      <div class="site-group__news-link">
        <div class="site-group__news-thumbnail skeleton"></div>
        <div class="site-group__news-content">
          <div class="site-group__news-date site-group__news-date--skeleton skeleton"></div>
          <div class="site-group__news-title site-group__news-title--skeleton skeleton"></div>
        </div>
      </div>
    </div>
  `;
}
