require('dotenv').config();
require('./DB/connect');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Routes

app.use("/api", require("./routes/features"))
app.use("/api", require("./routes/auth"))

app.listen('3000', () => {
    console.log("App Started")
})