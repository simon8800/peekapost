// get queries
const { getAllMessagesWithUsernames } = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { validateUser } = require("../utils/validations");

const appGetIndex = async (_req, res) => {
  const messages = await getAllMessagesWithUsernames();
  res.render("index", { messages });
};

const appGetSignup = (_req, res) => {
  // render signup page
  res.render("sign-up");
};

const appPostSignup = [
  validateUser,
  (req, res) => {
    // validate for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }
    const { username, password, adminpassword } = req.body;
    res.status(200).json({ message: "I am in the works" });
  },
];

const appGetSignin = (_req, res) => {
  // render signup page
  res.render("sign-in");
};

const appPostSignin = (req, res) => {
  // process sign up and redirect to index
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
