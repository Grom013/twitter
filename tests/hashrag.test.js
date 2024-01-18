import { assert } from 'chai';
import hashTag from '../public/assets/hashtag.js';

describe('Функция перевода хештега в ссылку', function () {
  it('правильная ссылка', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> ?';
    const result = hashTag('Кто еще изучает #javascript ?');
    assert.equal(expectedResult, result);
  });
});
