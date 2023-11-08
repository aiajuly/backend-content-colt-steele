const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});

// one to few: embed the child data in an array in the schema

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    addresses: [
        {
            street: String,
            city: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

async function createUser(){
    const user = new User({
        firstName: "Jhon",
        lastName: "Smith"
    });
    
    user.addresses.push({
        street: "Stn",
        city: "NYC"
    });

    await user.save();

    console.log(user);

    mongoose.disconnect()
};

createUser()