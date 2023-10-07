const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userSchema = require("../model/userSchema.js")
const passport = require("passport")

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userSchema.findById(jwt_payload.id);

        if(!user){
            return done(null,false)
        }
        
        return done(null, user)

    } catch (error) {
        return done(err, false)
    }

}));