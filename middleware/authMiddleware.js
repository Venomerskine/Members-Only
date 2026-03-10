isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.status(402).json({message: "Unauthorized"})
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

module.exports = {
    isAuthenticated,
    requireRole
}