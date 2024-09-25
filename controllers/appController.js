// get queries
const { getAllMessagesWithUsernames } = require("../db/queries");

const appGetIndex = async (_req, res) => {
  const messages = await getAllMessagesWithUsernames();
  res.render("index", { messages });
};

const appGetSignup = (_req, res) => {
  // render signup page
  res.render("sign-up");
};

const appPostSignup = (req, res) => {
  // process sign up and redirect to index
  res.status(200).json({ message: "I am in the works" });
};

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
