const fs = require('fs').promises;
const path = require('path');

/**
 * Read (text) file
 * @param {string} filepath - path of file
 * @param {string|Object} [options=utf8] - encoding, mode, flag, signal. See https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options
 * @return {Promise<string>} - file content
 * */
const readFile = async function readFile(filepath, options) {
  filepath = path.normalize(filepath);
  if (options === '' || JSON.stringify(options) === '{}') {
    throw new Error('Invalid options argument');
  } else if (!options) {
    options = 'utf8';
  }

  return await fs.readFile(filepath, options);
};

module.exports = readFile;
