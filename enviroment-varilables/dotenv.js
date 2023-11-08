// to store your secret credentials( like sessions secret) in development mode: you can use the module 'dotenv':
// 1-- create a .env file in your main directory
// 2-- store all your stuff there as key=value
// 3-- and in your app.js write this:

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// after that you will have access to all your .env keys:
process.env.yourKeyName