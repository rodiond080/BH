const {Schema, model} = require('mongoose');

const Filling = new Schema({
  fillingName:{type:String, required:true, unique:true},
  fillingDescription:{type:String, required:false},
  cakes:[{ type : Schema.Types.ObjectId, ref: 'Cake', required:false}]
});

module.exports=model('Filling',Filling);
