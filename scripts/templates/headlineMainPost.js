export function headlineMainPostTemplate({
  link,
  thumbnailSrc,
  title,
  description,
  siteName,
  siteLogoSrc,
}) {
  return `
    <article class="headline__main-post">
      <a
        class="headline__main-post-link"
        href="${link}"
        target="_blank"
        rel="external"
        title="${title}"
      >
        <img
          class="headline__main-post-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='/images/broken-image.jpg'"
        />
        <div class="headline__main-post-content">
          <img
            class="headline__main-post-logo"
            src="${siteLogoSrc}"
            alt="${siteName}"
          />
          <h3 class="headline__main-post-title truncate">
            ${title}
          </h3>
          <p class="headline__main-post-description truncate">
            ${description}
          </p>
        </div>
      </a>
    </article>
  `;
}

export function headlineMainPostSkeleton() {
  return `
    <div
      class="headline__main-post headline__main-post--skeleton skeleton"
    ></div>
  `;
}
