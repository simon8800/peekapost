const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const { validPassword } = require("../utils/passwordUtils");

const verifyCallback = async (username, password, done) => {};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
