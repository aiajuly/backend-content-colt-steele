const mongoose = require('mongoose');
const Watch = require('../models/watches');


mongoose.connect('mongodb://127.0.0.1:27017/watchesDB')
.then(() => {
    console.log('Mongoose, Successs');
})
.catch((err) => {
    console.log(`Mpngoose, Error: ${err}`);
});


async function seedWatches(num){
    await Watch.deleteMany({});
    for(let number = 1; number <= num; number++){
        const watch = new Watch({
            name: "BAUME ET MERCIERClifton Date Silver Dial 45 mm Men's Watch",
            price: 4765,
            itemNo: 10456,
            img: "https://www.watches.com/cdn/shop/files/Shinola-S0120273180_CF21_720x.jpg?v=1692893316"
        });
        await watch.save();
        console.log(watch)
    };
    mongoose.disconnect();
};

seedWatches(20)