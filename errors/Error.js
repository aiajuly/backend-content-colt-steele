// express has a default middleware for handling errors

// an error handling function middleware has three params: (err, req, res, next), this middleware must be placed at the buttom after all our routes

// when you pass anything to next(), express will regard the argument as an error, and will call the next error handling middleware


// custon error class

class AppError extends Error{
    constructor(msg, status){
        super();
        this.message = msg;
        this.status = status;
    };
};

// throw new AppError("errorrrr", 401)

// in asynx code, rather than throwing and error, you must call & return next() and pass the error as argument
// in async code, wrap your code in a try - catch blocks

// it is quite a headache to use try - catch with every single async function lol, so we can use a wrapAsync function instead

function wrapAsync(anAsyncFunction){
    return function (req, re, next){
        anAsyncFunction(req, res, next).catch(e => next(e))
    };
};

// so you have a wrapper function that takes an async function as an argument
// the wrapper function returns an anonymous function, express will pass req, res, next to the anonymous function
// in the anonymous function we can execute our async function( which we accepted as an argument), after passing req, res, next to it
// remember that an async function will return a promise so you can chain a .catch to it where you catch the error and pass it to next()



// all erorr related files will be stored in utils folder