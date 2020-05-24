const express = require ('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require ('../../models/User');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

require('dotenv/config')


//Reserved auth route
//adding the middleware 'auth' makes the route protected
router.get('/', auth, async (req, res) => {


    try{
        //returns user, leaves out the password
        const user = await User.findById(req.user.user.id).select('-password');
        const data = await res.json({user: user})

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//Post Request api/auth
// Authenticate user & get token

router.post('/', [
    check('email', 'Please include a valid Email address').isEmail(),
    check('password', 'Password required').exists()
], 
async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body

    try {
    //check if user exists
        let user = await User.findOne({email});

        if(!user) {
            return res
                   .status(400)
                   .json({errors: [{msg: 'Invalid Credentials'}]})
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(!isMatch){
             return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid Credentials'}]})
        }

    //Return JWT
        const payload = {
               user: {
                   id: user.id
               }
         }

        jwt.sign({user: payload}, process.env.jwtSecret, {expiresIn: 360000}, (err, token)=>{
            if(err) throw err
            res.send({token: token})
        })


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
