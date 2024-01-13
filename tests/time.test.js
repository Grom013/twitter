import { assert } from 'chai';
import time from "../public/assets/time.js";

describe('Функция преобразования числа во время', function () {
    it('выходим за рамки одного года', function () {
        const expectedResult = 'более года назад';
        const result = time(366*24*60);
        assert.equal(expectedResult, result);
    });
    it('выходим за рамки рамки 60 минут', function () {
        const expectedResult = '1 час назад';
        const result = time(63);
        assert.equal(expectedResult, result);
    });
    it('выходим за рамки рамки 24 часов', function () {
        const expectedResult = '1 день назад';
        const result = time(25*60);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '2 минуты назад';
        const result = time(2);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '5 минут назад';
        const result = time(5);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '21 минуту назад';
        const result = time(21);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '11 минут назад';
        const result = time(11);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '2 часа назад';
        const result = time(2*60);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '6 часов назад';
        const result = time(6*60);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '2 дня назад';
        const result = time(2*24*60);
        assert.equal(expectedResult, result);
    });
    it('проверяем спряжение', function () {
        const expectedResult = '2 дня назад';
        const result = time(2*24*60);
        assert.equal(expectedResult, result);
    });
});