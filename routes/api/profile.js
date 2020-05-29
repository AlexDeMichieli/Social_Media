const express = require ('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')


//private
//get current users profile
//import middleware for authentication
//GET api/profile/me
router.get('/me', auth, async (req,res) => {

    try {

        const profile = await Profile.findOne({user: req.user.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is not profile for this user'})
        }else{
            res.json(profile)
        }

    } catch(error){
        console.error(error.message)
        res.status(500).send('Server Error')

    }


})
module.exports = router;