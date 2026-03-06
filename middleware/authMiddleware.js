exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }

    res.status(402).json({message: "Unauthorized"})
}