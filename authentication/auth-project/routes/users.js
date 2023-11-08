const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/users');



router.get('/register', (req, res) => {
    res.render('users/register', {title: 'Sign Up'})
});

router.post('/register', async(req, res) => {
    
    try{
        const {username, email, password} = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.logIn(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', "Signed up successfuly");
            res.redirect('/home')
        });
    }   catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('users/login', {title: 'Login'})
});

router.post('/login', passport.authenticate('local', {  failureMessage: true, failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/home');
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}); 



module.exports =  router;