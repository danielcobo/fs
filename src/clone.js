const fs = require('fs').promises;
const path = require('path');
const cloneFile = require('./cloneFile.js');
const cloneTree = require('./cloneTree.js');

/**
 * Clone file or directory
 * @param {string} originalPath - original path
 * @param {string} destinationPath - clone path
 * @param {Object} [options] - options object (optional)
 * @param {boolean} [options.overwrite=true] - will not overwrite existing file
 */
const clone = async function clone(originalPath, destinationPath, options) {
  originalPath = path.normalize(originalPath);
  destinationPath = path.normalize(destinationPath);
  const stat = await fs.stat(originalPath);
  if (stat.isDirectory()) {
    await cloneTree(originalPath, destinationPath, options);
  } else {
    await cloneFile(originalPath, destinationPath, options);
  }
};

module.exports = clone;
