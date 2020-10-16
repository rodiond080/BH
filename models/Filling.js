const {Schema, model} = require('mongoose');

const Filling = new Schema({
  newFillingName:{type:String, required:true},
  newFillingDescr:{type:String, required:false},
});

module.exports=model('Filling',Filling);
