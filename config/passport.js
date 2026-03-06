const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

passport.use(
    new LocalStrategy(
        { usernameField: "username" },
        async (username, password, done) => {
            try {
                const user = await User.findUserByUserName(username);

                if (!user) {
                    return done(null, false);
                };

                const match = await bcrypt.compare(password, user.password)

                if (!match) {
                    console.log("User and password mismatch")
                    return done(null, user);
                };
                return done(null, user);

            } catch(err){
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findUserById(id);
        console.log("deserialized User", user)
        done(null, user);
    } catch (err) {
        done(err);
    }
})

module.exports = passport;