import platformFilter from '../public/assets/platformFilter.js';

const { assert } = require('chai');

describe('Функция фильтрации платформы', function () {
  it('должна заменять слово "охуели" на "****"', function () {
    const expectedResult = 'Да вы что?? **** там?';
    const result = platformFilter('Да вы что?? Охуели там?', ['охуели']);
    assert.equal(expectedResult, result);
  });
  it('должна заменять слово "охуели" и "дебилы" на "****"', function () {
    const expectedResult = 'Да вы что?? **** там **** ?';
    const result = platformFilter('Да вы что?? Охуели там дебилы ?', ['охуели', 'дебилы']);
    assert.equal(expectedResult, result);
  });
  it('два раза одно слово ', function () {
    const expectedResult = 'Эти **** не выполнили задачу, **** позорные';
    const result = platformFilter('Эти скоты не выполнили задачу, скоты позорные', ['скоты']);
    assert.equal(expectedResult, result);
  });
  it('нет мата ', function () {
    const expectedResult = 'Все сделано очень хорошо';
    const result = platformFilter('Все сделано очень хорошо', ['скоты']);
    assert.equal(expectedResult, result);
  });
  it('пустой массив слов ', function () {
    const expectedResult = 'Все сделано очень хорошо';
    const result = platformFilter('Все сделано очень хорошо', ['скоты']);
    assert.equal(expectedResult, result);
  });
});
