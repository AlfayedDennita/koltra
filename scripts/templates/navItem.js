export default function navItem({ id, name }) {
  return `
    <li>
      <a class="nav__link" href="#${id}" title="${name}">
        <span class="nav__link-container">${name}</span>
      </a>
    </li>
  `;
}
