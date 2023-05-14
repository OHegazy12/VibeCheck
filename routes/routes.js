// importing the contents of the .env file
require('dotenv').config();

const express = require('express');

const router = express.Router()
router.use(express.json())

const db = require('../db/db');

const { ImgurClient } = require('imgur');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { cookieJwtAuth } = require('../middleware/authorization');
const dayjs = require('dayjs')

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

router.delete('/deleteAccount', cookieJwtAuth, async (req, res) => {
    // delete account
    await db('users').where('id', req.user.user_id).delete()
    return res.status(200)
})

router.delete('/deletePost', cookieJwtAuth, async (req, res) => {
    var x = await db('posts').select('img_link').where('post_id', req.body.id)
    // if post has an image
    if (x.length) {
        for (const img of x) {
            var img_hash = img.img_link.split('/')[3]
            // delete image
            await client.deleteImage(img_hash)
        }
    }
    // delete post
    await db('posts').where('post_id', req.body.id).delete()
    return res.status(200)
})

router.delete('/deleteComment', cookieJwtAuth, async (req, res) => {
    // delete comment
    await db('comments').where('comment_id', req.body.id).delete()
    return res.status(200)
})

router.get('/communityFeed', cookieJwtAuth, async (req, res) => {
    return await db('posts').where('type', community)
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
        if (email.length == 0 || name.length == 0 || pass.length == 0) {
            return res.json({ error: 'Can\'t have empty credentials' })
        }
        const [id] = await db('users').insert({
            email_address: email.toLowerCase(),   // insert email var into email_address col of database
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

//Additional profile creation page -- NOT DONE
router.post('/ProfileCreation', async (req, res) => {

    // if (user.first_name == null && user.last_name == null && user.date_of_birth == null) {
    //     console.log('New user, redirect to profile creation')
    // }

    try {
        const {
            firstname,
            lastname,
            dob,
            email
        } = req.body
        // -------
        // uploads to upload folder
        let image = req.files.image

        // upload multiple images via fs.createReadStream (node)
        const imgur = await client.upload({
            image: image.data.toString('base64'),
            type: 'stream',
        });
        // -------
        const [id] = await db('users').where('email_address', email).update({
            first_name: firstname,
            last_name: lastname,
            date_of_birth: dob,
            pfp: imgur.data.link,
            email_address: email
        }).returning('id')
        return res.json({ 'response': 'Added first name, last name, and DoB' })
    } catch (error) {
        console.log(error);
        return res.json({ error: error.detail })
    }

})


//Login
router.post('/login', async (req, res) => {
    try {
        const {
            email,
            pass,
        } = req.body
        // Check email address
        var user = (await db('users').where('email_address', email.toLowerCase()))[0]
        if (user === undefined) {
            return res.status(401).json({ 'response': 'Your username or password is incorrect' })
        }
        var salt = user.password_hash.split('#')[1]

        // Check password
        var isSamePassword = checkPassword(pass, user.password_hash, salt)
        if (!isSamePassword) {
            return res.status(401).json({ 'response': 'Your username or password is incorrect' })
        }

        // token verification  
        var user_id = user.id
        const token = jwt.sign({ user_id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "100d" })
        res.header("Access-Control-Allow-Origin", 'http://localhost:3000')
        res.header("Access-Control-Allow-Credentials", true)
        res.cookie("token", token, {
            httpOnly: false,
            maxAge: 9999999,
            secure: false
        });
        console.log("Login route", token)

        // Username & password correct --> Logging in
        return res.status(200).json({ 'response': 'Logging in' })

    } catch (error) {
        console.log(error);
        return res.json({ error: error.detail })
    }
})

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
router.post('/createPost', cookieJwtAuth, async (req, res) => {
    try {
        const {
            type,
            img_link,
            topic,
            title,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at } = req.body
        posted_by = req.user.user_id
        await db('posts').insert({
            type,
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

//Make comment
router.post('/createComment', cookieJwtAuth, async (req, res) => {
    try {
        const {
            // posted_by,
            body_text,
            likes_lst,
            dislikes_lst,
            comments_lst,
            posted_at } = req.body
        posted_by = req.user.user_id
        const [id] = await db('comments').insert({
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

// Display stuff on profile page
router.get('/profile', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id
    db.select('*').from('posts').where('posted_by', req.user.user_id).then((rows) => {
        // Send rows to the frontend
        console.log(rows);
        res.send(rows);
        console.log('Posts sent!')
    })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal server error');
        });

})

// Display stuff on friends feed
router.get('/friendsFeed', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id

    following_lst = (await db('users').where('id', _id).select('following'))[0].following
    mutual_follows = []
    // insert all from your following list who also follow you back
    for (let i = 0; i < following_lst.length; i++) {
        if (await areUsersFollowingEachOther(_id, following_lst[i])) {
            mutual_follows.push(following_lst[i])
        }
    }
    now = dayjs()
    day_before = now.subtract(24, 'h')
    display_posts = []
    for (let i = 0; i < mutual_follows.length; i++) {
        if (mutual_follows[i] === _id) continue
        post_ = (await (db('posts').where('posted_by', mutual_follows[i])))
        for (const post of post_) {
            created_time = post.created_at
            if (dayjs(created_time).isBefore(day_before)) continue
            // jumble by resorting by time?
            display_posts.push(post)
        }
    }

    // display_posts now holds the needed uuids (unsorted)
    // TO DO: For each value in display_posts array, need to resort by time


    res.json(display_posts)

})

// Are users following each other?
async function areUsersFollowingEachOther(userId1, userId2) {
    // Query the database to check if the relationship exists in the "following" column
    const result = await db('users')
        .select()
        .whereRaw('id = :userId1 AND :userId2 = ANY(following)', { userId1, userId2 })
        .orWhereRaw('id = :userId2 AND :userId1 = ANY(following)', { userId1, userId2 });
    // Return true if both users are following each other
    return result.length === 2;
}

// Follow/unfollow
router.post('/follow', cookieJwtAuth, async (req, res) => {
    try {
        user = db('users').where('id', req.user.user_id)
        // if currently NOT following --> then follow
        if (!(await user.select('following')).includes(req.body.id)) {
            await user.update(
                {
                    following: db.raw('array_append(following, ?)', [req.body.id])
                })
        }
        // if currently  following --> then unfollow
        else {
            user.select('following').del(req.body.id)
        }
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
})

router.delete('/deleteAll', async (req, res) => {
    // delete ALL accounts
    await db.select('*').from('comments').delete()
    await db.select('*').from('posts').delete()
    await db.select('*').from('users').delete()
    return res.status(200)
})


module.exports = router;
