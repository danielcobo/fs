const fs = require('fs').promises;
const mkFile = require('./mkFile.js');

afterEach(async function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Write a file', async function () {
  const txt = 'Hello world';
  const path = './test/foo/bar.txt';
  await mkFile(path, txt);
  const written = await fs.readFile(path, 'utf8');
  expect(written).toEqual(txt);
});
