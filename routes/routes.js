// importing the contents of the .env file
require('dotenv').config();

const express = require('express');

const router = express.Router()
router.use(express.json())

const db = require('../db/db');

const fs = require('fs');
const { ImgurClient } = require('imgur');
const bcrypt = require('bcryptjs');

// will be used later to format when something was posted
// const moment = require('moment');    // moment().format('lll');  // Mar 30, 2023 10:49 PM

// all credentials with a refresh token, in order to get access tokens automatically
const client = new ImgurClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
});

//Default endpoint
router.get('/', (req, res) => {
    res.send('Hello world!')
})

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

//Create user
router.post('/createUser', async (req, res) => {
    try {
        const {
            email_address,
            username,
            password_hash,
            first_name,
            last_name,
            date_of_birth,
            bio,
            pfp,
            post_count,
            following,
            saved_lst } = req.body
        console.log(req.body)
        const [id] = await db('users').insert({
            email_address,
            username,
            password_hash,
            first_name,
            last_name,
            date_of_birth,
            bio,
            pfp,
            post_count,
            following,
            saved_lst
        }).returning('id')
        return res.send('Added new user')
    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }
})

// upload an image and retrieve an imgur link from it
router.post('/uploadImg', async (req, res) => {
    if (!req.files) {
        return res.sendStatus(400).send('No files were uploaded.')
    }
    // uploads to upload folder
    let sampleFile = req.files.sampleFile

    // upload multiple images via fs.createReadStream (node)
    const response = await client.upload({
        image: sampleFile.data.toString('base64'),
        type: 'stream',
    });
    console.log(response.data.link);    // this is the reference for the imgur link containing the image
    return response.data.link;
})

//Sign Up
router.post('/signUp', async (req, res) => {
    // Sends new account data to backend db
    try {
        const {
            email,
            name,
            pass,
            first_name,
            last_name,
            date_of_birth,
            bio,
            pfp,
            post_count,
            following,
            saved_lst } = req.body
        const [id] = await db('users').insert({
            email_address: email,   // insert email var into email_address col of database
            username: name,
            password_hash: hashAndSalt(pass),
            // first_name,  // not used for demo, uncomment later
            // last_name,
            // date_of_birth,
            // bio,
            // pfp,
            // post_count,
            // following,
            // saved_lst
        }).returning('id')
        console.log(id)
        return res.json({ 'response': 'Added new user' })
    } catch (error) {
        console.log(error);
        return res.json({ error: error.detail })
    }
    // res.send('Signing up')
})

//Login
router.post('/login', async (req, res) => {
    try {
        const {
            email,
            pass,
        } = req.body

        var user = (await db('users').where('email_address', email))[0]
        console.log(user)
        if (user === undefined) {
            return res.status(401).json({ 'response': 'Your username or password is incorrect' })
        }
        var salt = user.password_hash.split('#')[1]
        console.log(user.password_hash, user.password_hash.split('#'))


        var isSamePassword = checkPassword(pass, user.password_hash, salt)
        if (!isSamePassword) {
            return res.status(401).json({ 'response': 'Your username or password is incorrect' })
        }
        console.log(user)
        return res.status(200).json({ 'response': 'Logging in' })
    } catch (error) {
        console.log(error);
        return res.json({ error: error.detail })
    }
})
// Functions -----------------------------------------------------------------------
function hashAndSalt(pw_plaintext) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pw_plaintext, salt);
    hash = hash + '#' + salt;
    return hash
}

// verifying password
// get plaintext, get stored salt from database,
// salt plaintext with stored salt
// compare new hash to stored hash
function checkPassword(pw_plaintext, stored_hash, salt) {
    var hash = bcrypt.hashSync(pw_plaintext, salt);
    hash = hash + '#' + salt;
    return hash === stored_hash
}

//Make Post
router.post('/createPost', async (req, res) => {
    console.log(req.body)
    try {
        const {
            type,
            post_id,
            posted_by,
            img_link,
            topic,
            title,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at } = req.body
        console.log(req.body)
        const [id] = await db('posts').insert({
            type,
            post_id,
            posted_by,
            img_link,
            topic,
            title,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at
        }).returning('post_id')
        return res.send('Added new post')
    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }
})

//Make Post
router.post('/createComment', async (req, res) => {
    try {
        const {
            comment_id,
            posted_by,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at } = req.body
        console.log(req.body)
        const [id] = await db('comments').insert({
            comment_id,
            posted_by,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at
        }).returning('comment_id')
        return res.send('Added new comment')
    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }
})

module.exports = router;
