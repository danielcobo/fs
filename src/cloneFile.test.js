const fs = require('fs').promises;
const cloneFile = require('./cloneFile.js');

beforeEach(async function () {
  await fs.mkdir('./test');
  await fs.writeFile('./test/foo.txt', 'Hello world');
});

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Clone file (in a different existing directory)', function () {
  return expect(
    cloneFile('./test/foo.txt', './test/test/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone file in a non-existent directory', function () {
  return expect(
    cloneFile('./test/foo.txt', './test/test/nonexist/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone over self', function () {
  return expect(
    cloneFile('./test/foo.txt', './test/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone content', async function () {
  await cloneFile('./test/foo.txt', './test/test/foo.txt');
  const original = fs.readFile('./test/foo.txt', 'utf8');
  const cloned = fs.readFile('./test/test/foo.txt', 'utf8');
  expect(cloned).toEqual(original);
});
