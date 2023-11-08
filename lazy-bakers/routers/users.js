const express = require('express');
const router = express.Router();
const User = require('../models/users-model')
const userJoiValidation =  require("../utils/user-joi-validation")
const {ExpressError, wrapAsync} = require('../utils/errors')


const validateUser = function(req, res, next){
    const {error} = userJoiValidation.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        console.log(error)
        throw new ExpressError(msg, 404);
    } else{
        next()
    };
};


router.get('/', wrapAsync( async (req, res) => {
    const users = await User.find({});
    res.render("pages/user/index", {users, title: "All Users"});
}));

router.get("/new", (req, res) => {
    res.render("pages/user/new", {title: "New User"})
});

router.post("/", validateUser, wrapAsync( async(req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/users");
}));

router.get("/:id", wrapAsync( async(req, res) => {
    const foundUser = await User.findById(req.params.id).populate("tweets");
    res.render("pages/user/show", {foundUser, title: "User's Details"})
}));

router.get("/:id/edit", wrapAsync( async(req, res) => {
    const foundUser = await User.findById(req.params.id);
    res.render("pages/user/edit", {foundUser, title: "Edit User's Details"})
}));

router.patch("/:id", validateUser, wrapAsync( async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/users");
}));

router.delete("/:id", wrapAsync( async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
}));



module.exports = router;