var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');
var db=mongoose.connection;
var UserSchema=mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
        name:{
        type:String
    },
    profileimage:{
        type:String
    },

    
});
var user=module.exports=mongoose.model('user',UserSchema);
module.exports.createuser=function(newuser,callback){
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newuser.password, salt, function(err, hash) {
        newuser.password=hash; 

newuser.save(callback);   
 });
});
};

module.exports.getuserbyid=function(id,callback){
    user.findById(id,callback);
};

module.exports.getuserbyusername=function(username,callback){
    var query={username:username};
   user.findOne(query,callback);
   
}
module.exports.getuserbyemail=function(email,callback){
    var query={email:email};
    user.findOne(query,callback);
   
}
module.exports.comparepassword=function(candidatepassword,hash,callback){
    bcrypt.compare(candidatepassword,hash,function(err,isMatch){
        callback(null,isMatch);
    });
};
module.exports.updatepassword=function(name,password1,callback){
    console.log(name);
    console.log(password1);
if(password1){         bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password1, salt, function(err, hash) {
        
console.log(hash);
         user.update(
   { username : name },
   { $set:{password: hash } },callback

);
  
});
});
       
         

}   
 
 };
module.exports.updateimage=function(name,image,callback){
if(image){
       user.update(
   { username : name },
   { $set:{profileimage: image } },callback

);}
}