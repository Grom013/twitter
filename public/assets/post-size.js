export default function postSize(str) {
  const end = ['.com', '.org', '.net', '.ru', '.io', '.gov', '.edu', '.uk', '.de', '.jp'];
  const start = ['http://', 'https://', 'www.'];
  const arr = [];
  str.split(' ').forEach((w) => {
    if (end.some((e) => w.includes(e)) || start.some((s) => w.includes(s))) {
      arr.push(w);
    }
  });
  const words = str.split(' ').filter((w) => !arr.includes(w));
  return words.join(' ').length;
}
