const logger = (req, res, next) => {
  console.log(`logger: ${req.method} ${req.url}`);
  next();
};

module.exports = logger;