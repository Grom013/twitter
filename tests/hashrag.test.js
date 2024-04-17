import hashTag from '../public/assets/hashtag.js';

const { assert } = require('chai');

describe('Функция перевода хештега в ссылку', function () {
  it('хештег в конце слова', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> ?';
    const result = hashTag('Кто еще изучает #javascript ?');
    assert.equal(expectedResult, result);
  });
  it('хештег в начале слова', function () {
    const expectedResult = '<a href="/search?tag=javascript" >#javascript</a> -мой любимый язык';
    const result = hashTag('#javascript -мой любимый язык');
    assert.equal(expectedResult, result);
  });
  it('два хештега', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> и <a href="/search?tag=python" >#python</a> ?';
    const result = hashTag('Кто еще изучает #javascript и #python ?');
    assert.equal(expectedResult, result);
  });
  it('три хештега', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> , <a href="/search?tag=golang" >#golang</a> и <a href="/search?tag=python" >#python</a> ?';
    const result = hashTag('Кто еще изучает #javascript , #golang и #python ?');
    assert.equal(expectedResult, result);
  });
  it('хештег в середине слова', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> усердно ?';
    const result = hashTag('Кто еще изучает #javascript усердно ?');
    assert.equal(expectedResult, result);
  });
  it('без хештегов', function () {
    const expectedResult = 'Кто еще изучает программирование ?';
    const result = hashTag('Кто еще изучает программирование ?');
    assert.equal(expectedResult, result);
  });
  it('в разных местах', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> но работает с <a href="/search?tag=python" >#python</a> ?';
    const result = hashTag('Кто еще изучает #javascript но работает с #python ?');
    assert.equal(expectedResult, result);
  });
});
