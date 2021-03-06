const fs = require('fs').promises;
const path = require('path');
const isFile = require('./isFile.js');
const mkFile = require('./mkFile.js');

/**
 * Write a file or create a directory path
 * @param {string} mkPath - path to write to
 * @param {string} content - File text content (ignored for directory)
 * @param {string|Object} [options=utf8] - encoding, mode, flag, signal. See https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options
 */
const mk = async function mk(mkPath, content, options) {
  mkPath = path.normalize(mkPath);
  if (isFile(mkPath)) {
    await mkFile(mkPath, content, options);
  } else {
    await fs.mkdir(mkPath, { recursive: true });
  }
};

module.exports = mk;
