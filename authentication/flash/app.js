const session = require('express-session');
const flash = require('connect-flash');



app.use(session({
    secret: 'thisisnotagoodsecret', 
    resave: false,
     saveUninitialized: false
}));
app.use(flash());


// then you will have access to req.flash

    // category -- message
    req.flash('success', 'Successfully made a new farm!');
    // the message will be flashed to redirected site
    res.redirect('/farms')


// then in the route we redirected we will have access to flash


res.render('/farms', {messages: req.flash('success')})


// you can set up a middlewear which will allow you to have access to flash on every template without the need to pass it

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})