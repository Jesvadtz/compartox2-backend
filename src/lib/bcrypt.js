const bycript = require("bcrypt");
const saltRounds = 10;

function myHash(plainText) {
  return bycript.hash(plainText, saltRounds);
}

module.exports = {
  ...bycript,
  hash: myHash,
};
