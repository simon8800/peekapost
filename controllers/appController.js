const {
  getAllMessagesWithUsernames,
  createUser,
  createMessage,
  deleteMessageById,
} = require("../db/queries");
const { validationResult } = require("express-validator");
const { validateUser, validateMessage } = require("../utils/validations");
const { genPassword } = require("../utils/passwordUtils");
const passport = require("passport");

const appGetIndex = async (req, res) => {
  const messages = await getAllMessagesWithUsernames();
  return res.render("index", { messages: messages });
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

    // Check if user entered valid admin password
    let makeAdmin = false;
    if (adminpassword === process.env.APP_ADMIN_PASSWORD) {
      makeAdmin = true;
    }

    // Create user
    const { success, message } = await createUser({
      username: username,
      hash: hash,
      admin: makeAdmin,
    });

    // Redirect to sign-in if successful
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

// somethign in inherently wrong with this code
const appPostMessage = [
  // validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = await getAllMessagesWithUsernames();
      return res.status(400).render("index", {
        messages: messages,
        errors: errors.array(),
      });
    }

    const results = await createMessage({
      messageContent: req.body.messageContent,
      userId: req.user.id,
    });

    if (results.success) {
      results.newMessage.username = req.user.username;
      return res.status(200).json({ data: results.newMessage });
    } else {
      return res.status(400).json(results);
    }
  },
];

const appDeleteMessage = async (req, res) => {
  const messageId = req.params.id;
  const { success, message } = await deleteMessageById(messageId);
  if (success) {
    return res.status(200).json({ success, message });
  } else {
    res.status(500).json({ succes, message });
  }
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
  appDeleteMessage,
  appGetSignin,
  appPostSignin,
  appGetSignout,
};
