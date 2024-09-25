const bcrypt = require("bcryptjs");

// Generate a salt asynchronously with 10 salt rounds
async function genPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return { hash: hash };
  } catch (error) {
    console.log(error);
  }
}

async function validPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { genPassword, validPassword };
