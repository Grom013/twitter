export default function similar(profile, profiles, count) {
  const tags = profile.posts.flatMap(((p) => p.split(' ').filter((t) => t.startsWith('#'))));

  const profilesRec = profiles.map((p) => {
    const profilesTags = p.posts
      .flatMap((post) => post.split(' ')
        .filter((t) => t.startsWith('#')));

    const countTags = tags.filter((t) => profilesTags.includes(t)).length;
    return { id: p.id, countTags };
  })
    .sort((a, b) => b.countTags - a.countTags)
    .slice(0, count)
    .map((profile) => profile.id);
  return profilesRec;
}
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
    posts: [
      'Сегодня вышла новая версия #javascript',
      'как вам новая версия #javascript?',
    ],
  },
  {
    id: 258,
    posts: [
      '#сегодня мне не понравилась новая песня #linkinpark',
    ],
  },
];
const count1 = 2;
similar(profile, profiles, count1); // вернет [258].

const count2 = 1;
console.log(similar(profile, profiles, count2));
