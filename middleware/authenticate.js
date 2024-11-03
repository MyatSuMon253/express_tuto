const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../utils/AppError");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Unauthorized("Unauthorized");
    }
    jwt.verify(
      token.split(" ")?.[1],
      process.env.JWT_SECRET,
      (err, decodedToken) => {
        console.log(decodedToken);
        if (err) {
          console.log(err);
          throw new Unauthorized("Invalid Token");
        }

        req.userId = decodedToken.userId;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};
