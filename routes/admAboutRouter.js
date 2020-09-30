const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const AboutContent = require('../models/AboutContent');
// const multer = require('multer');

router.post('/setaboutcontent', async (req, res) => {
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
            fs.unlink(path.join(pathToCheck, file), () => {
            });
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
    const candidate = await AboutContent.findOne();
    if (candidate) {
      res.status(200).json(candidate.aboutContent);
    } else {
      res.status(400).json('');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

module.exports = router;
