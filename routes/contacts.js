const express = require('express')

const router = express.Router();

const auth = require("../middleware/auth")

const Contact = require("../models/contact")

const { validationResult,check } = require('express-validator');
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
router.post('/',auth,[
    check('name','please enter name'),
    check('email', 'please include a valid email').isEmail(),
    check('phone','Please enter valid contact number').isLength({ min: 6 }),
check('type',"please enter type of contact")],async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name,email,phone,type,date } = req.body

    try {

        let users = await Contact.findOne({ name })

        if(users) {

            res.status(400).json({ msg: "Contact already exist "})
        }

        const contact = new Contact({
            name,
            email,
            phone,
            type,
            date,
            user: req.user.id
        });

      const con =  await contact.save()

       
        res.json(con)

    } catch (err) {
        
        console.error(err.message)
        
        res.status(500).send('Server error')
    }
});

// @route PUT api/contacts/:id
//@desc update contact of user
//@access Private
router.put('/:id',auth,async (req,res) => {
    const { name,email,phone,type } = req.body

    // build a contact object

    const contactFields = {}

    if(name) contactFields.name = name

    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type;

    try {
        
        const contact = await Contact.findById(req.params.id)

        if(!contact)
        {
            res.status(404).json({ msg: "Contact doesnot exist"})
        }

        if(contact.user.toString() !== req.user.id)
        {
            res.status(401).json({ msg: "Not authorized to change this contact"})
        }
        else{
            const contac = await Contact.findByIdAndUpdate(req.params.id,
                {
                    $set: contactFields
                },{
                    new: true
                });

                res.json(contac)
        }

    } catch (err) {
        console.error(err.message)

        res.status(500).send("Server Error")
    }
});

// @route DELETE api/contacts/:id
//@desc delete contact of user
//@access Private
router.delete('/:id',auth,async(req,res) => {

    try {
        
        const contact = await Contact.findById(req.params.id)

        if(!contact)
        {
            res.status(404).json({ msg: "Contact doesnot exist"})
        }

        if(contact.user.toString() !== req.user.id)
        {
            res.status(401).json({ msg: "Not authorized to change this contact"})
        }
        else{
                await Contact.findByIdAndDelete(req.params.id)

                res.json("Contact removed")
        }

    } catch (err) {
        console.error(err.message)

        res.status(500).send("Server Error")
    }
  
});


module.exports = router;
