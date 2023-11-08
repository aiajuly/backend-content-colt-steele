const path = require('path');
const methodOverride = require('method-override')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Watch = require('./models/watches');
const wachesValidationSchema =  require('./utils/joiSchema');
const {ExpressError, wrapAsync} = require('./utils/errors')

mongoose.connect('mongodb://127.0.0.1:27017/watchesDB')
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




const validateWachesInput = function(req, res, next){
    const {error} = watchesValidationSchema.validate(req.body)
    if(error){
        const msg = error.details;
        throw new Error(msg);
    } else{
        next()
    };
};




app.get('/watches',wrapAsync(async(req, res) => {
    const watches = await Watch.find({});
    res.render('pages/index', {watches, title: "Index"})
}));

app.get('/watches/new', (req, res) => {
    res.render('pages/new', {title: "new"})
});

app.post('/watches', validateWachesInput, wrapAsync(async(req, res) => {
    const newWatch = new Watch(req.body);
    await newWatch.save();
    res.redirect(`/watches/${newWatch._id}`)   
}));

app.get('/watches/:id', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const foundWatch = await Watch.findById(id);
    if(!foundWatch){
        throw new ExpressError('Product not found!', 404);
    }
    else{
    res.render('pages/show', {foundWatch, title: 'show'});
    }
}));

app.get('/watches/:id/edit', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const foundWatch = await Watch.findById(id);
    res.render('pages/edit', {foundWatch, title: 'Edit'})
}));

app.put('/watches/:id', validateWachesInput, wrapAsync(async(req, res) => {
    const {id} = req.params;
    await Watch.findByIdAndUpdate(id, req.body)
    res.redirect(`/watches/${id}`)
}));

app.delete('/watches/:id', wrapAsync(async(req, res) => {
    const {id} = req.params;
    await Watch.findByIdAndDelete(id);
    res.redirect(`/watches`)
}));




app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('pages/error', {message, status, title: "Error"});
})



app.listen(3000)