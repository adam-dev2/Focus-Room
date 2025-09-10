import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/User.js";
import dotenv from 'dotenv'
dotenv.config();

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URI
},async(accessToken,refreshToken,profile,done) => {
    try{
        let user = await User.findOne({googleId:profile.id});
        if(!user) {
            user = new User({
                googleId:profile.id,
                name:profile.displayName,
                email:profile.emails[0].value,
                avatar:profile.photos[0].value
            });
            user.save();
        }
        return done(null,user);
    }catch(err){
        return done(err,null);
    }
}));
// Serialize User for session usage cause instead of providing whole user object the user id is enough.
passport.serializeUser((user,done) => {
    done(null,user.id);
})
// return the whole user with the help user id which also known as deserializing / descontructing
passport.deserializeUser(async(id,done) => {
    const user = await User.findById(id);
    done(null,user);
})