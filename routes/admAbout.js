const {Router} = require('express');
const router = Router();

router.post('/getabout', async (req, res)=>{
  // const course = await Course.findById(req.body.id);
  // await req.user.addToCart(course);
  // res.redirect('/card');
  try{
    console.log(req.body);
    let str = req.body.content + ' world!';
    res.status(200).json(str);
  }catch (e) {
    console.log(e);
  }

});

module.exports=router;
