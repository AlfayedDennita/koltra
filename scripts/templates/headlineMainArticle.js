export function headlineMainArticleTemplate({
  link,
  thumbnailSrc,
  title,
  description,
  siteName,
  siteLogoSrc,
}) {
  return `
    <article class="headline__main-article">
      <a
        class="headline__main-article-link"
        href="${link}"
        target="_blank"
        rel="external"
        title="${title}"
      >
        <img
          class="headline__main-article-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='/images/broken-image.jpg'"
        />
        <div class="headline__main-article-content">
          <img
            class="headline__main-article-logo"
            src="${siteLogoSrc}"
            alt="${siteName}"
          />
          <h3 class="headline__main-article-title truncate">
            ${title}
          </h3>
          <p class="headline__main-article-description truncate">
            ${description}
          </p>
        </div>
      </a>
    </article>
  `;
}

export function headlineMainArticleSkeleton() {
  return `
    <div
      class="headline__main-article headline__main-article--skeleton skeleton"
    ></div>
  `;
}
