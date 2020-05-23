const express = require ('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator/check');
const User = require ('../../models/User');

// public user route
//register user

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email address').isEmail(),
    check('password', 'Please add minimum 6 characters').isLength({min: 6})
], 
async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body

    try {
    //check if user exists
        let user = await User.findOne({email});
        if(user) {
            res.status(400).json({errors: [{msg: 'User already exists'}]})
        }

    //get user gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);
    await user.save()

    //Return JWT
    res.send ('User registered')

    } catch(err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

module.exports = router;