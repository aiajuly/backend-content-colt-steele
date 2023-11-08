const mongoose = require('mongoose');
const Tweet = require("./tweets-model")


mongoose.connect('mongodb://127.0.0.1:27017/LazyBakerDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be blank"]
    },
    email: {
        type: String,
        required: [true, "Email can't be blank"]
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"]
    },
    profileImage: {
        type: String,
        required: [true, "Name can't be blank"]
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet"
        }
    ]
});


// we use mongoose middlewears to do something before or after: like after calling findByIdAndDelete() to this or that...


// findOneAndDelete() == findByIdAndDelete(), but in the middlewear use: findOneAndDelete() 


userSchema.post('findOneAndDelete', async function (user) {
    if (user.tweets.length) {
        await Tweet.deleteMany({ _id: { $in: user.tweets }})
        // delete all the tweets where their ids are in user.tweets
    }
});




const User = mongoose.model("User", userSchema);

module.exports = User;

