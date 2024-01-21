export default function hashTag(str) {
  return str.split(' ').map((s) => {
    if (s.startsWith('#')) {
      return s.replace(s, `<a href="/search?tag=${s.slice(1)}" >${s}</a>`);
    }
    return s;
  }).join(' ');
}

console.log(hashTag('Кто еще изучает #javascript ?'));
