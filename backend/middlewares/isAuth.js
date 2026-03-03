const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    //! Get the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    //! Check if token exists
    if (!token) {
      const err = new Error("No token provided, please login");
      err.statusCode = 401;
      return next(err);
    }

    //! Verify the token
    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "masynctechKey",
    );

    if (verifyToken) {
      //! Save the user id in req obj
      req.user = verifyToken.id;
      next();
    }
  } catch (error) {
    const err = new Error("Token expired or invalid, please login again");
    err.statusCode = 401;
    next(err);
  }
};

module.exports = isAuthenticated;
