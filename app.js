require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require('method-override')

const passport = require("./config/passport.js");
const sessionMiddleware = require("./config/session.js");

const app = express()


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'pulblic')));
app.use(express.json());
app.use(methodOverride('__method'));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require('./routes/index.js'));

app.listen(3000, () => {
    console.log("Server Runnig")
});