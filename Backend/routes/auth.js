const express = require('express')
const router = express.Router()
const User = require("../models/Users")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const PrivateKey = "This is private key used in webtoken";


//ROUTE 1: create user using : Post "/api/auth/createUser" in DB
router.post('/createUser', [body('email').isEmail(),
body('password').isLength({ min: 5 }), body('name').isLength({ min: 3 })],
  async (req, res) => {
    let success = false;

    //if there is an error in body json
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ success, errors: result.array() });
    }

    var salt = bcrypt.genSaltSync(10);
    var secPass = bcrypt.hashSync(req.body.password, salt);
    // console.log(bcrypt.compareSync("12367", "$2a$10$PSo5Ds3nIKFO.BYzwbZK9.iQpgEQRrdUjVbAj/R8u.t82/rXMVFMe")); 

    try {



      //check if email is exist in DB
      let isUserUnique = await User.findOne({ email: req.body.email });
      if (isUserUnique) {
        return res.status(400).json({ success, error: "Email is already exist" });
      }

      //create new user using "User" Mongo DB schema 
      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
      // .then((user)=>res.json(user)).catch(err=>res.json(err.message))

      const data = {
        user: user.id,
      }



      var token = jwt.sign(data, PrivateKey);
      success = true;
      res.json({ success, authToken: token });
      //this token is used for safe interaction beetween server if anyone change the data we can find that one

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server side error");
    }


  })





// ROUTE 2:login end point to check for user (No Log in required)
router.post('/login', [body('email').isEmail(),
body('password').exists()],
  async (req, res) => {
    
    let success = false;
    const result = validationResult(req);

    //if there is an error in body json
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    let { email, password } = req.body;               //destructuring

    try {
      let user = await User.findOne({ email });      // {email:email}  // awit is important as it is asynchronous function

      if (!user) {
        return res.status(400).json({ success, error: "Please entre correct credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);


      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Please entre correct credential" });
      }


      const data = {                                   //data payload 
        user: user.id,
      }

      var token = jwt.sign(data, PrivateKey);                // for secure connection between server
      success = true;
      res.json({ success, authToken: token });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server side error");
    }

  })



//ROUTE 3: Get user details (Log in required)
router.post('/getUser', fetchuser, async (req, res) => {

  try {
    console.log(req.user);                     // user id we get from fetchuser middleware
    let userID = req.user;
    const user = await User.findById(userID).select("-password");   //exlude password
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server side error");
  }

})


module.exports = router