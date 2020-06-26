const express = require ('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const {check, validationResult} = require('express-validator/check');



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

//creates or update user profile

router.post('/', [auth, 
    [check
    ('status', 'Status is required').not().isEmpty(),
    check('skills', "Skills is required").not().isEmpty(),

]

], async (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

 const {
    
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
} = req.body

//Build profile Object
const profileFields = {}
profileFields.user = req.user.user.id
console.log(profileFields.company)

if(company) profileFields.company = company
if(website) profileFields.company = website
if(location) profileFields.location = location
if(status) profileFields.status = status
if(skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim())
}
if(bio) profileFields.bio = bio
if(status) profileFields.status = status
if(githubusername) profileFields.githubusername = githubusername

//Build Social Object:
profileFields.social = {}
if(youtube) profileFields.social.youtube = youtube
if(twitter) profileFields.social.twitter = twitter
if(facebook) profileFields.social.facebook = facebook
if(linkedin) profileFields.social.linkedin = linkedin

try {
    let profile = await Profile.findOne({user: req.user.user.id});
    if (profile){
        //if there's a profile, update it
        profile = await  Profile.findOneAndUpdate(
            {user: req.user.user.id}, 
            {$set: profileFields},
            {new: true},
        )
        return res.json(profile)
    }
    //otherwise, create it
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)


}catch(error){
    console.error(error.message)
    res.status(500).send('Server Error')
}
})

module.exports = router;