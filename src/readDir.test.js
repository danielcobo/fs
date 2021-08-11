const fs = require('fs').promises;
const path = require('path');
const readDir = require('./readDir.js');

beforeEach(function () {
  return (async function () {
    await fs.mkdir('./test/more', { recursive: true });
    await fs.writeFile('./test/foo.txt', 'Hello world');
    await fs.writeFile('./test/more/foo.txt', 'Hello world');
  })();
});

afterEach(function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Read directory and include dir path', async function () {
  const dirPath = './test';

  let FSitems = await fs.readdir(dirPath);
  FSitems = FSitems.map(function (item) {
    return path.join(dirPath, item);
  });

  const readDirItems = await readDir(dirPath);

  expect(FSitems).toStrictEqual(readDirItems);
});
