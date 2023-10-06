import { icons } from './icons.conf'

const iconsName = Object.keys(icons)

const renderIcon = (element) => {
  const icon = element.classList
    .values()
    .flatMap(value => value.split('--'))
    .find(value => iconsName.includes(value))
  if (!icon) { throw new Error(`icon - cannot find associate icon for ${element.classList.values().map(className => className.join(','))}`) }
  element.innerHTML = !icon ? '' : icons[icon]
}

export const setup = () => {
  Array
    .from(document.querySelectorAll('.icon'))
    .forEach(renderIcon)
}
