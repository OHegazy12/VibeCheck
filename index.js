const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

// // import routes.js to index.js
// const routes = require('./routes/routes');
// app.use('/api', routes)

//Get all Method ----- NEED TO DEFINE IT RIGHT
app.get('/getAll', (req, res) => {
    res.send('Get All API')
})

// server is set to port 3000
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
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
