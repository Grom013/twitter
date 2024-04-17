const assert = require('chai').assert;
import mail from '../public/assets/mail.js';

describe('Функция проверки email', function () {
  it('если mail валидный', function () {
    const expectedResult = true;
    const result = mail('khalid.096@bk.ru');
    assert.equal(expectedResult, result);
  });
  it('если начинается с запрещенных символов', function () {
    const expectedResult = false;
    const result = mail('.khalid.096@bk.ru');
    assert.equal(expectedResult, result);
  });
  it('если первая часть меньше или равна 3 символам', function () {
    const expectedResult = false;
    const result = mail('kha@bk.ru');
    assert.equal(expectedResult, result);
  });
  it('если нет точки во второй части', function () {
    const expectedResult = false;
    const result = mail('khalid.096@bkru');
    assert.equal(expectedResult, result);
  });
  it('если во второй части после точки меньше 2 символов', function () {
    const expectedResult = false;
    const result = mail('khalid.096@bk.r');
    assert.equal(expectedResult, result);
  });
  it('если во второй части до точки меньше 2 символов', function () {
    const expectedResult = false;
    const result = mail('khalid.096@b.ru');
    assert.equal(expectedResult, result);
  });
  it('если есть запрещенные символы', function () {
    const expectedResult = false;
    const result = mail('khal[id.096@bk.ru');
    assert.equal(expectedResult, result);
  });
});
