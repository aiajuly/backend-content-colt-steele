const mongoose = require('mongoose');
const User = require('../models/users-model')



mongoose.connect('mongodb://127.0.0.1:27017/LazyBakerDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


async function deleteEverythingAndThenAddUsers(number){
    await User.deleteMany({});

    for (let counter = 1; counter <= number; counter++){

        const user = new User({
            name: "John Smith",
            email: "Jhon@gmail.com",
            password: "123",
            profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        });
        await user.save()
    };

    mongoose.disconnect();
};

deleteEverythingAndThenAddUsers(10)