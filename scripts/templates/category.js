export default function categoryTemplate({ id, name, icon, selected }) {
  return `
    <li>
      <button
        class="category${selected ? ' selected' : ''}"
        type="button"
        title="${name}"
        data-category="${id}"
      >
        <i class="${icon} fa-fw"></i>
        ${name}
      </button>
    </li>
  `;
}
