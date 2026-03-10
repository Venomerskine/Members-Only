const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController")
const passport = require('passport');
const {isAuthenticated, requireRole} = require("../middleware/authMiddleware")

router.get("/", memberController.getMemberAuth)
router.get("/dashboard",isAuthenticated ,memberController.loginSuccess)

router.post("/signup", memberController.register)

router.post(
    "/login", 
    passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/"
}))

router.post("/join", isAuthenticated, memberController.joinClub)
router.post("/logout", memberController.logout)
router.post("/messages", requireRole("member", "admin"), memberController.createMessage);
router.delete("/messages/:id", requireRole("admin"), memberController.deleteMessage);

module.exports = router;