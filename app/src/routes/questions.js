var express = require('express');
var router = express.Router();
var question=require('../models/quesdata');


/* GET home page. */
router.get('/ques', function(req, res, next) {
  console.log("yes");
  var updateuser=function(id){
    question.getquestions(id,function(question2){
      
    console.log(question2);  
    });
    
  }(10);
res.location('/');
  res.redirect('/');
});
module.exports=router;