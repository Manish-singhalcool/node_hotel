const Parson = require('./models/person');
// Authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(async (USERNAME,password,done) => {
    //authentication logic here
        try{
            const user = await Parson.findOne({username:USERNAME});
            if(!user){
                return done(null,false,{message: 'Incorrect user'});
            }
            //const isPasswordMatch= user.password === password ? true : false;
            const isPasswordMatch= await user.comparePassword(password);

            if(isPasswordMatch){
                return done(null, user);
            } else{
                return done(null,false,{message: 'Incorrect user'});
            }
        }catch(err){
            return done(err);
        }

}))

module.exports = passport;