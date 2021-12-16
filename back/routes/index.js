var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const validateToken = require("../auth/validateToken.js")

async function getUserAsync(id){
  console.log("async")
  try{
    const user = await User.findById(id).exec();
    return user;
  }catch(ex){
    console.error(ex);
    return null;
  }
}

//get posts and return the in a list
router.get('/posts', (req, res) => {
  const postlist = []; 
  
    Post.find({}, (err, postlist) => {
      if(err) throw err;
      return res.json({posts: postlist})
    })
      
  
});

//make a new post but only if the token is valid and the description exists
router.post('/', validateToken, body("description").isLength({min:1}), async (req, res, next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const user = await getUserAsync(req.user.id); //get user so we can tell whose post this is
  Post.create(
    {
      title: req.body.title,
      description: req.body.description,
      snippet: req.body.snippet,
      user: user.username,
      comments: [],
      datetime: Date.now()
    },
    (err, ok) => {
      if(err) throw err;
      return res.json({msg: "Cool beans, new post"});
    }
  );
});

module.exports = router;