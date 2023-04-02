const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');

const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(fileUpload());
// app.use(express.urlencoded({extended: false}))

// import routes.js to index.js
const routes = require('./routes/routes');
app.use('/api', routes)

// server is set to port 3000
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


//Default endpoint
app.get('/', (req, res) => {
    res.send('Default / page!')
})

// importing the contents of the .env file
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

//  throw a success or an error message depending on whether our database connection is successful or fails.
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})