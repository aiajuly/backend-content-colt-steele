const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('secret'));

// to be sure that nobody manipulates thee cookie value on the browser side; you can use signed cookie, you provide a secret to the cookieParser middlewear; then add the object {signed: true} to the cookie you send, and all the cookies you send will be signed. Signed cookies will be stored in req.signedCookies


app.get('/sendsignedcookies', (req, res) => {
    res.cookie('name', 'Ali', {signed: true}).send("Sent you a cookie! to check it, go to inspect - application - storage - cookies")
});



app.get('/retrievesignedcookies', (req, res) => {
    const cookies = req.signedCookies;
    res.send(cookies);
})



app.listen(3000)