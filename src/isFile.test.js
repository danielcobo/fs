const isFile = require('./isFile.js');

test('Check if path looks like a filepath', async function () {
  expect(await isFile('./hello/world.txt')).toEqual(true);
  expect(await isFile('hello/world/foo.txt')).toEqual(true);
  expect(await isFile('hello/world/.foo')).toEqual(true);
  expect(await isFile('./foo.txt')).toEqual(true);
  expect(await isFile('foo.txt')).toEqual(true);
  expect(await isFile('.dotfile')).toEqual(true);
  expect(await isFile('hello/world')).toEqual(false);
  expect(await isFile('./foo/bar')).toEqual(false);
  expect(await isFile('./')).toEqual(false);
  expect(await isFile('.')).toEqual(false);
  expect(await isFile('')).toEqual(false);
});
