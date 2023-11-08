const mongoose = require('mongoose');
const User = require('./users-model');


mongoose.connect('mongodb://127.0.0.1:27017/LazyBakerDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: [true, "Tweet can't be empty"]
    },
    createdDate: {
        type: Date, default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Tweet = mongoose.model("Tweet", tweetSchema);


module.exports = Tweet;