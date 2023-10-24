import { icons } from './icons.conf'

const iconsName = Object.keys(icons)

const getClasslistValues = (classlist: DOMTokenList): string[] => Array.from(Array.from(classlist).values()).map(value => typeof value === 'string' ? value : '')

const renderIcon = (element:Element):void => {
  const icon = getClasslistValues(element.classList)
    .flatMap(value => value.split('--'))
    .find(value => iconsName.includes(value))
  if (!icon) { throw new Error(`icon - cannot find associate icon for ${getClasslistValues(element.classList).join(',')}`) }
  element.innerHTML = icons[icon] || '';
}

export const setup = () => {
  Array
    .from(document.querySelectorAll('.icon'))
    .forEach(renderIcon)
}
