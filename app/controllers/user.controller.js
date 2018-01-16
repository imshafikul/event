const User = require('../models/user');
const session = require('express-session');
module.exports = {
    requiredAuthentication: requiredAuthentication,
    registerForm: registerForm,
    register: register,
    loginForm: loginForm,
    login: login,
    logout: logout   
}


function requiredAuthentication(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

// Show Register form
function registerForm (req, res){
    return res.render('auth/register');
}

// Sjow login form
function loginForm (req, res, next){
    return res.render('auth/login');
}

// login process
function login (req, res, next){
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email , req.body.password, function(error,user){
            if(error || !user){
                const err = new Error('Wrong email or password!!');
                err.status = 401;
                return next(err);
            }else{
                req.session.userId = user._id;
                return res.redirect('/events');
                
            }
        })
    }else{
        const err = new Error('All field required');
        err.status = 401;
        return next(err);
    }
}

// registration process
function register(req, res, next){
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordconf) {
    
        var userData = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordconf: req.body.passwordconf,
        }
    
        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.redirect('/events');
          }
        });
    
    }else{
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
}

function logout(req, res, next){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else{
                res.redirect('/');
            }
        })
    }
}

// function profile(req, res) {
//     console.log(req.session.userId);
// }