const fs = require('fs').promises;
const rm = require('./rm.js');

beforeEach(async function () {
  await fs.mkdir('./test/hello/world', { recursive: true });
  await fs.writeFile('./test/hello/world/foo.txt', 'Hello world');
});

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Remove a file', async function () {
  const path = './test/hello/world/foo.txt';
  await rm('./test/hello/world/foo.txt');
  let error = 'No error';
  const stat = await fs
    .stat('./test/hello/world/foo.txt')
    .catch(function (err) {
      error = err.message;
    });
  expect(/^ENOENT: no such file or directory/.test(error)).toEqual(true);
});

test('Remove a file - silent fail for non-existent', async function () {
  const path = './this/path/does/not/exist.txt';
  await rm('./test/hello/world/foo.txt');
  let error = 'No error';
  const stat = await fs
    .stat('./test/hello/world/foo.txt')
    .catch(function (err) {
      error = err.message;
    });
  expect(/^ENOENT: no such file or directory/.test(error)).toEqual(true);
});

test('Remove a directory', async function () {
  const path = './test/hello/world/foo.txt';
  await rm('./test/hello/');
  let error = 'No error';
  const stat = await fs.stat('./test/hello/world/').catch(function (err) {
    error = err.message;
  });
  expect(/^ENOENT: no such file or directory/.test(error)).toEqual(true);
});
