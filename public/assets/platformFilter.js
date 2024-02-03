export default function platformFilter(text, arr = []) {
  const textWords = text.split(' ');
  return textWords.map((w) => {
    if (arr.includes(w.toLowerCase())) {
      w = '****';
    }
    return w;
  }).join(' ');
}

console.log(platformFilter('Все сделано очень хорошо'));
