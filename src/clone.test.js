const fs = require('fs').promises;
const clone = require('./clone.js');
const readTree = require('./readTree.js');

beforeEach(async function () {
  await fs.mkdir('./test/hello/world', { recursive: true });
  await fs.writeFile('./test/hello/world/foo.txt', 'Hello world');
  await fs.mkdir('./test/hello/world2');
  await fs.writeFile('./test/foo.txt', 'Hello world');
});

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Clone file (in a different existing directory)', function () {
  return expect(
    clone('./test/foo.txt', './test/test/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone file in a non-existent directory', function () {
  return expect(
    clone('./test/foo.txt', './test/test/nonexist/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone over self', function () {
  return expect(
    clone('./test/foo.txt', './test/foo.txt')
  ).resolves.not.toThrow();
});

test('Clone content', async function () {
  await clone('./test/foo.txt', './test/test/foo.txt');
  const original = fs.readFile('./test/foo.txt', 'utf8');
  const cloned = fs.readFile('./test/test/foo.txt', 'utf8');
  expect(cloned).toEqual(original);
});

test('Clone tree in a non-existent directory', async function () {
  const original = await readTree('./test/hello');
  await clone('./test/hello', './test/hello/clone');
  const cloned = await readTree('./test/hello/clone');
  expect(cloned.pruned).toStrictEqual(original.pruned);
});
