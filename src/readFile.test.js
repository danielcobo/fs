const fs = require('fs').promises;
const readFile = require('./readFile.js');

const filepath = './test/foo.txt';
const txt = 'Hello world';

beforeEach(function () {
  return (async function () {
    await fs.mkdir('./test');
    await fs.writeFile(filepath, txt);
  })();
});

afterEach(function () {
  return fs.rmdir('./test', { recursive: true, force: true });
});

test('Read file', async function () {
  expect(await readFile(filepath)).toEqual(txt);
});

test('Read file with encoding option', async function () {
  expect(await readFile(filepath, 'utf8')).toEqual(txt);
});

test('Read file with invalid encoding option', async function () {
  let error = 'No error';
  await readFile(filepath, '').catch(function (err) {
    error = err.message;
  });
  expect(error).toEqual('Invalid options argument');

  error = 'No errror';
  await readFile(filepath, {}).catch(function (err) {
    error = err.message;
  });
  expect(error).toEqual('Invalid options argument');
});
