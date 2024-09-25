// get queries
const { getAllMessagesWithUsernames, createUser } = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { validateUser } = require("../utils/validations");
const { genPassword } = require("../utils/passwordUtils");

const appGetIndex = async (_req, res) => {
  const messages = await getAllMessagesWithUsernames();
  res.render("index", { messages });
};

const appGetSignup = (_req, res) => {
  res.render("sign-up");
};

const appPostSignup = [
  validateUser,
  async (req, res) => {
    // Validate for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }

    const { username, password, adminpassword } = req.body;
    const { hash } = await genPassword(password);

    let makeAdmin = false;
    if (adminpassword === process.env.APP_ADMIN_PASSWORD) {
      makeAdmin = true;
    }

    const { success, message } = await createUser({
      username: username,
      hash: hash,
      admin: makeAdmin,
    });

    if (success) {
      res.redirect("/sign-in");
    } else {
      res.status(400).render("sign-up", { createUserError: message });
    }
  },
];

const appGetSignin = (_req, res) => {
  // render signup page
  res.render("sign-in");
};

const appPostSignin = (req, res) => {
  const { username, password } = req.body;
  // Authenticate user by comparing password to hash from database
  res.status(200).json({ message: "I am in the works" });
};

const appPostMessage = (req, res) => {
  // process message and redirect to index
  res.status(200).json({ message: "I am in the works" });
};

module.exports = {
  appGetIndex,
  appGetSignup,
  appPostSignup,
  appPostMessage,
  appGetSignin,
  appPostSignin,
};
