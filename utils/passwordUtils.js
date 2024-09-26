const bcrypt = require("bcryptjs");

// Generate a salt asynchronously with 10 salt rounds
async function genPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log(error);
  }
}

async function validPassword(password, hash) {
  let results = await bcrypt.compare(password, hash);
  return results;
}

module.exports = { genPassword, validPassword };
