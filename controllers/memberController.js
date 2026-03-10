const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const db = require("../db/index")


// get the home auth page
async function getMemberAuth(req, res) {
    res.render("auth.ejs")
}

// register new user
const register = async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.createUser(first_name, last_name, username, email, hash);

         req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: "error",
                    message: "Login after registration failed"
                });
            }

            return res.json({
                status: "success",
                redirect: "/dashboard"
            });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({status: "error", message: "Registration Failed"})
    }

}

// login
loginSuccess = (req, res) => {
    res.render("dashboard", {user: req.user})
}

//logout

logout = async (req, res) => {
    req.logout(() => {
        res.json({message: "Logged Out!"})
    })
}

async function logout(req, res) {
    
}

async function joinClub (req, res){
    const code = req.body.join;


    const userId = req.user.id

    if(!userId){
        return res.status(401).json({ status: "error", message: "You must be logged in" })
    }

    if (code  === process.env.MEMBERSHIP_CODE){
        try{
            const query = 'UPDATE users SET role = $1 WHERE id = $2'
            await db.query(query,['member', userId])

            req.session.role = 'member'
            req.user.role = 'member'

            return res.json({status: "success", message: "You are now a member"})
        } catch(err){
            console.error(err);
            return res.status(500).json({ status: "error", message: "Database error" });
        }
    } else {
        return res.status(403).json({ status: "error", message: "Incorrect secret code" });
    }
}

async function createMessage(req, res) {

}

async function deleteMessage(req, res) {
    
}

module.exports = {
    getMemberAuth,
    register,
    logout,
    loginSuccess,
    joinClub,
    createMessage,
    deleteMessage
}