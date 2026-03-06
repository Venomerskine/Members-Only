const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// get the home auth page
async function getMemberAuth(req, res) {
    res.render("auth.ejs")
}

// register new user
register = async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.createUser(first_name, last_name, username, email, hash);

    res.json(user)
}

// login
loginSuccess = (req, res) => {
    res,json({
        message: "Login Seccesful",
        user: req.user
    })
}

//logout

logout = (req, res) => {
    req.logout(() => {
        res.json({message: "Logged Out!"})
    })
}

module.exports = {
    getMemberAuth,
    register,
    loginSuccess,
    logout
}