// create -- associate -- save()





// we use mongoose middlewears to do something before or after: like after calling findByIdAndDelete() to this or that...


// findOneAndDelete() == findByIdAndDelete(), but in the middlewear use: findOneAndDelete() 


userSchema.post('findOneAndDelete', async function (user) {
    if (user.tweets.length) {
        await Tweet.deleteMany({ _id: { $in: user.tweets }})
        // delete all the tweets where their ids are in user.tweets
    }
});
