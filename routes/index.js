const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController")
const passport = require('passport');

router.get("/", memberController.getMemberAuth)
console.log(memberController)
router.get("/dashboard", memberController.loginSuccess)

router.post("/signup", memberController.register)

router.post(
    "/login", 
    passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}))

router.post("/logout", memberController.logout)

module.exports = router;