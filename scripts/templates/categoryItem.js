export function categoryItemTemplate({ id, name, icon, selected }) {
  return `
    <li>
      <button
        class="news-by-category__category-button${
          selected ? ' news-by-category__category-button--selected' : ''
        }"
        type="button"
        title="${name}"
        data-category="${id}"
      >
        <i class="news-by-category__category-button-icon ${icon} fa-fw"></i>
        ${name}
      </button>
    </li>
  `;
}
