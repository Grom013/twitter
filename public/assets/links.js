export default function links(str) {
  const arr = [];
  str.split(' ').forEach((w) => {
    let link = w;
    let modW = w;
    const domen = w.startsWith('https://') || w.startsWith('http://') || w.startsWith('www.');
    if (domen) {
      const domens = ['https://', 'http://', 'www.'];
      domens.forEach((d) => {
        if (w.startsWith(d)) {
          link = w.slice(d.length);
        }
      });
      modW = `<a href="${w}">${link}</a>`;
    }
    arr.push(modW);
  });
  return arr.join(' ');
}

console.log(links('Зацените мои проекты на гитхабе: https://github.com/burtovoy'));
