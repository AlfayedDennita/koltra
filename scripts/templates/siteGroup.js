export function siteGroupTemplate({
  siteId,
  siteName,
  siteLogoSrc,
  siteHomePage,
}) {
  return `
    <section id="${siteId}" class="site-group">
      <h3 class="site-group__title">
        <a
          class="site-group__link"
          href="${siteHomePage}"
          target="_blank"
          rel="external"
          title="Kunjungi ${siteName}"
        >
          <img
            class="site-group__logo"
            src="${siteLogoSrc}"
            alt="${siteName}"
          />
          <span class="site-group__link-text">${siteName}</span>
        </a>
      </h3>
      <div class="site-group__posts-wrapper"></div>
    </section>
  `;
}
