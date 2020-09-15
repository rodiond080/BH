const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {


  // const courses = await Course.find()
  //   .populate('userId', 'email name')
  //   .select('price title img').lean();
  //
  //
  // res.render('courses', {
  //   title: 'Курсы',
  //   isCourses: true,
  //   courses
  // });
});

module.exports = router;
