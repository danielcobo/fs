const fs = require('fs').promises;
const path = require('path');

/**
 * Copy file or tree to a new location
 * (Alias of native fs.promises.copyFile)
 *
 * @param {string} sourcePath - old path
 * @param {string} destinationPath - new path
 */
const cloneFile = async function cloneFile(sourcePath, destinationPath) {
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  return fs.copyFile(sourcePath, destinationPath);
};

module.exports = cloneFile;
