import passport from "passport";
import passportLocal from "passport-local"


let localStrategy=passportLocal.localStrategy;

let initPassportLocal=()=>{
    passport.use(new localStrategy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true
        },
        async (req, email, password, done)=>{
            try {
                
            } catch (error) {
                return done(null, false, error);
            }
        }
    ));
};

