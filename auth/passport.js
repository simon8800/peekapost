const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserById, getUserByUsername } = require("../db/queries");
const { validPassword } = require("../utils/passwordUtils");

const verifyCallback = async (username, password, done) => {
  try {
    // Look for user
    const user = await getUserByUsername(username);

    // User with username not found
    if (!user) {
      return done(null, false, { message: "Username not found" });
    }

    // User found, does password match?
    const isValid = await validPassword(password, user.hash);
    if (isValid) {
      // - Password matches
      return done(null, user, { message: "Successfully logged in" }); // message stored in session cookies
    } else {
      // - Password does not match
      return done(null, false, { message: "Incorrect password" }); // message stored in session cookies
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

/*
Sessions and serialization
*/

// Info to store in session data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Extract data when retrieving a session
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
