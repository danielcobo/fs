const fs = require('fs').promises;
const path = require('path');
const readFile = require('./readFile.js');
const readTree = require('./readTree.js');

/**
 * Read file or directory
 * @param {string|Array<string>} readPath - path to read
 * @param {string|Object} [options=utf8] - encoding, mode, flag, signal. See https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options
 * @returns {Promise<Tree|string>} - tree object or text file content string
 */
const read = async function read(readPath, options) {
  if (Array.isArray(readPath)) {
    return await readTree(readPath);
  } else if (typeof readPath === 'string') {
    const stat = await fs.stat(readPath);
    if (stat.isDirectory()) {
      return await readTree(readPath);
    } else {
      return await readFile(readPath, options);
    }
  } else {
    throw new Error(
      'Invalid readPath argument, received ' +
        typeof readPath +
        ' instead of string'
    );
  }
};

module.exports = read;
