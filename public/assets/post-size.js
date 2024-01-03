export default function postSize(str) {
  const Regex = /(?:https?:\/\/)?(?:www\.)?[^\s]+\.(?:com|org|net|ru|io|gov|edu|uk|de|jp)(?:\S*)?/gi;
  const noLink = str.replace(Regex, '').trim();

  return noLink.length > 0 ? noLink.length : 0;
}