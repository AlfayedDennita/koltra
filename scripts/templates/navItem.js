export default function navItem({ id, name }) {
  return `
    <li>
      <a href="#${id}" title="${name}"><span>${name}</span></a>
    </li>
  `;
}
