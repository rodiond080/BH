const path = require('path');
const fs = require('fs');
const {Schema, model} = require('mongoose');

const AboutContent = new Schema({
  aboutContent:{type:String, required:false}
});



module.exports=AboutContent;
