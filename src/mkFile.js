const fs = require('fs').promises;
const path = require('path');

/**
 * Make a file with content, including any missing path directories
 * @param {string} filepath - path of the file
 * @param {string} content - file text content
 * @param {string|Object} [options=utf8] - encoding, mode, flag, signal. See https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options
 */
const mkFile = async function mkFile(filepath, content, options) {
  await fs.mkdir(path.dirname(filepath), { recursive: true });
  await fs.writeFile(filepath, content, options);
};

module.exports = mkFile;
