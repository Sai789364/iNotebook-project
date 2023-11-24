const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="rishiisagoodb$y";

// it is creste user based on name , email ,  password
router.post('/createuser', [
  body('name', 'Enter the valid name').isLength({ min: 3 }),
  body('email', 'Enter the valid email').isEmail(),
  body('password', 'Enter the valid password').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secure = await bcrypt.hash(req.body.password, salt);
    
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secure,
    });

    const data={
      id:user.id
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// login details correct or wrong
router.post('/login', [
  body('email', 'Enter the valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      success=false;
      return res.status(400).json({success,error:"Sorry doesnot exists with this email"})
    }

    const passwordcompare=await bcrypt.compare(password,user.password);
    if(!passwordcompare){
      success=false;
      return res.status(400).json({success,error:"sorry doesnot exit with this password"})
    }

    const data={
      id:user.id
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken});

  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal server error");
  }
})

// fetch the user details with this we are using the middleware
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); 
    
    if (!user) {
      return res.status(404).send("User not found"); 
    }

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
