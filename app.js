require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const appRouter = require("./routes/appRouter")

const app = express();

/*
Set view engine, views path, and assets path
*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// TODO
// Set up passport 



// Set up routes
app.use(appRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})