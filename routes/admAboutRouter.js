const {Router} = require('express');
const router = Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/src/public/images/about')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({storage});

router.post('/setaboutcontent',
  upload.array('imageFiles'),
  // function (err, req, res, next) {
  //
  // },
  async (req, res) => {
    try {

      // let body = ''
      //
      // req.on('data', (chunk => {
      //   body+=chunk
      // }))

      console.log(req.files)
      // console.log(req.on.toString());
      // let str = req.body.content + ' world!';
      let str = 'world!';
      res.status(200).json(str);
    } catch (e) {
      console.log(e);
    }

  });

router.post('/getaboutcontent', async (req, res) => {
  try {
    console.log(req)
    let str = 'This is a content about the cooker <img src="#" />';
    res.status(200).json(str);
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
