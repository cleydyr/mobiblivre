import xpath from 'xpath';
import { DOMParser } from 'xmldom';
import { decode } from 'html-entities';

export const select = (html) => (path) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(decode(html));

  return xpath.select(path, doc);
}

export async function fetchAndselect(url, paths) {
  const response = await fetch(url);

  const html = await response.text();

  return paths.map(path => {
    const [node] = select(html)(path);

    return node.data;
  })
}
