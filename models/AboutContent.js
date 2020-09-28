const {Schema, model} = require('mongoose');

const AboutContent = new Schema({
  aboutContent:{type:String, required:false}
});

module.exports=model('AboutContent',AboutContent);
