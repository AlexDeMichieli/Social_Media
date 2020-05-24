const express = require ('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require("bcryptjs")
const {check, validationResult} = require('express-validator/check');
var jwt = require('jsonwebtoken');
require('dotenv/config')
const axios = require('axios')


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
            return res.status(400).json({errors: [{msg: 'User already exists'}]})
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

    //Encrypt password and save user
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);
    await user.save()

    //Return JWT
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign( payload, 
              process.env.jwtSecret,
              {expiresIn: 360000},
              (err, token)=> {
                    if(err) throw err,
                    res.json({token});
              }  
              
            )

    } catch(err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

 

        // User.find({}, function(err, users) {
        //     if (err) throw err;
          
        //     // object of all the users
        //     for (let info in users){
        //         console.log(users)
        //     };
        //   });
        
       


module.exports = router;