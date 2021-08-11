const dotfile = require('./dotfile.js');

test('Get dotfile', async function () {
  expect(await dotfile('./foo/bar')).toEqual('');
  expect(await dotfile('./foo.txt')).toEqual('');
  expect(await dotfile('foo/.bar/hello.txt')).toEqual('');
  expect(await dotfile('foo/bar.ver7.txt')).toEqual('');
  expect(await dotfile('foo/.bar')).toEqual('.bar');
  expect(await dotfile('foo.txt')).toEqual('');
  expect(await dotfile('/foo/.bar')).toEqual('.bar');
  expect(await dotfile('/.foo')).toEqual('.foo');
  expect(await dotfile('.txt')).toEqual('.txt');
});
