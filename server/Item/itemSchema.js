const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
    userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'users'
    },
    category:{
        type:String,
      
        required:true,
       
    },
    condition:{
        type:String,
        
        required:true,
       
    },
    address:{
        type:String,
      
        required:true,
       

    },
    
    description:{
        type:String,
        required:true
    },
 
    quantity:{
        type:String,
        required:true

    },
    pincode:{
        type:Number,
        required:true

    },
    location:{
        type:String,
        required:true

    },
    img1:{
        type:Object
    },
    img2:{
        type:Object
    },
    img3:{
        type:Object
    },
    img4:{
        type:Object
    },
    img5:{
        type:Object
    },
    img6:{
        type:Object
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isActive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('items',sSchema)

