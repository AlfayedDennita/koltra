export function headlineSidePostTemplate({
  link,
  thumbnailSrc,
  title,
  description,
  siteName,
  siteLogoSrc,
}) {
  return `
    <article class="headline__side-post">
      <a
        class="headline__side-post-link"
        href="${link}"
        target="_blank"
        rel="external"
        title="${title}"
      >
        <img
          class="headline__side-post-thumbnail"
          src="${thumbnailSrc}"
          alt="${title}"
          onerror="this.onerror=null; this.src='images/broken-image.jpg'"
        />
        <div class="headline__side-post-content">
          <img
            class="headline__side-post-logo"
            src="${siteLogoSrc}"
            alt="${siteName}"
          />
          <h3 class="headline__side-post-title truncate">
            ${title}
          </h3>
          <p class="headline__side-post-description truncate">
            ${description}
          </p>
        </div>
      </a>
    </article>
  `;
}

export function headlineSidePostSkeleton() {
  return `
    <div class="headline__side-post-link">
      <div
        class="skeleton headline__side-post-thumbnail headline__side-post-thumbnail--skeleton"
      ></div>
      <div class="headline__side-post-content">
        <div
          class="skeleton headline__side-post-logo headline__side-post-logo--skeleton"
        ></div>
        <div
          class="skeleton headline__side-post-title headline__side-post-title--skeleton"
        ></div>
        <div
          class="skeleton headline__side-post-description headline__side-post-description--skeleton"
        ></div>
      </div>
    </div>
  `;
}
