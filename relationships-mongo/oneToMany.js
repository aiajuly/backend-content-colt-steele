const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


// one to many: store the child data refrence( e.g. id) in an array in the parent model, then when retrieving data chain a .populate to replace the reference with the actual data


const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address" // refrencing the model
        }
    ]
});

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);

// async function makeUserAndAddressAndAssociate(){

//     const address = new Address({
//         street: "stn",
//         city: "NYC"
//     });

//     await address.save();

//     const foundAddress = await Address.findOne({street: "stn"});

//     const user = new User({
//         firstName: "Jack",
//         lastName: "Smith"
//     });

//     user.addresses.push(foundAddress);
    
//     console.log(user);

//     await user.save();
// };

// makeUserAndAddressAndAssociate()

User.findOne({firstName: "Jack"}).populate("addresses" /*  refrencing the array name*/).then( user => console.log(user));
