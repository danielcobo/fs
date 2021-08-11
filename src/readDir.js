const fs = require('fs').promises;
const path = require('path');

/**
 * Get contents of a directory (including directory path).
 * In contrast the native fs.readdir returns only contents,
 * without directory path.
 * @param {string} dirPath
 * @return {Promise<Array>} True/false if path is directory.
 */
const readDir = async function readDir(dirPath) {
  let items = await fs.readdir(dirPath);

  items = items.map(function (item) {
    //console.log(dirPath, item, path.join(dirPath, item));
    return path.join(dirPath, item);
  });
  return items;
};

module.exports = readDir;
