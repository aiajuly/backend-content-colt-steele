// authentication is the processs of verifying who a particular user is
// autherazation is the process of verifying what a user can and can't do; what can he access, modify, etc.

// never store your passwords as they are in your db, instead hash them and store the hashed version
// hashing means taking an input and give you a fixed output

// a salt is a random value added to the password before we hash it, you know: to make things more complicated.


// you can use bcrypt to do the hashing-salting stuff

const bcrypt = require('bcrypt');


async function bcryptDemo(passwd){

    const salt = await bcrypt.genSalt(12);
    const hashedPasswd = await bcrypt.hash(passwd, salt);

    console.log(hashedPasswd);

    const result = await bcrypt.compare('monkey', hashedPasswd);

    console.log(result);
};


bcryptDemo('monkey');
