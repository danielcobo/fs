const fs = require('fs').promises;
const path = require('path');
const readTree = require('./readTree.js');

beforeEach(function () {
  return (async function () {
    await fs.mkdir('test/foo/bar', { recursive: true });
    await fs.writeFile('test/foo.txt', 'Hello world');
    await fs.mkdir('test/more/foobar', { recursive: true });
    await fs.writeFile('test/more/foo.txt', 'Hello world');
  })();
});

afterAll(function () {
  return fs.rmdir('test', { recursive: true, force: true });
});

test('Read tree files', async function () {
  const files = ['test/foo.txt', 'test/more/foo.txt'].map(function (val) {
    return path.normalize(val);
  });
  const tree = await readTree('test');
  expect(tree.files).toStrictEqual(files);
});

test('Read tree folders', async function () {
  const dirs = [
    'test/foo',
    'test/more',
    'test/foo/bar',
    'test/more/foobar',
  ].map(function (p) {
    return path.normalize(p);
  });
  const tree = await readTree('test');
  expect(tree.dirs).toStrictEqual(dirs);
});

test('Read multiple trees', async function () {
  const dirs = ['test/foo/bar', 'test/more/foobar'].map(function (p) {
    return path.normalize(p);
  });
  const files = ['test/more/foo.txt'].map(function (p) {
    return path.normalize(p);
  });
  const trees = await readTree(['test/foo', 'test/more/']);
  expect(trees.dirs).toStrictEqual(dirs);
  expect(trees.files).toStrictEqual(files);
});

test('Fail reading tree due to invalid rootPath argument', async function () {
  let error = 'No error';
  await readTree(1).catch(function (err) {
    error = err.message;
  });

  expect(error).toEqual('rootPath must be a path or an array of paths.');
});
