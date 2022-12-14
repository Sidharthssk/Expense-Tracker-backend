const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SCRETE = "Thisisajsonsceret";

router.post('/createUser',[body('email','Enter a valid Email').isEmail(),
body('name','Name should be atleast 3 characters long').isLength({min: 3}),
body('password','Password should be atleast 5 characters long').isLength({min: 5})],

async (req, res) =>{
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()){
        return res.status(400).json({success: success, error: errors.array()});
    }

    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.status(400).json({success: success, error: "A user with this email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const {name, email} = req.body;

        user = await User.create({
            name: name,
            email: email,
            password: hash,
            emailList: [email]
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SCRETE);
        success = true;

        res.json({success: success, authToken: authToken});
    }catch(error){
        res.status(500).send(error.message);
    }
})

router.post('/login',[body('email','Enter a valide email').isEmail(),
body('password','Password cannot be blank').exists()],

async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: success, error: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: success, error: "User does not exist. Please SignUP"});
        }

        let passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success: success, error: "You entered Invalid Credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        };

        let authToken = jwt.sign(data, JWT_SCRETE);
        success = true;
        res.json({success: success, authToken: authToken});
    }
    catch(error){
        res.status(500).send("Internal server error occured");
    }
});

router.post('/getuser',fetchuser,
async (req, res)=>{
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        res.status(500).send("Internal server error occured")
    }
});

router.post('/edituser', fetchuser,
async (req, res)=>{
    try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.name = req.body.name;
    user.email = req.body.email;
    user.emailList = req.body.emailList;
    user.expenseLimit = parseInt(req.body.expenseLimit);
    await user.save();
    res.send(user);
    } catch (error) {
        res.status(500).send({error: error});
    }
});

module.exports = router;