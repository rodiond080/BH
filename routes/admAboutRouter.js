const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const AboutContent = require('../models/AboutContent');
// const multer = require('multer');

router.post('/setaboutcontent', async (req, res) => {

  const aboutContent = new AboutContent({
    aboutContent: req.body.aboutContent
  });

  try {
    await aboutContent.save();
    res.status(200).json('Completed!');
  } catch (e) {
    console.log(e);
  }
});

router.post('/getaboutcontent', async (req, res) => {
  try {
    // let str = 'This is a content about the cooker <img src="public/images/logo.png" class="admin__about-image" />';
    // console.log(path.resolve())
    const coreDir = path.resolve();
    // let str = `This is a content about the cooker <img src="../public/images/about/CBo-GAE-ioY.jpg" class="admin__about-image" />`;


    let str = `This is a content about the cooker <img src="../public/images/about/CBo-GAE-ioY.jpg" class="admin__about-image" /> <img src="../public/images/about/CBo-GAE-ioY.jpg" class="admin__about-image" /> `;

    // let path2 = path.resolve(__dirname, '../client/dist/public/images');

    // console.log(path2)
    // fs.readdir(path2, (err, items) => {
    //   console.log(items)
    // });

    res.status(200).json(str);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
