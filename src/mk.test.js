const fs = require('fs').promises;
const mk = require('./mk.js');

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Write a file', async function () {
  const txt = 'Hello world';
  const path = './test/foo/bar.txt';
  await mk(path, txt);
  const written = await fs.readFile(path, 'utf8');
  expect(written).toEqual(txt);
});

test('Write a directory', async function () {
  const path = './test/foo/bar/hello/world';
  await mk(path);
  const stat = await fs.stat(path);
  expect(stat.isDirectory()).toEqual(true);
});
