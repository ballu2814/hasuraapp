var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/nodeauth');
var db=mongoose.connection;
var UserSchema=mongoose.Schema({
    id:{
        type:Number,
        index:true
    },
    title:{
        type:String
    },
    option1:{
        type:String
    },
        option2:{
        type:String
    },
    option3:{
        type:String
    },
option4:{
        type:String
    },
    answer:{
        type:String
    },
    
});
var question=module.exports=mongoose.model('question',UserSchema);

    module.exports.getquestions=function(id1,callback){
      
var ques=question.find( {id:id1 } );


    

};
         
