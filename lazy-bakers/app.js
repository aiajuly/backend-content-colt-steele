const path = require('path');
const methodOverride = require('method-override')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {ExpressError, wrapAsync} = require('./utils/errors')
const userRouter = require("./routers/users")
const tweetsRouter = require("./routers/tweets")


mongoose.connect('mongodb://127.0.0.1:27017/LazyBakerDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use("/users", tweetsRouter)
app.use("/users", userRouter)


app.get("/*", (req, res) =>{
    throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('pages/user/error', {message, status, title: "Error"});
})

const port = 3000;
app.listen(3000, () => {
    console.log(`Listening on ${port}`);
});