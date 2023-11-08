const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/rsDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


// in this case rather than storing the child's refrence in the parent, we will store the parent refrence in the child



const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // refrencing the model
    }
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);


// async function makeUserAndAddressAndAssociate(){

//     const address = new Address({
//         street: "stn",
//         city: "NYC"
//     });

//     const user = new User({
//         firstName: "Stephan",
//         lastName: "Smith"
//     });

//     address.user = user;

//     address.save();
//     user.save();

// };

// makeUserAndAddressAndAssociate()


Address.findOne({city: "NYC"}).then(address => console.log(address));

Address.findOne({city: "NYC"}).populate("user").then(address => console.log(address));

