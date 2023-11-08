const path = require('path');
const methodOverride = require('method-override')
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middlewears')

const userRouter = require('./routes/users');



mongoose.connect('mongodb://127.0.0.1:27017/mobileDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



app.use('/', userRouter);


app.get('/home', isLoggedIn, (req, res) => {
    res.render('home', {title: 'home'})
});



app.get("/*", (req, res) =>{
    res.send('not found')
});


const port = process.env.port || 3000;
app.listen(3000)