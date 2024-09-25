const { body } = require("express-validator");

const usernameLengthError = "must be between 3 and 30 characters";
const passwordLengthError = "must be between 6 and 30 characters";
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

module.exports = { validateUser };
