const assert = require('chai').assert;
import postSize from '../public/assets/post-size.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });
  it('с двумя ссылками', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! burtovoy.ru google.com');
    assert.equal(expectedResult, result);
  });
  it('только с ссылками', function () {
    const expectedResult = 0;
    const result = postSize('burtovoy.ru google.com');
    assert.equal(expectedResult, result);
  });
  it('только с одной ссылкой', function () {
    const expectedResult = 0;
    const result = postSize('www.burtovoy.ru');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой c www', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! www.burtovoy.com');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой http', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! http://burtovoy.com');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой https', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! https://burtovoy.com');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой ru', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! burtovoy.ru');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой com', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! burtovoy.com');
    assert.equal(expectedResult, result);
  });
  it('с одной ссылкой org', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет! burtovoy.org');
    assert.equal(expectedResult, result);
  });
});
