const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/mobileDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// this line below will add: username, passsword, etc.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);