const express = require('express');
const router = express.Router();
const User = require('../models/users-model')
const Tweet = require('../models/tweets-model')
const tweetValidation = require("../utils/tweet-joi-validation")
const {ExpressError, wrapAsync} = require('../utils/errors')


const validateTweet = function(req, res, next){
    const {error} = tweetValidation.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        console.log(error)
        throw new ExpressError(msg, 404);
    } else{
        next()
    };
};


router.get("/tweets",  wrapAsync( async(req, res) => {
    const tweets = await Tweet.find().populate("user");
    res.render("pages/tweet/index", {tweets, title: "Tweets"})
}));

router.get("/:userId/tweets/new", (req, res) => {
    const userId = req.params.userId
    res.render("pages/tweet/new", { userId ,title: "New Tweet"});
})

router.post("/:userId/tweets", validateTweet, wrapAsync( async(req, res) => {
    // the preparing part

    const foundUser = await User.findById(req.params.userId);
    const {tweet} = req.body;
    const newTweet = new Tweet({tweet});

    // the relationship part

    newTweet.user = foundUser;
    foundUser.tweets.push(newTweet);

    // saving part

    await foundUser.save();
    await newTweet.save();

    res.redirect(`/users/${req.params.userId}`);
}));

router.get("/:userId/tweets/:tweetId/edit",  wrapAsync( async(req, res) => {
    const foundTweet = await Tweet.findById(req.params.tweetId);
    const {userId} = req.params
    res.render("pages/tweet/edit", { foundTweet, userId, title:"edit tweet" });
}));

router.put("/:userId/tweets/:tweetId", validateTweet, wrapAsync( async(req, res) => {

    const foundTweet = await Tweet.findById(req.params.tweetId); 
    foundTweet.tweet = req.body.tweet;
    await foundTweet.save();

    res.redirect(`/users/${req.params.userId}`);
}));

router.delete("/:userId/tweets/:tweetId", wrapAsync( async(req, res) => {
    const { userId, tweetId } = req.params;
    await User.findByIdAndUpdate(userId, { $pull: { tweets: tweetId } });
    await Tweet.findByIdAndDelete(tweetId);
    res.redirect(`/users/${req.params.userId}`);
}));


module.exports = router;