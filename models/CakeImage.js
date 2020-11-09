const {Schema, model} = require('mongoose');
//!!!! сделать хлебные крошки в админке
const CakeImage = new Schema({
  cakeImageName:{type:String, required:true, unique:true},
  cakeImageAddress:{type:String, required:true, unique: true},
  cake:{ type : Schema.Types.ObjectId, ref: 'Cake', required:true}
});

module.exports=model('CakeImage',CakeImage);
