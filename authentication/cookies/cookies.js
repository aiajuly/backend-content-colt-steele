const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());




// Cookies are little bits of information that are stored in a user's browser when browsing a particular website. 
// Once a cookie is set, a user's browser will send the cookie on every subsequent request to the site. 
// cookies make stateless http requests stateful
app.get('/sendcookies', (req, res) => {
    res.cookie('name', 'Ali').send("Sent you a cookie! to check it, go to inspect - application - storage - cookies")
});



// to retrieve cookies you need to require cookie-parser package, then execute it in a middlewear, you will then have access to req.cookies
app.get('/retrievecookies', (req, res) => {
    const cookies = req.cookies;
    res.send(cookies);
})




app.listen(3000)