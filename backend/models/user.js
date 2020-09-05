const mongoose = require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  
    Email:{type:String,required:true,index:true, unique:true},
    Password:{type:String,required:true},
});
userSchema.plugin(uniqueValidator)

module.exports=mongoose.model('User',userSchema);
//w7kzeLeTBDAcwIru