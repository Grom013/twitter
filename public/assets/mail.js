export default function mail(str) {
  if (typeof str !== 'string' || !str) {
    return false;
  }

  const start = ['.', ',', '-', '@', '=', ';', ':'];
  const invalidSymbol = ['[', ']', ';', ':'];

  if (str.includes('@')) {
    const [first, second] = str.split('@');
    if (invalidSymbol.some((i) => str.includes(i))) {
      return false;
    }
    if (start.some((s) => str.startsWith(s))) {
      return false;
    }
    if (
      first.length <= 3
        || !second.includes('.')
        || second.indexOf('.') <= 1
        || second.length - second.indexOf('.') <= 2
    ) {
      return false;
    }
    return true;
  }

  return false;
}
