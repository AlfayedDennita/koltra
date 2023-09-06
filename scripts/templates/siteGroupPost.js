export function siteGroupPostTemplate({ link, title, thumbnailSrc, date }) {
  return `
    <article class="site-group__post">
      <a
        class="site-group__post-link"
        href="${link}"
        target="_blank"
        ref="external"
        title="${title}"
      >
        <img
          class="site-group__post-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='/images/broken-image.jpg'"
        />
        <div class="site-group__post-content">
          <p class="site-group__post-date">${date}</p>
          <h4 class="site-group__post-title truncate">
            ${title}
          </h4>
        </div>
      </a>
    </article>
  `;
}

export function siteGroupPostSkeleton() {
  return `
    <div class="site-group__post">
      <div class="site-group__post-link">
        <div class="site-group__post-thumbnail skeleton"></div>
        <div class="site-group__post-content">
          <div class="site-group__post-date site-group__post-date--skeleton skeleton"></div>
          <div class="site-group__post-title site-group__post-title--skeleton skeleton"></div>
        </div>
      </div>
    </div>
  `;
}
