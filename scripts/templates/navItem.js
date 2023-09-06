export function navItemTemplate({ id, name }) {
  return `
    <li>
      <a class="header__nav-link" href="#${id}" title="${name}">
        <span class="header__nav-link-container">${name}</span>
      </a>
    </li>
  `;
}
