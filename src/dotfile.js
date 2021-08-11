const path = require('path');

/**
 * Returns dotfile name
 * @param {string} str - filepath string
 * @returns {string} - dotfile name
 */
const dotfile = function dotfile(str) {
  str = path.normalize(str);

  let result = '';
  const slash = str.lastIndexOf(path.sep);
  if (slash < 0) {
    //Slash not found
    if (str[0] === '.' && str !== '.') {
      result = str;
    }
  } else {
    const dot = str.slice(slash).indexOf('.') + slash; //1st dot after slash
    if (slash + 1 === dot) {
      //1st dot is found and immediately after slash
      result = str.slice(dot);
    }
  }
  return result;
};

module.exports = dotfile;
