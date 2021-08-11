const fs = require('fs').promises;
const path = require('path');
const cloneFile = require('./cloneFile.js');
const cloneTree = require('./cloneTree.js');

/**
 * Clone file or directory
 * @param {string} originalPath - original path
 * @param {string} destinationPath - clone path
 */
const clone = async function clone(originalPath, destinationPath) {
  originalPath = path.normalize(originalPath);
  destinationPath = path.normalize(destinationPath);
  const stat = await fs.stat(originalPath);
  if (stat.isDirectory()) {
    await cloneTree(originalPath, destinationPath);
  } else {
    await cloneFile(originalPath, destinationPath);
  }
};

module.exports = clone;
