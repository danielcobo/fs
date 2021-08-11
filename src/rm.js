const fs = require('fs').promises;
const path = require('path');

/**
 * Remove file or directory
 * @param {string} rmPath - path to remove - can be file or directory path
 */
const rm = async function rm(rmPath) {
  rmPath = path.normalize(rmPath);
  await fs.rm(rmPath, { recursive: true });
};

module.exports = rm;
