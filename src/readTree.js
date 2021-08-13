const fs = require('fs').promises;
const path = require('path');
const readDir = require('./readDir.js');

/**
 * Tree subpaths without root path
 * @typedef {Object} PrunedTree
 * @property {Array<string>} dirs - paths of subdirectories without root path
 * @property {Array<string>} files - filepaths without root path
 */

/**
 * Paths within a given tree
 * @typedef {Object} Tree
 * @property {Array<string>} dirs - paths of subdirectories
 * @property {Array<string>} files - filepaths
 * @property {Array<string>} root - path/s of tree/s being read
 * @property {PrunedTree} prunedTree - see PrunedTree class
 */

/**
 * Removes roots from paths
 * @param {Array<string>} root root path
 * @param {Array<string>} paths pats strings
 * @returns {Array<string>} - paths without root
 */
const pruneRoot = function (roots, paths) {
  const nRoots = roots.map(function (root) {
    return path.normalize(root);
  });

  return paths.map(function (p) {
    for (let i = 0; i < nRoots.length; i++) {
      const nRoot = nRoots[i];
      if (p.slice(0, nRoot.length) === nRoot) {
        if (nRoot === '.' || nRoots === '') {
          //also means file/folder starts with '.'
          return p;
        }
        return p.slice(nRoot.length + path.sep.length);
      }
    }
    //nRoots.length === 1 && nRoot === './'
    return p;
  });
};

/**
 * Get a list of files and folders recursively.
 * @param {(string|Array<string>)} rootPath Directory path or array of paths.
 * @return {Promise<Tree>} three of paths. If array of rootPath was used, results are merged into one tree
 */
const readTree = async function readTree(rootPath) {
  if (typeof rootPath === 'string') {
    rootPath = [rootPath];
  } else if (!Array.isArray(rootPath)) {
    throw TypeError('rootPath must be a path or an array of paths.');
  }
  rootPath = rootPath.map(function (p) {
    return path.normalize(p);
  });

  const tree = {
    files: [],
    dirs: [],
    root: rootPath,
  };
  let toCheck = rootPath.slice();
  for (let i = 0; i < toCheck.length; ++i) {
    const item = toCheck[i];
    const stat = await fs.stat(item);
    if (stat.isDirectory()) {
      tree.dirs.push(item);
      toCheck = toCheck.concat(await readDir(item));
    } else {
      tree.files.push(item);
    }
  }
  tree.dirs = tree.dirs.slice(rootPath.length);
  tree.pruned = {
    files: pruneRoot(rootPath, tree.files),
    dirs: pruneRoot(rootPath, tree.dirs),
  };

  return tree;
};

module.exports = readTree;
