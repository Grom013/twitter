import { assert } from 'chai';
import similar from '../public/assets/recommended.js';

describe('Функция для рекомендации профилей', function () {
  it('когда count равен 2', function () {
    const expectedResult = [258, 257];
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
    const count = 2;
    const result = similar(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });

  it('когда count равен 1', function () {
    const expectedResult = [258];
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
    const count = 1;
    const result = similar(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });

  it('когда count равен 3', function () {
    const expectedResult = [258, 259];
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
      {
        id: 259,
        posts: ['#linkipark был не очень хорош , но #linkinpark спел свой хит очень хорошо'],
      },
    ];
    const count = 2;
    const result = similar(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });

  it('когда count равен 2 и профилей 4', function () {
    const expectedResult = [258, 259];
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
      {
        id: 259,
        posts: ['#linkipark был не очень хорош , но #linkinpark спел свой хит очень хорошо'],
      },
      {
        id: 260,
        posts: ['мне не понравилось на концерте'],
      },
    ];
    const count = 2;
    const result = similar(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });

  it('когда count равен 4 и профилей 6 и выводит по наиболее подходящим', function () {
    const expectedResult = [258, 259, 257, 260];
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
      {
        id: 259,
        posts: ['#linkipark был не очень хорош , но #linkinpark спел свой хит очень хорошо'],
      },
      {
        id: 260,
        posts: ['мне не понравилось на концерте'],
      },
      {
        id: 261,
        posts: ['мне не понравилось на концерте лучше бы послушал #shakira'],
      },
      {
        id: 262,
        posts: ['мне не понравилось на концерте лучше бы послушал #eminem'],
      },

    ];
    const count = 4;
    const result = similar(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
});
