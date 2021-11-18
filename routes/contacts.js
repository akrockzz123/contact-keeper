const express = require('express')

const router = express.Router();

const auth = require("../middleware/auth")

const Contact = require("../models/contact")

// @route GET api/contacts
//@desc get all contacts of logged in user
//@access Private
router.get('/',auth,async (req,res) => {
    
    try {

        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1})

        res.json(contacts)

    } catch (err) {
        
        console.error(err.message)

        res.status(500).send('Server error')

    }
});

// @route POST api/contacts
//@desc Add new contact
//@access Private
router.post('/',auth,(req,res) => {
    res.send('Add contact of user');
});

// @route PUT api/contacts/:id
//@desc update contact of user
//@access Private
router.put('/:id',(req,res) => {
    res.send('Update contact of user');
});

// @route DELETE api/contacts/:id
//@desc delete contact of user
//@access Private
router.delete('/',(req,res) => {
    res.send('Update contact of user');
});


module.exports = router;
