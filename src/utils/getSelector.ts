/// <reference lib="dom" />

const getSelectors = (path: Element[]): string => {
  return path
    .reverse()
    .map((elem) => {
      console.log('element', elem.nodeName);
      let selector = '';
      if (elem.id) {
        return `${elem.nodeName.toLowerCase()}#${elem.id}`;
      } else if (elem.className && typeof elem.className === 'string') {
        return `${elem.nodeName.toLowerCase()}.${elem.className}`;
      } else {
        selector = elem.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(' ');
};

export default function getSelectorsFromPathsOrTarget(
  pathsOrTarget: Element[] | EventTarget
): string {
  if (Array.isArray(pathsOrTarget)) {
    return getSelectors(pathsOrTarget);
  } else {
    let path: Element[] = [];
    let target: EventTarget | null = pathsOrTarget as EventTarget;
    while (target) {
      path.push(target as Element);
      target = (target as Element).parentNode;
    }
    return getSelectors(path);
  }
}
