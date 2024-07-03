import {expect} from 'chai';

describe('Hello World', () => {
  it('should return "Hello, World!"', () => {
    const result = helloWorld();
    expect(result).to.equal('Hello, World!');
  });
});

function helloWorld(): string {
  return 'Hello, World!';
}
