const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGDB_URL).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("Error connecting to DB ", err);
})
