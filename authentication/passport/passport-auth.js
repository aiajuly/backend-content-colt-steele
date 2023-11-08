// 1-- adding the user model and associating it with passport
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// this line below will add: username, passsword, etc.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);



// 2-- initializing stuff
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
    secret: "mySecret",
    // to deal with deprecated msgs
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// implement the loocal starategy to the user witch has and authenticate()
passport.use(new LocalStrategy(User.authenticate()));
// serialization refers to how to store data in the session
passport.serializeUser(User.serializeUser());
// deserialization is the opposite
passport.deserializeUser(User.deserializeUser());

// 3-- just teaching you how to register
app.get('/fakeuser',  async(req, res) =>{
    const user = new User({
        email: "abc@email",
        username: "Lol"
    })
    const newUser = await User.register(user, 'myPassWd') // register takes a user object + a password thatt will salt & hash
});



// 4-- create a route for registering and logging in
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));



// 5-- create a route for user to log in
router.post('/login', passport.authenticate('local', {  failureMessage: true, failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/home');
})




// 6-- logging in middlear rather than using authenticate
// check if you are logged in!
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}



// 7-- logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}); 



// 8-- when using passprt, it will add req.user which tells you the user details if you are logged in, you can set it globallly and in that way you can know a user is logged in or not
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})



// 9-- we can redirect a user to where he wanted to be before sending him to login by following this:
// when the isLoggedIn middlewear checks the user and figure out that he is not logged in, store the original url in a session
isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
	    req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

// then in your login route add these lines where you set redirect and then free the session from the original url
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})