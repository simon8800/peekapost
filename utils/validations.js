const { body } = require("express-validator");

const usernameLengthError = "must be between 3 and 30 characters long";
const passwordLengthError = "must be between 6 and 30 characters long";
const messageLengthError = "must be between 3 and 200 characters long";
const alphanumError = "must be alphanumeric characters";

const validateUser = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`Username ${alphanumError}`)
    .isLength({ min: 3, max: 30 })
    .withMessage(`Username ${usernameLengthError}`),
  body("password")
    .trim()
    .isAlphanumeric()
    .withMessage(`Password ${alphanumError}`)
    .isLength({ min: 6, max: 30 })
    .withMessage(`Password ${passwordLengthError}`),
  body("adminpassword")
    .trim()
    .optional({ values: "falsy" })
    .isAlphanumeric()
    .withMessage(`Admin password ${alphanumError}`),
];

const validateMessage = [
  body("messageContent")
    .trim()
    .isAlphanumeric()
    .withMessage(`Message ${alphanumError}`)
    .isLength({ min: 3, max: 200 })
    .withMessage(`Message ${messageLengthError}`),
];

module.exports = { validateUser, validateMessage };
