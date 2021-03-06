import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { runInNewContext } from "vm";


export const home = (req, res) => res.render("Home");
export const getJoin = (req, res) => res.render("Join");
export const postJoin = async (req, res) => {
    const {
        body: { email, password, age}
    } = req;

    try{        
        const user = new User({
            email,
            password,
            age
        });
        await User.register(user, password);
        passport.authenticate('local')(req, res, function(){
            res.redirect(routes.intro)
        })

    }catch(error){
            console.log(error);
            res.redirect(routes.join);
    }
}

export const getLogin = (req, res) => res.render("login");
export const postLogin = (req, res) => passport.authenticate('local', {
    failureRedirect: routes.login,
    succcesRedirect: routes.page1
}); 

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) =>{
    console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}



export const logout = (req, res) => res.render("Logout");
export const page1 = (req, res) => res.render("Page1");
export const intro = (req, res) => res.render("Intro");
