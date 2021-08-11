const path = require('path');
const dotfile = require('./dotfile');

/**
 * Returns true/false if a path string is a file
 * @param {string} str - path string
 * @returns {boolean} - true if path looks like a file
 */
const isFile = function isFile(str) {
  if (path.extname(str) || dotfile(str)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isFile;
