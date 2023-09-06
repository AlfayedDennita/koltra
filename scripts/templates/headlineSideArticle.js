export function headlineSideArticleTemplate({
  link,
  thumbnailSrc,
  title,
  description,
  siteName,
  siteLogoSrc,
}) {
  return `
    <article class="headline__side-article">
      <a
        class="headline__side-article-link"
        href="${link}"
        target="_blank"
        rel="external"
        title="${title}"
      >
        <img
          class="headline__side-article-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='/images/broken-image.jpg'"
        />
        <div class="headline__side-article-content">
          <img
            class="headline__side-article-logo"
            src="${siteLogoSrc}"
            alt="${siteName}"
          />
          <h3 class="headline__side-article-title truncate">
            ${title}
          </h3>
          <p class="headline__side-article-description truncate">
            ${description}
          </p>
        </div>
      </a>
    </article>
  `;
}

export function headlineSideArticleSkeleton() {
  return `
    <div class="headline__side-article">
      <div class="headline__side-article-link">
        <div
          class="headline__side-article-thumbnail headline__side-article-thumbnail--skeleton skeleton"
        ></div>
        <div class="headline__side-article-content">
          <div
            class="headline__side-article-logo headline__side-article-logo--skeleton skeleton"
          ></div>
          <div
            class="headline__side-article-title headline__side-article-title--skeleton skeleton"
          ></div>
          <div
            class="headline__side-article-description headline__side-article-description--skeleton skeleton"
          ></div>
        </div>
      </div>
    </div>
  `;
}
