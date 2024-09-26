const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated && req.user.admin) {
    next();
  } else {
    res.status(401).json({
      message:
        "You are not authorized to view this resouce because you are not an admin",
    });
  }
};

// Middleware to make 'user' available in all templates
const provideUser = (req, res, next) => {
  res.locals.user = req.user; // req.user is set by Passport if authenticated
  next();
};

module.exports = { isAuth, isAdmin, provideUser };
