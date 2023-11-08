const express = require('express');
const app = express();
const session = require('express-session');


app.use(session({
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    // to deal with deprecated msgs
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
}));



// Sessions are a server-side data store that we use to make HTTP stateful.
// Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data.
// The cookie works as a key to unlock the session on the server. 
// The cookie will be the id of the session.

// to use sessions, you need to require express-session package, execute it in a middlewear along with an object as argument; that object must has a 'secret' property. Then express will automatically send a cookie id to the browser that corresponds to the session, you will also have access to req.session to add info to your session




app.get('/sessions', (req, res) => {
    req.session.test = "Testing Session";
    res.send(req.session.test);
});



app.listen(3000)
