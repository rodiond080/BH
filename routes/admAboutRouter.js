const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const AboutContent = require('../models/AboutContent');
var sizeOf = require('image-size');
const multer = require('multer');
// var upload = multer({ dest: 'client/public/images/about' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/images/about')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({storage:storage});


router.post('/setaboutcontent',
  upload.single('image'),
  async (req, res) => {
    // console.log(req.body)
  console.log(req.file);
  const candidate = await AboutContent.findOne();
  try {
    if (!candidate) {
      const aboutContent = new AboutContent({
        aboutContent: req.body.aboutContent
      });
      await aboutContent.save();
      res.status(200).json('Completed!');
    }

    candidate.aboutContent = req.body.aboutContent;
    await candidate.save();

    res.status(200).json('Done!');
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/updateaboutcontent', async (req, res) => {
  const imagesToUpdateArr = JSON.parse(req.body.imagesToUpdate);
  const aboutContent = JSON.parse(req.body.aboutContent);
  try {
    const candidate = await AboutContent.findOne();
    const pathToCheck = path.join(__dirname, '..', config.get('imagesPath'), 'about');

    fs.readdir(pathToCheck, (err, files) => {
      if (files) {
        files.forEach(file => {
          if (!imagesToUpdateArr.includes(file)) {
            fs.unlink(path.join(pathToCheck, file), () => {});
          }
        })
      }
    });

    if (!candidate) {
      const aboutContentModel = new AboutContent({
        aboutContent: req.body.aboutContent
      });
      await aboutContentModel.save();
      res.status(200).json('Completed!');
    }
    candidate.aboutContent = aboutContent;
    await candidate.save();

    res.status(200).json('Done!');
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/getaboutcontent', async (req, res) => {
  try {
    const pathToCheck = path.join(__dirname, '..', config.get('imagesPath'), 'about');
    const imgSizes = [];
    fs.readdir(pathToCheck, (err, files) => {
      // console.log(files)
      if (files) {
        files.forEach(file => {
          var dimensions = sizeOf(pathToCheck + '/' + file);
          imgSizes.push({width: dimensions.width, height: dimensions.height});
        });
      }
    });

    const candidate = await AboutContent.findOne();
    if (candidate) {
      res.status(200).json({
        aboutContent: candidate.aboutContent,
        imgSizes: imgSizes,
      });
    } else {
      res.status(400).json('');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

module.exports = router;
