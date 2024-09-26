const express = require("express");
const appRouter = express.Router();
const {
  appGetIndex,
  appGetSignup,
  appPostSignup,
  appPostMessage,
  appGetSignin,
  appPostSignin,
  appGetSignout,
} = require("../controllers/appController");
const { isAuth } = require("../auth/authMiddleware");

appRouter.get("/", appGetIndex);
appRouter.get("/sign-up", appGetSignup);
appRouter.post("/sign-up", appPostSignup);
appRouter.get("/sign-in", appGetSignin);
appRouter.post("/sign-in", appPostSignin);
appRouter.post("/message", isAuth, appPostMessage);
appRouter.get("/sign-out", appGetSignout);

appRouter.get("*", (req, res) => {
  res.status(404).json({ message: "Route not available" });
});

module.exports = appRouter;
