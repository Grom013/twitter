const assert = require('chai').assert;
import timeFn from '../public/assets/time.js';

describe('Функция преобразования числа во время', function () {
  it('выходим за рамки одного года', function () {
    const expectedResult = 'более года назад';
    const result = timeFn(366 * 24 * 60);
    assert.equal(expectedResult, result);
  });
  it('выходим за рамки рамки 60 минут', function () {
    const expectedResult = '1 час назад';
    const result = timeFn(63);
    assert.equal(expectedResult, result);
  });
  it('выходим за рамки рамки 24 часов', function () {
    const expectedResult = '1 день назад';
    const result = timeFn(25 * 60);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '2 минуты назад';
    const result = timeFn(2);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '5 минут назад';
    const result = timeFn(5);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '21 минуту назад';
    const result = timeFn(21);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '11 минут назад';
    const result = timeFn(11);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '2 часа назад';
    const result = timeFn(2 * 60);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '6 часов назад';
    const result = timeFn(6 * 60);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '2 дня назад';
    const result = timeFn(2 * 24 * 60);
    assert.equal(expectedResult, result);
  });
  it('проверяем спряжение', function () {
    const expectedResult = '2 дня назад';
    const result = timeFn(2 * 24 * 60);
    assert.equal(expectedResult, result);
  });
});
