export default function similar(profile, profiles, count) {
  const extractTags = (posts) => {
    const tags = [];
    posts.forEach((post) => {
      const words = post.split(' ');
      words.forEach((word) => {
        if (word.startsWith('#')) {
          tags.push(word);
        }
      });
    });
    return tags;
  };

  const countIntersection = (arr1, arr2) => {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter((tag) => set2.has(tag)).length;
  };

  const profileTags = extractTags(profile.posts);

  const sortedRecommendations = profiles
    .filter((otherProfile) => otherProfile.id !== profile.id)
    .map((otherProfile) => {
      const otherProfileTags = extractTags(otherProfile.posts);
      const intersectionCount = countIntersection(profileTags, otherProfileTags);

      return { id: otherProfile.id, intersectionCount };
    })
    .sort((a, b) => b.intersectionCount - a.intersectionCount);

  return sortedRecommendations.slice(0, count).map((recommendation) => recommendation.id);
}

// Пример использования
const profile = {
  id: 256,
  posts: [
    'Привет. #сегодня был на концерте группы #linkinpark',
    'как вам новая песня #linkinpark',
  ],
};

const profiles = [
  {
    id: 257,
    posts: ['Сегодня вышла новая версия #javascript', 'как вам новая версия #javascript?'],
  },
  {
    id: 258,
    posts: ['#сегодня мне не понравилась новая песня #linkinpark'],
  },
];

const count1 = 1;
console.log(similar(profile, profiles, count1)); // Вернет [258]

const count2 = 2;
console.log(similar(profile, profiles, count2)); // Вернет [258, 257]
