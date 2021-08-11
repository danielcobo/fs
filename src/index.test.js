const fs = require('./index.js');
const mk = require('./mk.js');
const read = require('./read.js');
const clone = require('./clone.js');
const rm = require('./rm.js');

test('Test method links', async function () {
  expect(fs.mk).toStrictEqual(mk);
  expect(fs.read).toStrictEqual(read);
  expect(fs.clone).toStrictEqual(clone);
  expect(fs.rm).toStrictEqual(rm);
});
