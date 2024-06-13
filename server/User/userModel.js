const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
       
        required:true,
       
    },
    lastname:{
        type:String,
      
        required:true,
       
    },
    contact:{
        type:String,
        
        required:true,
       
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    
    password:{
        type:String,
        required:true
    },
 
    gender:{
        type:String,
        required:true

    },
    profile:{
        type:Object
    }
});
module.exports=mongoose.model('users',userSchema)

