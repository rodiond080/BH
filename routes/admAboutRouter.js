const {Router} = require('express');
const router = Router();
// const multer = require('multer');

router.post('/setaboutcontent', async (req, res) => {
  try {
    // console.log(req.body);
    let str = ' world!';
    // let str = req.body.content + ' world!';
    res.status(200).json(str);
  } catch (e) {
    console.log(e);
  }
});

router.post('/getaboutcontent', async (req, res) => {
  try {
    let str = 'This is a content about the cooker <img src="/client/src/containers/pic1.jpg" />';
    res.status(200).json(str);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
