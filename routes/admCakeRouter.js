const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const Filling = require('../models/Filling');
// var sizeOf = require('image-size');
// const multer = require('multer');
// var upload = multer({ dest: 'client/public/images/about' });
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'client/public/images/about')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// });
//
// var upload = multer({storage: storage});

router.post('/getfillinglist', async (req, res) => {
  try{
    const fillings = await Filling.find();
    console.log(fillings)
    const resultFillings = fillings.map((item, idx)=>{
      return {
        newFillingName:item.newFillingName,
        newFillingDescr:item.newFillingDescr,
      };
    });
    console.log(resultFillings);
    res.status(200).json(resultFillings);
  }catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/updatefillinglist', async (req, res) => {
  console.log(req.body);
  const filling = new Filling({
    newFillingName:req.body.newFillingName,
    newFillingDescr:req.body.newFillingDescr,
  });
  try{
    await filling.save();
    res.status(200).json('Done!');
  }catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});


module.exports = router;
