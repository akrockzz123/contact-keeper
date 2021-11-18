const express = require('express')

const router = express.Router();

const { validationResult,check } = require('express-validator');

const User = require('../models/Users')

var bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const config = require('config')
// @route GET api/auth
//@desc Get logged in user
//@access Private
router.get('/',(req,res) => {
    res.send('Get logged in user');
});


// @route POST api/auth
//@desc Auth user and get token
//@access Public
router.post('/',[
check('email', 'please include a valid email').isEmail(),
check('password','Please enter password of minimum length 6').isLength({ min: 6 })], async (req,res) => {
   
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password } = req.body

    try {
        let user = await User.findOne({ email })

        if(!user)
        {
            return res.status(400).json({ msg: "Invalid credentials "})
        }

        const isMatch = await bcrypt.compare(password)
        
        if(!isMatch)
        {
            return res.status(400).json({ msg: 'Invalid password'})
        }

       
        const payload = {
            user: {
                id: user.id
            }
        }
 
        jwt.sign(payload,config.get('jwtSecret'), {
         expiresIn: 360000
     }, (err,token) => {
         if(err){
             throw err
         }
 
         res.json({ token })
     });
    } catch(err) {
        console.error(err.message)
        res.status(500).send({msg : "Server error"})
    }
 
});

module.exports = router;

