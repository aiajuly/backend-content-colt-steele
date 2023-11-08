const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/watchesDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


const watchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be blank."]
    },
    price: {
        type: Number,
        required: [true, "Price can't be blank."]
    },
    itemNo: {
        type: Number,
        required: [true, "Item's number can't be blank."]
    },
    img: {
        type: String,
        required: [true, "Image can't be blank."]
    }
});

const Watches = mongoose.model('Watch', watchSchema);


module.exports = Watches;