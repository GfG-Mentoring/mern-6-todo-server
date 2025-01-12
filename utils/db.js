
const mongoose = require('mongoose');


async function connectToDb(username, password) {
    const uri = `mongodb+srv://${username}:${password}@gfg-mern6.giwmv.mongodb.net/?retryWrites=true&w=majority&appName=gfg-mern6`;
    try {
        await mongoose.connect(uri);
        console.log(`Connected to database`);
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    connectToDb,
}