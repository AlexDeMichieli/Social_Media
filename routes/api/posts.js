const express = require ('express')
const router = express.Router()
const {check, validationResult} = require("express-validator/check")
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')


// Private post route

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],

async (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }

    try {

        const user = await User.findById(req.user.user.id).select('-password')

        const newPost =  new Post({
            text : req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()
        res.json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')

    }
    
    
})

module.exports = router;