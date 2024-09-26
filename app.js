require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const { provideUser } = require("./auth/authMiddleware");
const passport = require("passport");
const appRouter = require("./routes/appRouter");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
require("./auth/passport");

const app = express();

/*
Set view engine, views path, and assets path
*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

/*
Parses body and path
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
Set up flash for flash messages
*/
app.use(flash());

// Create session store
const sessionStore = new pgSession({ pool });

// Session
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// Authentication w/Passport
// app.use(passport.initialize());
app.use(passport.session());
app.use(provideUser);

// Set up routes
app.use(appRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
