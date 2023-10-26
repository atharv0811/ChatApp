const bodyParser = require("body-parser");
const express = require('express')
require('dotenv').config();
const cors = require("cors");
const userRouter = require('./routes/userRoutes');
const sequelize = require("./db");
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST']
}));

app.use('/user', userRouter);

sequelize.sync()
    .then(() => {
        app.listen(port)
    })
    .catch(err => console.log(err))
