var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post")
const Comment = require("../models/Comment");
const validateToken = require("../auth/validateToken.js")

async function getUserAsync(id){
  try{
    const user = await User.findById(id).exec();
    return user;
  }catch(ex){
    console.error(ex);
    return null;
  }
}

async function getPostAsync(id){
  try{
    const post = await Post.findById(id).exec();
    return post;
  }catch(ex){
    console.error(ex);
    return null;
  }
}

//get post and comments associated with it
router.get('/:id', async (req, res) => {
  console.log("Let's get the comments for this post "+req.params.id)
  const postInfo = await getPostAsync(req.params.id);
  
  console.log(req.params.id)
  Comment.find({postedUnder: req.params.id}, (err, allComments) => {
    console.log("1")
    if(err) throw err;
      console.log(allComments);
      return res.json({post: postInfo, comments: allComments})
  })
});
//post new comment under this post
router.post('/:id', validateToken, body("content").isLength({min:1}), async (req, res, next) =>{
  const user = await getUserAsync(req.user.id); //get user so we know whose comment it is
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  Comment.create(
    {
      postedUnder: req.params.id,
      content: req.body.content,
      user: user.username,
      datetime: Date.now()
    },
    (err, ok) => {
      if(err) throw err;
      return res.json({msg: "Comment doned"});
    }
  );
});

module.exports = router;
