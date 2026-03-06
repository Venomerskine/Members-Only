const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController")

router.get("/", memberController.getMemberAuth)

router.post("/signup", memberController.register)

router.post("/login", passport.authenticate("local"), memberController.loginSuccess)

router.post("/logout", memberController.logout)

module.exports = router;