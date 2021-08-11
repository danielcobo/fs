const fs = require('fs').promises;
const cloneTree = require('./cloneTree.js');
const readTree = require('./readTree.js');

beforeEach(async function () {
  await fs.mkdir('./test/hello/world', { recursive: true });
  await fs.writeFile('./test/hello/world/foo.txt', 'Hello world');
  await fs.mkdir('./test/hello/world2');
});

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Clone tree in a non-existent directory', async function () {
  const original = await readTree('./test/hello');
  await cloneTree('./test/hello', './test/hello/clone');
  const clone = await readTree('./test/hello/clone');
  expect(clone.pruned).toStrictEqual(original.pruned);
});
