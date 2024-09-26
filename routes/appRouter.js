const express = require("express");
const appRouter = express.Router();
const {
  appGetIndex,
  appGetSignup,
  appPostSignup,
  appPostMessage,
  appDeleteMessage,
  appGetSignin,
  appPostSignin,
  appGetSignout,
} = require("../controllers/appController");
const { isAuth, isAdmin } = require("../auth/authMiddleware");

appRouter.get("/", appGetIndex);
appRouter.get("/sign-up", appGetSignup);
appRouter.post("/sign-up", appPostSignup);
appRouter.get("/sign-in", appGetSignin);
appRouter.post("/sign-in", appPostSignin);
appRouter.post("/message", isAuth, appPostMessage);
appRouter.delete("/message/:id", isAdmin, appDeleteMessage);
appRouter.get("/sign-out", appGetSignout);

appRouter.get("*", (req, res) => {
  res.status(404).json({ message: "Route not available" });
});

module.exports = appRouter;
