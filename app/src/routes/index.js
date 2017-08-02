var express = require('express');
var router = express.Router();
var user=require('./users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  user.checkuser(req);
  if(req.cookies.auth!=undefined){
    use=1;
  }else{
    use=0;
  }
  console.log(user.usernm);
  setTimeout(startTime,2100);
  function startTime(){
  res.render('index1',{users:user.usernm});
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
