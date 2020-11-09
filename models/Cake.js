const {Schema, model} = require('mongoose');
//!!!! сделать хлебные крошки в админке
const Cake = new Schema({
  _id:Schema.Types.ObjectId,
  category:{ type : Schema.Types.ObjectId, ref: 'CakeCategory', required:true},

  name:{type:String, required:true, unique:true},
  linkName:{type:String, required:true},
  price:{type:Number, required:true},
  description:{type:String, required:false},
  fillings:[{ type : Schema.Types.ObjectId, ref: 'Filling', required:false}],
  images:[{ type : Schema.Types.ObjectId, ref: 'CakeImage', required:true}],
});

module.exports=model('Cake',Cake);
