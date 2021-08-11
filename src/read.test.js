const fs = require('fs').promises;
const path = require('path');
const read = require('./read.js');

describe('Read file tests', function () {
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
    expect(await read(filepath)).toEqual(txt);
  });

  test('Read file with encoding option', async function () {
    expect(await read(filepath, 'utf8')).toEqual(txt);
  });

  test('Read file with invalid encoding option', async function () {
    let error = 'No error';
    await read(filepath, '').catch(function (err) {
      error = err.message;
    });
    expect(error).toEqual('Invalid options argument');

    error = 'No errror';
    await read(filepath, {}).catch(function (err) {
      error = err.message;
    });
    expect(error).toEqual('Invalid options argument');
  });
});

describe('Read tree tests', function () {
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
    const tree = await read('test');
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
    const tree = await read('test');
    expect(tree.dirs).toStrictEqual(dirs);
  });

  test('Read multiple trees', async function () {
    const dirs = ['test/foo/bar', 'test/more/foobar'].map(function (p) {
      return path.normalize(p);
    });
    const files = ['test/more/foo.txt'].map(function (p) {
      return path.normalize(p);
    });
    const trees = await read(['test/foo', 'test/more/']);
    expect(trees.dirs).toStrictEqual(dirs);
    expect(trees.files).toStrictEqual(files);
  });

  test('Fail reading tree due to invalid rootPath argument', async function () {
    let error = 'No error';
    await read(1).catch(function (err) {
      error = err.message;
    });

    expect(
      /^Invalid readPath argument, .+ instead of string$/.test(error)
    ).toEqual(true);
  });
});
