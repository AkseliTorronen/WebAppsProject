var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

//register a new user, check email and password lengths
router.post('/register',
  body("email").isLength({min:8}),
  body("password").isLength({min:5}),
  (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(user){
        return res.status(403).json({email: "Email already in use."}); //cannot create 2 users with the same email
      } else {
        bcrypt.genSalt(10, (err, salt) =>{
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            let name_of_user = req.body.email.split('@')[0]; //create username by removing everything after '@'
            User.create(
              {
                email: req.body.email,
                username: name_of_user,
                password: hash
              },
              (err, ok) => {
                if(err) throw err;
                return res.json({msg: "registeration done"});
              }
            );
          });
        });
      }
    });
});


//login user
router.post('/login', upload.none(), (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(!user){//in case user can't be found 
        return res.status(403).json({Login_failed: "No user found"});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          console.log(isMatch); //compare given password with the one in the database
            if(err) throw err;
            if(isMatch){
              const jwtPayload = {
                id: user._id,
                email: user.email
              }
              jwt.sign(
                jwtPayload,
                process.env.SECRET,
                {
                  expiresIn: 1200
                },
                (err, token) => {
                  return res.json({success: true, token, msg: "login successful"});
                  
                }
              )
            }
          });
        
      }
    });
});

module.exports = router;
