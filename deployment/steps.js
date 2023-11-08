// we store our mongoDB on the cloud in atlas, we store the db url in .env






// we can store our session in mongodb using a tool called  mongo connect
 const connectMongo = require('connect-mongo');
 const sessionStore = connectMongo.create({
    mongoUrl: your-mongo-url,
    touchAfter: 24 * 60 * 60, 
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

sessionStore.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

app.use(session({
    store: sessionStore,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))