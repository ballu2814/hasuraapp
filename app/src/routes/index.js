var express = require('express');
var router = express.Router();
var user=require('./users.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/* GET home page. */
router.get('/', function(req, res, next) {
  user.checkuser(req,res);
  if(req.cookies.auth!=undefined){
    use=1;
  }else{
    use=0;
  }
  console.log(user.usernm);
  setTimeout(startTime,2100);
  function startTime(){
    if(req.cookies.auth!=undefined){
      console.log(req.cookies.auth);

  res.render('index1',{users:req.cookies.username});
  
}
  else{
    res.render('index1');
  }
}
 // console.log(user.usernm.profileimage);
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'members' });
});
router.get('/updateimage', function(req, res, next) {
  res.render('updateimage', { title: 'members' });
});
router.post('/check',function(req,res,next){
console.log(req.body.password);

res.redirect('/');
});
module.exports = router;
