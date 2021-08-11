const fs = require('fs').promises;
const path = require('path');
const readTree = require('./readTree.js');
const cloneFile = require('./cloneFile.js');

/**
 * Clones a tree including it's files
 * @param {string} originalPath - original tree path
 * @param {string} destinationPath - destination path for clones of tree content
 */
const cloneTree = async function readFile(originalPath, destinationPath) {
  const tree = await readTree(originalPath);

  //Clone directories
  for (let i = 0; i < tree.pruned.dirs.length; i++) {
    const dirPath = tree.pruned.dirs[i];
    //TO-DO: hashmap speed improvement
    await fs.mkdir(path.join(destinationPath, dirPath), { recursive: true });
  }

  //Clone files
  for (let i = 0; i < tree.files.length; i++) {
    const filePath = tree.files[i];
    const prunedPath = tree.pruned.files[i];
    await cloneFile(filePath, path.join(destinationPath, prunedPath));
  }
};

module.exports = cloneTree;
