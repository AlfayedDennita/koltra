export function loadErrorTemplate() {
  return `
    <div class="load-error">
      <i class="load-error__icon fa-solid fa-heart-crack fa-fw"></i>
      <p class="load-error__description">
        Gagal memuat data. Muat ulang halaman dalam beberapa saat.
      </p>
    </div>
  `;
}
