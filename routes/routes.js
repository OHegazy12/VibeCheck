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
// ==================== BEGIN DELETION FOR ACCOUNTS, POSTS, COMMENTS ====================
router.delete('/deleteAccount', cookieJwtAuth, async (req, res) => {
    // delete account
    await db('users').where('id', req.user.user_id).delete()
    return res.status(200)
})

router.delete('/deletePost', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id;

    try {
        // Retrieve the post's information
        const post = await db('posts')
            .where('post_id', req.body.id)
            .select('img_link', 'posted_by')
            .first();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the post belongs to the authenticated user
        if (post.posted_by !== _id) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }

        // Delete the post's image if it exists
        if (post.img_link) {
            const imgHash = post.img_link.split('/')[3];
            // delete image
            await client.deleteImage(imgHash);
        }

        // Delete the post
        await db('posts').where('post_id', req.body.id).delete();

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
})


router.delete('/deleteComment', cookieJwtAuth, async (req, res) => {
    // delete comment
    commentId = req.body.id;
    _id = req.user.user_id;

    try {
        // Retrieve the comment's information
        const comment = await db('comments')
            .where('comment_id', req.body.id)
            .select('posted_by')
            .first();

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the comment belongs to the authenticated user
        if (comment.posted_by !== _id) {
            return res.status(403).json({ error: 'You are not authorized to delete this comment' });
        }

        // Delete the comment
        await db('comments').where('comment_id', req.body.id).delete();

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
})
// ==================== END DELETION FOR ACCOUNTS, POSTS, COMMENTS ====================
// ==================== BEGIN SIGN UP, PROFILE CREATION, LOGIN, HASHING, ENCRYPT ====================
//Sign Up
router.post('/signUp', async (req, res) => {
    // Sends new account data to backend db
    try {
        const {
            email,
            name,
            pass,
        } = req.body
        if (email.length == 0 || name.length == 0 || pass.length == 0) {
            return res.json({ error: 'Can\'t have empty credentials' })
        }
        const [id] = await db('users').insert({
            email_address: email.toLowerCase(),   // insert email var into email_address col of database
            username: name,
            password_hash: hashAndSalt(pass),
        }).returning('id')
        console.log(id)
        return res.json({ 'response': 'Added new user' })
    } catch (error) {
        console.log(error);
        return res.json({ error: error.detail })
    }
    // res.send('Signing up')
})

//Additional profile creation page
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
// ==================== END SIGN UP, PROFILE CREATION, LOGIN, HASHING, ENCRYPT ====================
// =============================== BEGIN CREATE POST, COMMENT ===============================
// Create a new post
router.post('/createPost', cookieJwtAuth, async (req, res) => {
    posted_by = req.user.user_id
    const user = (await db('users').where('id', posted_by))[0]
    // if user is an admin, grant ability to make event posts

    try {
        const {
            type,
            topic,
            title,
            body_text,
            is_event,
            event_prize,
            likes_criteria
        } = req.body;
        let imgLink = ""
        if (req.files) {
            // uploads to upload folder
            let image = req.files.image

            // upload multiple images via fs.createReadStream (node)
            const imgur = await client.upload({
                image: image.data.toString('base64'),
                type: 'stream',
            });
            imgLink = imgur.data.link
        }
        let post_info = { type, posted_by, img_link: imgLink, topic, title, body_text }
        console.log(user)
        // if user is an admin, grant ability to make event posts
        if (user.is_admin) {
            post_info = { ...post_info, is_event, likes_criteria, event_prize }
            console.log(is_event)
        }
        await db('posts').insert(post_info).returning('post_id');
        return res.send('Added new post')
    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }
})

//Create a new comment
router.post('/createComment', cookieJwtAuth, async (req, res) => {

    try {
        const {
            // posted_by,
            post_id,
            body_text,
            replying_to_type
        } = req.body
        userId = req.user.user_id

        const user = (await db('users').where('id', userId))[0]  // for notifications
        const [comment_id] = await db('comments').insert({
            posted_by: userId,
            body_text,
            replying_to_type
        }).returning('comment_id')

        // if replying to a post
        if (req.body.replying_to_type == 'posts') {
            post = (await db('posts').where('post_id', post_id))[0]
            const commentsList = post.comments_lst || [];
            console.log(post)
            commentsList.push(comment_id.comment_id);
            await db('posts').where('post_id', post_id).update({ comments_lst: commentsList });

            await createNotification(post.posted_by, userId, `${user.username} replied to your post`)    // for notifications

            return res.send('Added new comment')
        }
        // if replying to a comment
        else {
            comment = (await db('comments').where('comment_id', post_id))[0]
            const commentsList = comment.comments_lst || [];
            console.log(comment)
            commentsList.push(comment_id.comment_id);
            await db('comments').where('comment_id', post_id).update({ comments_lst: commentsList });

            await createNotification(comment.posted_by, userId, `${user.username} replied to your comment`)    // for notifications

            return res.send('Added new comment')
        }

    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }


})
// =============================== END CREATE POST, COMMENT ===============================
// ================================= BEGIN PROFILE, FEEDS, FOLLOW =================================
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
// Display stuff on community feed
router.get('/communityFeed', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id
    try {
        // Retrieve the user's interests from the database
        const userInterests = await db('users')
            .select('interests_lst')
            .where('id', _id)
            .first();

        // Retrieve community posts that match the user's interests
        const communityPosts = await db('posts')
            .select()
            .where('type', 'community')
            .whereNot('posted_by', _id)
            .whereIn('topic', userInterests.interests_lst || [])
            .orderBy('created_at', 'desc');
        console.log(userInterests)
        console.log(communityPosts)
        res.status(200).json(communityPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to retrieve community posts' });
    }
});

// Display stuff on friends feed
router.get('/friendsFeed', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id

    following_lst = (await db('users').where('id', _id).select('following'))[0].following
    mutual_follows = []
    // insert all users from your following list who also follow you back
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
        post_ = (await (db('posts').where('posted_by', mutual_follows[i]).whereIn('type', ['friends'])))
        for (const post of post_) {
            created_time = post.created_at
            if (dayjs(created_time).isBefore(day_before)) continue
            // jumble by resorting by time?
            display_posts.push(post)
        }
    }
    // For each value in display_posts array, need to resort by time
    display_posts.sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at)));

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
        const _id = req.user.user_id;
        const targetUserId = req.body.id;

        // Retrieve the user's following list
        const user = await db('users').where('id', _id).first();
        const followingList = user.following || [];

        // Check if the target user is already in the following list
        const isFollowing = followingList.includes(targetUserId);

        if (!isFollowing) {
            // User is not following, add the target user to the following list
            followingList.push(targetUserId);
            await db('users').where('id', _id).update({ following: followingList });
        } else {
            // User is already following, remove the target user from the following list
            const updatedFollowingList = followingList.filter((id) => id !== targetUserId);
            await db('users').where('id', _id).update({ following: updatedFollowingList });
        }

        res.status(200).json({ message: 'Follow/Unfollow operation successful' });
    } catch (error) {
        console.error('Error handling Follow/Unfollow:', error);
        res.status(500).json({ error: 'Failed to handle Follow/Unfollow' });
    }
});
// ================================= END PROFILE, FEEDS, FOLLOW =================================
// ================================= BEGIN SAVED POSTS =================================
// Save/unsave
router.post('/savePost', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id
    try {
        const user = await db('users')
            .where('id', _id)
            .first('saved_lst');

        const savedList = user.saved_lst || [];

        // If post_id is not in saved_lst, add it to the list
        if (!savedList.includes(req.body.post_id)) {
            savedList.push(req.body.post_id);

            await db('users')
                .where('id', _id)
                .update({ saved_lst: savedList });
        }
        // If post_id is already in saved_lst, remove it from the list
        else {
            const updatedSavedList = savedList.filter((id) => id !== req.body.post_id);

            await db('users')
                .where('id', _id)
                .update({ saved_lst: updatedSavedList });
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Display saved posts
// Route to get a user's saved posts
router.get('/displaySavedPosts', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id;
    try {
        // Retrieve the user's saved post IDs from the 'users' table
        const savedPostIds = await db('users')
            .where('id', _id)
            .select('saved_lst')
            .first();

        if (!savedPostIds || savedPostIds.saved_lst.length === 0) {
            // If no saved posts found or the saved_lst array is empty, return an empty array
            return res.json([]);
        }

        // Retrieve the actual post details using the saved post IDs
        let savedPosts = await db('posts')
            .whereIn('post_id', savedPostIds.saved_lst)
            .select('*');

        // Remove friend posts where the two users are no longer following each other
        savedPosts = await Promise.all(
            savedPosts.map(async (post) => {
                if (post.type === 'friends' && !(await areUsersFollowingEachOther(_id, post.posted_by))) {
                    return null;
                }
                return post;
            })
        );

        // Filter out null values (removed friend posts)
        savedPosts = savedPosts.filter((post) => post !== null);

        res.json(savedPosts);
    } catch (error) {
        console.error('Error retrieving saved posts:', error);
        res.status(500).json({ error: 'Failed to retrieve saved posts' });
    }
});
// ================================= END SAVED POSTS =================================
// ================================= BEGIN INTERESTS =================================
// Add interest
router.post('/addInterest', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id
    try {
        const {
            interest
        } = req.body;

        // Check if the interest already exists in the user's interests list
        const user = await db('users')
            .where('id', _id)
            .first();
        if (user.interests_lst.includes(interest)) {
            return res.status(400).json({ error: 'Interest already exists.' });
        }

        await db('users')
            .where('id', _id)
            .update({
                interests_lst: db.raw('array_append(interests_lst, ?)', [interest])
            });

        res.status(200).json({ message: 'Interest added successfully.' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to add interest.' });
    }
})

// Remove interest (Yes this is indeed a post request cuz .update())
router.post('/removeInterest', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id
    try {
        const {
            interest
        } = req.body;

        await db('users')
            .where('id', _id)
            .update({
                interests_lst: db.raw('array_remove(interests_lst, ?)', [interest])
            });

        res.status(200).json({ message: 'Interest removed successfully.' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to remove interest.' });
    }
})
// ================================= END INTERESTS =================================
// ================================= BEGIN CHATS AND MESSAGES =================================
// Creating a new message
router.post('/createMessage', cookieJwtAuth, async (req, res) => {
    try {
        const {
            senderId,
            receiverList,
            bodyText,
            imgLink
        } = req.body;
        const messageId = await db('privateMessages').insert({
            sender_id: senderId,
            receiver_lst: receiverList,
            body_text: bodyText,
            img_link: imgLink || null
        });

        res.status(201).json({ message: 'Message created successfully', messageId });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Failed to create message' });
    }
})


// Unsure if needed
// Get all messages for a specific user (as a sender or receiver)
router.get('/messages/:userId', cookieJwtAuth, async (req, res) => {
    try {
        const { userId } = req.params;

        const privateMessages = await db('messages')
            .where('type', 'private')
            .andWhere(function () {
                this.where('sender_id', userId).orWhereRaw(`? = ANY (receiver_lst)`, [userId]);
            });

        const groupMessages = await db('messages')
            .join('chats', 'chats.message_lst', 'messages.message_id')
            .where('type', 'group')
            .andWhere(function () {
                this.where('sender_id', userId).orWhereRaw(`? = ANY (chats.members_lst)`, [userId]);
            });

        const messages = [...privateMessages, ...groupMessages];
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
})

// Creating a new chat (group or private) for messaging
router.post('/createChat', cookieJwtAuth, async (req, res) => {
    try {
        const {
            type,
            // log,
            groupName,
            groupAdmin,
            membersList
        } = req.body;
        const chatId = await db('chats').insert({
            type,
            // message_lst: log,
            group_name: groupName,
            group_admin: groupAdmin,
            members_lst: membersList
        });

        res.status(201).json({ chat: 'Group created successfully', chatId });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }
})

// Display chats
router.get('/displayChats', cookieJwtAuth, async (req, res) => {
    _id = req.user.user_id

    chat_lst = (await db('chats').whereRaw(`? = ANY (members_lst)`, [_id]))
    for (const chat of chat_lst) {
        chat_lst.push(chat)
    }
}) // either this or the route below

// Unsure if needed
// Get all chat groups
router.get('/chats', cookieJwtAuth, async (req, res) => {
    try {
        const chatGroups = await db('chats').select('*');
        res.status(200).json(chatGroups);
    } catch (error) {
        console.error('Error retrieving chat groups:', error);
        res.status(500).json({ error: 'Failed to retrieve chat groups' });
    }
})

// Add a member to a chat group
router.put('/chats/:groupId/members', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { memberId } = req.body;

        await db('chats').where('group_id', groupId).update({
            members_lst: db.raw('array_append(members_lst, ?)', [memberId]),
        });

        res.status(200).json({ message: 'Member added to chat group successfully' });
    }
    catch (error) {
        console.error('Error adding member to chat group:', error);
        res.status(500).json({ error: 'Failed to add member to chat group' });
    }
});

// Remove a member from a chat group
router.delete('/chats/:groupId/members/:memberId', async (req, res) => {
    try {
        const { groupId, memberId } = req.params;

        await db('chats').where('group_id', groupId).update({
            members_lst: knex.raw('array_remove(members_lst, ?)', [memberId]),
        });

        res.status(200).json({ message: 'Member removed from chat group successfully' });
    } catch (error) {
        console.error('Error removing member from chat group:', error);
        res.status(500).json({ error: 'Failed to remove member from chat group' });
    }
})
// ================================= END CHATS AND MESSAGES =================================
// ================================ BEGIN LIKES AND DISLIKES ================================
// Handles likes on a post
router.post('/likePost', cookieJwtAuth, async (req, res) => {
    try {
        const { post_id } = req.body;
        const userId = req.user.user_id;
        // for notifications
        const user = (await db('users').where('id', userId))[0]
        //-------------
        // Retrieve the post from the database
        const post = (await db('posts')
            .where('post_id', post_id).select('*'))[0];
        //-------------
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user's UUID is already in the likes list
        const isLiked = post.likes_lst.includes(userId);

        if (isLiked) {
            // User already liked the post, remove their UUID from likes list
            const updatedLikes = post.likes_lst.filter((id) => id !== userId);

            // Update the post in the database with the updated likes list
            await db('posts').where('post_id', post_id).update({ likes_lst: updatedLikes });

            return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            // User hasn't liked the post, add their UUID to likes list

            // Check if the user's UUID is in the dislikes list and remove it
            const updatedDislikes = post.dislikes_lst.filter((id) => id !== userId);

            // Update the post in the database with the updated dislikes list and added UUID to likes list
            await db('posts').where('post_id', post_id).update({
                dislikes_lst: updatedDislikes,
                likes_lst: [...post.likes_lst, userId]
            });
            // for notifications
            await createNotification(post.posted_by, userId, `${user.username} liked your post`)
            return res.status(200).json({ message: 'Post liked successfully' });
        }
    } catch (error) {
        console.error('Error handling post like:', error);
        res.status(500).json({ error: 'Failed to handle post like' });
    }
});

// Handles dislikes on a post
router.post('/dislikePost', cookieJwtAuth, async (req, res) => {
    try {
        const { post_id } = req.body;
        const userId = req.user.user_id;
        //-------------
        // Retrieve the post from the database
        const post = (await db('posts')
            .where('post_id', post_id).select('*'))[0];
        //-------------
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user's UUID is already in the dislikes list
        const isDisliked = post.dislikes_lst.includes(userId);

        if (isDisliked) {
            // User already disliked the post, remove their UUID from dislikes list
            const updatedDislikes = post.dislikes_lst.filter((id) => id !== userId);

            // Update the post in the database with the updated dislikes list
            await db('posts').where('post_id', post_id).update({ dislikes_lst: updatedDislikes });

            return res.status(200).json({ message: 'Post undisliked successfully' });
        } else {
            // User hasn't disliked the post, add their UUID to dislikes list

            // Check if the user's UUID is in the likes list and remove it
            const updatedLikes = post.likes_lst.filter((id) => id !== userId);

            // Update the post in the database with the updated likes list and added UUID to dislikes list
            await db('posts').where('post_id', post_id).update({
                likes_lst: updatedLikes,
                dislikes_lst: [...post.dislikes_lst, userId]
            });

            return res.status(200).json({ message: 'Post disliked successfully' });
        }
    } catch (error) {
        console.error('Error handling post dislike:', error);
        res.status(500).json({ error: 'Failed to handle post dislike' });
    }
});

// Handles likes on a comment
router.post('/likeComment', cookieJwtAuth, async (req, res) => {
    try {
        const { comment_id } = req.body;
        const userId = req.user.user_id;
        // for notifications
        const user = (await db('users').where('id', userId))[0]

        // Retrieve the comment from the database
        const comment = (await db('comments')
            .where('comment_id', comment_id)
            .select('*'))[0];

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the user's UUID is already in the likes list
        const isLiked = comment.likes_lst.includes(userId);

        if (isLiked) {
            // User already liked the comment, remove their UUID from likes list
            const updatedLikes = comment.likes_lst.filter((id) => id !== userId);

            // Update the comment in the database with the updated likes list
            await db('comments')
                .where('comment_id', comment_id)
                .update({ likes_lst: updatedLikes });

            return res.status(200).json({ message: 'Comment unliked successfully' });
        } else {
            // User hasn't liked the comment, add their UUID to likes list

            // Check if the user's UUID is in the dislikes list and remove it
            const updatedDislikes = comment.dislikes_lst.filter((id) => id !== userId);

            // Update the comment in the database with the updated dislikes list and added UUID to likes list
            await db('comments')
                .where('comment_id', comment_id)
                .update({
                    dislikes_lst: updatedDislikes,
                    likes_lst: [...comment.likes_lst, userId]
                });
            // for notifications
            await createNotification(comment.posted_by, userId, `${user.username} liked your comment`)
            return res.status(200).json({ message: 'Comment liked successfully' });
        }
    } catch (error) {
        console.error('Error handling comment like:', error);
        res.status(500).json({ error: 'Failed to handle comment like' });
    }
});

// Handles dislikes on a comment
router.post('/dislikeComment', cookieJwtAuth, async (req, res) => {
    try {
        const { comment_id } = req.body;
        const userId = req.user.user_id;

        // Retrieve the comment from the database
        const comment = (await db('comments')
            .where('comment_id', comment_id)
            .select('*'))[0];

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the user's UUID is already in the dislikes list
        const isDisliked = comment.dislikes_lst.includes(userId);

        if (isDisliked) {
            // User already disliked the comment, remove their UUID from dislikes list
            const updatedDislikes = comment.dislikes_lst.filter((id) => id !== userId);

            // Update the comment in the database with the updated dislikes list
            await db('comments')
                .where('comment_id', comment_id)
                .update({ dislikes_lst: updatedDislikes });

            return res.status(200).json({ message: 'Comment undisliked successfully' });
        } else {
            // User hasn't disliked the comment, add their UUID to dislikes list

            // Check if the user's UUID is in the likes list and remove it
            const updatedLikes = comment.likes_lst.filter((id) => id !== userId);

            // Update the comment in the database with the updated likes list and added UUID to dislikes list
            await db('comments')
                .where('comment_id', comment_id)
                .update({
                    likes_lst: updatedLikes,
                    dislikes_lst: [...comment.dislikes_lst, userId]
                });

            return res.status(200).json({ message: 'Comment disliked successfully' });
        }
    } catch (error) {
        console.error('Error handling comment dislike:', error);
        res.status(500).json({ error: 'Failed to handle comment dislike' });
    }
});

// ================================ END LIKES AND DISLIKES ================================
// ================================ BEGIN SEARCHING ================================
// Display all users for search
router.get('/users', cookieJwtAuth, async (req, res) => {
    try {
        const currentUserId = req.user.user_id;

        const users = await db('users')
            .whereNot('id', currentUserId)
            .select('id', 'username');

        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
// Display all interests for search
router.get('/interests', cookieJwtAuth, async (req, res) => {
    try {
        const interests = await db('interests')
            .select('interest_name');

        res.json(interests);
    } catch (error) {
        console.error('Error retrieving interests:', error);
        res.status(500).json({ error: 'Failed to retrieve interests' });
    }
});
// ================================ END SEARCHING ================================

async function getAllComments(parentComment, allComments, post) {
    if (!parentComment) {
        return allComments
    }
    // get comments_lst in comments schema
    comment_uuids = (await db('comments').where('comment_id', parentComment).select('comments_lst'))[0].comments_lst
    allComments[parentComment].replies = comment_uuids
    // loop through comments_lst for uuids
    for (let i = 0; i < comment_uuids.length; i++) {
        // go through comments schema for posts with those uuids
        let temp = await db('comments').where('comment_id', comment_uuids[i]).select('*')
        if (post && post.is_event) {
            await checkCriteria(temp[0], post)
        }
        allComments[comment_uuids[i]] = { id: comment_uuids[i], ...temp[0], replies: [] }
        await getAllComments(comment_uuids[i], allComments, post)
    }
    return allComments
}

async function checkCriteria(comment, post) {
    let likes_count = comment.likes_lst.length
    if (likes_count < post.likes_criteria || post.event_winner !== null) {
        return
    }
    let usr = comment.posted_by
    await db('posts').where('post_id', post.post_id).update({ event_winner: usr })
}

router.get('/displayComments', cookieJwtAuth, async (req, res) => {
    try {
        // for displaying comments in reply to posts
        if (req.body.replying_to_type == 'posts') {
            // get comments_lst in posts schema
            post = (await db('posts').where('post_id', req.body.post_id))[0]
            comment_uuids = post.comments_lst
            isEvent = post.is_event
            let display_posts = {}

            // loop through comments_lst for uuids
            for (let i = 0; i < comment_uuids.length; i++) {
                // go through comments schema for posts with those uuids
                let temp = (await db('comments').where('comment_id', comment_uuids[i]).select('*'))
                if (isEvent) {
                    await checkCriteria(temp[0], post)
                }
                display_posts[comment_uuids[i]] = { id: comment_uuids[i], ...temp[0], replies: [] }
                await getAllComments(comment_uuids[i], display_posts, isEvent ? post : undefined)
            }
            // display all posts with those uuids
            res.send(display_posts)
        }
    } catch (error) {
        console.error('Error handling displaying comments:', error);
        res.status(500).json({ error: 'Failed to handle displaying comments' });
    }
})
// ================================ BEGIN NOTIFICATIONS ================================
// When someone likes your post or comment
// When someone replies to you
// When someone messages you
async function createNotification(to, from, text) {
    await db('notifications').insert({ user_id: to, sender_id: from, body_text: text })
}

// display all of a user's notifications
router.get('/displayNotifications', cookieJwtAuth, async (req, res) => {
    const _id = req.user.user_id;
    try {
        display_posts = (await db('notifications').where('user_id', _id))

        // For each value in display_posts array, need to resort by time
        display_posts.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));

        // display all posts with those uuids
        res.send(display_posts)

    } catch (error) {
        console.error('Error handling displaying notifications:', error);
        res.status(500).json({ error: 'Failed to handle displaying notifications' });
    }
})
// ================================ END NOTIFICATIONS ================================

// VERY POWERFUL REQUEST -- ONLY FOR TESTING -- DELETE LATER
router.delete('/deleteAll', async (req, res) => {
    // delete ALL accounts
    await db.select('*').from('comments').delete()
    await db.select('*').from('posts').delete()
    await db.select('*').from('users').delete()
    return res.status(200)
})
// create an interest for the database (NOT FOR A USER)
router.post('/createInterest', async (req, res) => {
    try {
        const {
            interest_name
        } = req.body;
        await db('interests').insert({
            interest_name
        });
        return res.send('Added new interest')
    } catch (error) {
        console.log(error);
        return res.send(error.detail)
    }
})

// make a user an admin
router.post('/makeAdmin', cookieJwtAuth, async (req, res) => {
    try {
        _id = req.user.user_id;
        await db('users').where('id', _id).update({ is_admin: true });
        res.status(200).json({ message: 'User is now an admin.' });
    } catch (error) {
        console.error('Error making user admin:', error);
        res.status(500).json({ error: 'Failed to make user an admin.' });
    }
})


module.exports = router;
