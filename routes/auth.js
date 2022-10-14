const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SCRETE = "Thisisajsonsceret";

router.post('/createUser',[body('email','Enter a valid Email').isEmail(),
body('name','Name should be atleast 3 characters long').isLength({min: 3}),
body('password','Password should be atleast 5 characters long').isLength({min: 5})],

async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).json({error: "A user with this email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SCRETE);
        res.json(authToken);
    }catch(error){
        res.status(500).send(error.message);
    }
})

module.exports = router;