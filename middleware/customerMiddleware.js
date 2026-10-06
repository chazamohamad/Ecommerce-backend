const customer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({
      message: "Customer access only",
    });
  }

  next();
};

module.exports = customer;
