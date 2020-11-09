const {Schema, model} = require('mongoose');

const CakeCategory = new Schema({
  categoryName:{type:String, required:true, unique:true},
  categoryLinkName:{type:String, required:true, unique:true},
  imageName:{type:String, required:false, unique: false},
  cakes:[{ type : Schema.Types.ObjectId, ref: 'Cake', required:false}]
});



module.exports=model('CakeCategory',CakeCategory);
