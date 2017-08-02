var express = require('express');
var router = express.Router();
var multer=require('multer');
var flash = require('connect-flash');
var upload=multer({dest: 'public/uploads/'});
var user=require('../models/user');
var request = require('request');
var passport=require('passport');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
router.usernm='';
var LocalStrategy=require('passport-local').Strategy;
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');


});

router.get('/quiz', function(req, res, next) {
  res.render('quiz');
  
});
router.get('/update', function(req, res, next) {
  res.render('update',{ name:username1});
  
});
router.get('/quiz/simple', function(req, res, next) {
  res.render('questionssimple',{ name:username1});
  
});
router.get('/quiz/results', function(req, res, next) {
  res.render('results',{ name:username1});
  
});
router.get('/quiz/medium', function(req, res, next) {
  res.render('questionmedium',{ name:username1});
  
});
router.get('/quiz/hard', function(req, res, next) {
  res.render('questionhard',{ name:username1});
  });
router.get('/register', function(req, res, next) {
  res.render('signup',{title:'register'});

});
router.get('/login', function(req, res, next) {
  res.render('login',{title:'register'});

});


router.post('/register' ,function(req,res,next){
xhr = new XMLHttpRequest();
  
  var url  = "https://auth.gamut45.hasura-app.io/signup";
  xhr.open("POST",url,true);
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var json = JSON.parse(xhr.responseText);
      res.cookie("auth",json.auth_token);
      //document.cookie="auth="+json.auth_token;
      
      res.redirect('/');
      
    }
    else if(xhr.readyState == 4) {
      console.log(xhr.responseText);
      res.redirect('/users/register');
       }
  }
  var data = {};
  data["username"] = req.body.username;
  data["password"] = req.body.password;
  console.log(data);
  var jsondata = JSON.stringify(data);
  console.log(jsondata);
  xhr.send(jsondata);


});

















router.post('/register1',function(req, res, next) {
  var username=req.body.username;
  var password=req.body.password;
  console.log("yes");
  console.log(req.body.username);
var requestData={
  username:req.body.username,
  password:req.body.password
}
var options = {
  uri: 'https://auth.gamut45.hasura-app.io/signup',
  method: 'POST',
  
  headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
};
console.log(options.body);
request(options, function (error, response, body) {
  console.log("signing");
  if (!error && response.statusCode == 200) {
    console.log(body.id) // Print the shortened url.
    use=1;
    //res.cookie("auth",json.auth_token);
    router.usernm.username=username;
    var obj=JSON.parse(body);
     
    
    res.redirect('/');
  }
  if(error){
    res.render('signup', { error:error });
  
  }
 console.log(response.message);
  console.log(body);
  
});
 
});
router.post('/login', function(req, res, next) {
  var username=req.body.username;
  var password=req.body.password;
 // console.log("yes");
  //console.log(req.body.username);
var requestData={
  username:req.body.username,
  password:req.body.password
}
var options = {
  uri: 'https://auth.gamut45.hasura-app.io/login',
  method: 'POST',
  
  headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
};
//console.log(options.body);
request(options, function (error, response, body) {
  //console.log("logging");
  if (!error && response.statusCode == 200) {
    //console.log(body.id) // Print the shortened url.
    use=1;
    var obj=JSON.parse(body);
  
    //console.log(username);
  
    res.redirect('/');
  }
  if(response.statusCode != 200){
    var errors=[
      "invalid credentials"
    ];
    res.render('login', { error:errors });
  }
  if(error){
    res.render('login', { error:error });
  
  }
 //console.log(response.message);
  //console.log(body);
  
});
  

});

router.post('/login1', function(req, res, next) {
var requestData={
  username:req.body.username,
  password:req.body.password
}

var http = new XMLHttpRequest();
var url = "https://auth.gamut45.hasura-app.io/login";

http.open("POST", url,true);
http.setRequestHeader('Content-type','application/json');
http.withCredentials=true;
//Send the proper header information along with the request

http.onload = function() {
    if (this.status === 404) {
      console.log("error not found"); // not found, add some error handling
       
    }}
http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
        res.redirect('/');

    }
    else{   console.log(http.responseText);
    }
}
var obj=JSON.stringify(requestData);


//console.log(obj);
http.send(obj); 

//console.log(options.body);

  

});
router.post('/login2' ,function(req,res,next){
xhr = new XMLHttpRequest();
  var url  = "https://auth.gamut45.hasura-app.io/login";
  xhr.open("POST",url,true);
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var json = JSON.parse(xhr.responseText);
      res.cookie("auth",json.auth_token);
      //document.cookie="auth="+json.auth_token;
      hasura_id = json.hasura_id;
      auth_token = "Bearer "+json.auth_token;
      console.log(auth_token);
      res.redirect('/');
      
    }
    else if(xhr.readyState == 4) {
      console.log(xhr.responseText);
      res.redirect('/users/login');
       }
  }
  var data = {};
  data["username"] = req.body.username;
  data["password"] = req.body.password;
  console.log(data);
  var jsondata = JSON.stringify(data);
  console.log(jsondata);
  xhr.send(jsondata);});


router.get('/logout', function(req, res, next) {
  
  //console.log(req.get("hasura_roles"));
 // console.log(auth_token);
   xhr = new XMLHttpRequest();
   xhr.open('POST', 'https://auth.gamut45.hasura-app.io/user/logout', true);
   xhr.setRequestHeader("Content-Type","application/json");
   xhr.setRequestHeader("authorization",auth_token);
  xhr.withCredentials = true;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText); //Outputs a DOMString by default
    }
  }

xhr.send(null);

 //console.log(req.headers);
res.redirect("/");

});

router.get('/logout1', function(req, res, next) {
  var auth="Bearer "+req.cookies.auth;
  var options = {
  uri: 'https://auth.gamut45.hasura-app.io/user/logout',
  method: 'POST',
  
  headers: {
        "content-type": "application/json",
        "authorization": auth
    },
    
};

request(options, function (error, response, body) {
  
  if (!error && response.statusCode == 200) {
    //console.log(body.id) // Print the shortened url.
    console.log(body);
    auth_token="";
    router.usernm='';
    res.clearCookie("auth");
    res.redirect('/');

  }
  if(error){
    res.redirect('/');
  
  }
 //console.log(response.message);
  console.log(body);
});


});

router.checkuser=function load(req) {
  var auth="Bearer "+req.cookies.auth;
   xhr = new XMLHttpRequest();
xhr.open('GET', 'https://auth.gamut45.hasura-app.io/user/account/info', true);
if(auth_token){
xhr.setRequestHeader("Authorization", auth);}
xhr.withCredentials = "true";
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4&& xhr.status==200) {
      console.log(xhr.responseText +" yes");
      var user2=JSON.parse(xhr.responseText);
        router.usernm=user2.username;
      console.log(router.usernm);
      
       //Outputs a DOMString by default
    }
    else{
      
    }
  }

xhr.send(null);

}
router.get('/getdata/:id1', function(req, res, next) {
 
 var auth="Bearer "+req.cookies.auth;
 var a=req.params.id1;
 var requestdata={
   type:"select",
   args:{
     table:"Questions",
     columns:["*"],
     where:{id:Number(a)},
     limit:10

   }
 }
 console.log(requestdata);
var http = new XMLHttpRequest();
var url = "https://data.gamut45.hasura-app.io/v1/query";

http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/JSON");
http.setRequestHeader("authorization",auth);
http.withCredentials = true;
//http.setRequestHeader("authorization","Bearer");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
                var ques1=JSON.parse(http.responseText);
                //console.log(ques1);

        res.render('questionhard', { ques: ques1 })
    }else{
      console.log(http.responseText);
    //res.render('login')
    }
       //console.log(http.responseText);
}
http.send(JSON.stringify(requestdata)); 

});



module.exports = router;
