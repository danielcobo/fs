const fs = require('fs').promises;
const path = require('path');
const COPYFILE_EXCL = require('fs').constants.COPYFILE_EXCL;

/**
 * Copy file or tree to a new location
 * (Alias of native fs.promises.copyFile)
 *
 * @param {string} sourcePath - old path
 * @param {string} destinationPath - new path
 * @param {Object} [options] - options object (optional)
 * @param {boolean} [options.overwrite=true] - will not overwrite existing file
 */
const cloneFile = async function cloneFile(
  sourcePath,
  destinationPath,
  options
) {
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  if (options && !options.overwrite) {
    return fs
      .copyFile(sourcePath, destinationPath, COPYFILE_EXCL)
      .catch(function (err) {
        if (!/^EEXIST: file already exists, copyfile /.test(err.message)) {
          throw err;
        }
      });
  } else {
    return fs.copyFile(sourcePath, destinationPath);
  }
};

module.exports = cloneFile;
