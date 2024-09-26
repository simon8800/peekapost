const { getAllMessagesWithUsernames, createUser } = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { validateUser } = require("../utils/validations");
const { genPassword } = require("../utils/passwordUtils");
const passport = require("passport");

const appGetIndex = async (req, res) => {
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
    const hash = await genPassword(password);

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

const appGetSignin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  const messages = req.flash("error");
  return res.render("sign-in", { messages: messages });
};

const appPostSignin = passport.authenticate("local", {
  failureRedirect: "/sign-in",
  successRedirect: "/",
  failureFlash: true,
  successFlash: true,
});

const appPostMessage = (req, res) => {
  // process message and redirect to index
  res.status(200).json({ message: "I am in the works" });
};

const appGetSignout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/sign-in");
  });
};

module.exports = {
  appGetIndex,
  appGetSignup,
  appPostSignup,
  appPostMessage,
  appGetSignin,
  appPostSignin,
  appGetSignout,
};
