const express = require('express')

const router = express.Router();

// @route GET api/contacts
//@desc get all contacts of logged in user
//@access Private
router.get('/',(req,res) => {
    res.send('Get all contacts of user');
});

// @route POST api/contacts
//@desc Add new contact
//@access Private
router.post('/',(req,res) => {
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
