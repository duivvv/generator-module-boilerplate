import helloWorld from '../src/index';

describe(`my first test`, () => {

  it(`must say hello world`, () => {
    const actual = helloWorld();
    expect(actual).toBe(`hello world`);
  });

});
