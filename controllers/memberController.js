const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const db = require("../db/index")
const dataB = require("../db/queries")


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
    res.redirect("/dashboard")
}

//logout

logout = async (req, res) => {
    req.logout(() => {
        res.json({message: "Logged Out!"})
    })
}

// get the dashboard 
async function getDashboard(req, res) {
    const messages = await dataB.getAllMessages();

    res.render("dashboard", {
        user: req.user,
        messages: messages.rows
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
    try{

        console.log("User Role: ",  req.user.role)
        console.log("user?", req.user)
        if(!req.user || (req.user.role !== 'member' && req.user !== 'admin')) {
            return res.status(403).send("Not allowed to create")
        }

        const text = req.body.message?.trim();
        const title = req.body.title?.trim()

        if (!text) {
            return res.redirect("/dashboard")
        }

        await db.query(
            `
                insert into messages (title, boy_text, user_id)
                values ($1, $2, $3)
            `,
            [title, text, req.user.id]
        )

            res.redirect("/dashboard")
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create message")
    }
}

async function deleteMessage(req, res) {
    try {
        const messageId = req.params.id;
        
        await db.query(
            "DELETE FROM messages WHERE id = $1", 
            [messageId]
        );

        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
}

module.exports = {
    getMemberAuth,
    register,
    logout,
    loginSuccess,
    joinClub,
    createMessage,
    deleteMessage,
    getDashboard
}