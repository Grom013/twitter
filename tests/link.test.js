import { assert } from 'chai';
import links from '../public/assets/links.js';

describe('Функция обезки доменов', function () {
  it('без cсылок', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе:';
    const result = links('Зацените мои проекты на гитхабе:');
    assert.equal(expectedResult, result);
  });
  it('c доменом https://', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе: <a href="https://github.com/burtovoy">github.com/burtovoy</a>';
    const result = links('Зацените мои проекты на гитхабе: https://github.com/burtovoy');
    assert.equal(expectedResult, result);
  });
  it('c доменом http://', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе: <a href="http://github.com/burtovoy">github.com/burtovoy</a>';
    const result = links('Зацените мои проекты на гитхабе: http://github.com/burtovoy');
    assert.equal(expectedResult, result);
  });
  it('c доменом www.', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе: <a href="www.github.com/burtovoy">github.com/burtovoy</a>';
    const result = links('Зацените мои проекты на гитхабе: www.github.com/burtovoy');
    assert.equal(expectedResult, result);
  });
  it('c двумя ссылками', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе: '
            + '<a href="https://github.com/burtovoy">github.com/burtovoy</a>'
            + ' <a href="https://github.com/grom013">github.com/grom013</a>';
    const result = links('Зацените мои проекты на гитхабе: https://github.com/burtovoy https://github.com/grom013');
    assert.equal(expectedResult, result);
  });
  it('c ссылками в разных местах', function () {
    const expectedResult = '<a href="https://github.com/grom013">github.com/grom013</a> Зацените мои проекты на гитхабе: '
            + '<a href="https://github.com/burtovoy">github.com/burtovoy</a>';
    const result = links('https://github.com/grom013 Зацените мои проекты на гитхабе: https://github.com/burtovoy');
    assert.equal(expectedResult, result);
  });
  it('c разными доменами', function () {
    const expectedResult = 'Зацените мои проекты на гитхабе: '
            + '<a href="https://github.com/burtovoy">github.com/burtovoy</a>'
            + ' <a href="http://github.com/grom013">github.com/grom013</a>'
            + ' <a href="www.google.com">google.com</a>';
    const result = links('Зацените мои проекты на гитхабе: https://github.com/burtovoy http://github.com/grom013 www.google.com');
    assert.equal(expectedResult, result);
  });
});
