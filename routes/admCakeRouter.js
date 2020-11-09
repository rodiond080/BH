const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const config = require('config');
const Filling = require('../models/Filling');
const CakeImage = require('../models/CakeImage');
const Cake = require('../models/Cake');
const CakeCategory = require('../models/CakeCategory');
var sizeOf = require('image-size');
const multer = require('multer');
// const Schema = require("mongoose");
const mongoose = require('mongoose');

// var upload = multer({ dest: 'client/public/images/category' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/images/categories');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});

var storageForNewCakeImages = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = 'client/public/images/cakes/temp';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var uploadForNewCakeImages = multer({storage: storageForNewCakeImages});

//CAKES - 1 -  get the list of all cake categories to render the page
router.post('/getcategories', async (req, res, next) => {
  try {
    const candidates = await CakeCategory.find();
    const overallNumberPages = Math.ceil(candidates.length / 12);
    const removeUntil = 12 * (req.body.currentPage - 1);
    const categoriesToSend = candidates.splice(removeUntil, 12);
    res.status(200).json({categoriesToSend, overallNumberPages});
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/getcategorycakes', async (req, res) => {
  try {
    const category = await CakeCategory.findOne({categoryLinkName: req.body.categoryName});
    const categoryCakes = await Cake.find({category: category._id});
    const overallNumberPages = Math.ceil(categoryCakes.length / 7);
    const removeUntil = 7 * (req.body.currentPage - 1);
    const cakeToSend = categoryCakes.splice(removeUntil, 7);


    const categoryCakesWithImagesPromises = cakeToSend.map((cake) => {
      return CakeImage.find({cake: cake._id})
        .then((result) => {
          cake.images = result;
          return cake;
        });
    });
    const categoryCakesWithImages = await Promise.all(categoryCakesWithImagesPromises);
    res.status(200).json({categoryCakesWithImages, overallNumberPages});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/savenewcategory', upload.single('imageName'), async (req, res, next) => {
  try {
    if (!req.body.categoryName.length) {
      const err = new Error('Имя категории не введено');
      err.status = 400;
      return next(err);
    }

    const candidate = await CakeCategory.findOne({categoryName: req.body.categoryName});
    if (candidate) {
      const err = new Error('Категория с таким названием уже существует');
      err.status = 400;
      return next(err);
    }

    const newCategory = new CakeCategory({
      categoryName: req.body.categoryName,
      categoryLinkName: req.body.categoryLinkName,
      imageName: req.body.imageName
    });

    await newCategory.save();

    const candidates = await CakeCategory.find();
    const imagesNamesArray = candidates.map((img, idx) => {
      return img.imageName;
    });

    const pathToCategoryImages = path.resolve(__dirname, '..', 'client', 'public', 'images', 'categories');
    const listOfFiles = fs.readdirSync(pathToCategoryImages);


    listOfFiles.forEach((imgName) => {
      if (!imagesNamesArray.includes(imgName)) {
        fs.unlinkSync(path.resolve(pathToCategoryImages, imgName));
      }
    });

    res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/updatecategory', upload.single('imageName'), async (req, res, next) => {
  try {
    if (!req.body.categoryName.length) {
      const err = new Error('Имя категории не введено');
      err.status = 400;
      return next(err);
    }

    const candidateById = await CakeCategory.findOne({_id: req.body.id});
    const candidateByName = await CakeCategory.findOne({categoryName: req.body.categoryName});

    if (candidateByName && candidateById.categoryName !== candidateByName.categoryName) {
      const err = new Error('Категория с таким названием уже существует');
      err.status = 400;
      return next(err);
    }

    await CakeCategory.findOneAndUpdate(
      {_id: req.body.id},
      {
        $set: {
          categoryName: req.body.categoryName,
          categoryLinkName: req.body.categoryLinkName,
          imageName: req.body.imageName
        }
      });
    res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/savenewcake', async (req, res) => {
  try {
    const tempDir = path.resolve(__dirname, '..', 'client', 'public', 'images', 'cakes', 'temp');
    const newDir = path.resolve(__dirname, '..', 'client', 'public', 'images', 'cakes', req.body.cakeLinkName);
    if (fs.existsSync(tempDir)) {
      fs.rename(tempDir, newDir,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    const newDirImagesAddress = '/public/images/cakes/' + req.body.cakeLinkName + '/';

    const category = await CakeCategory.findOne({categoryLinkName: req.body.categoryName});

    const cake = new Cake({
      _id: new mongoose.Types.ObjectId(),
      category: category._id,
      name: req.body.cakeName,
      price: req.body.cakePrice,
      description: req.body.cakeDescription,
      linkName: req.body.cakeLinkName,
      fillings: req.body.cakeFillings.map(cakeFilling => {
        return cakeFilling.id
      }),
    });

    cake.save((err) => {
      if (err) {
        console.log(err);
      }

      if (fs.existsSync(newDir)) {
        const imagesList = fs.readdirSync(newDir);

        imagesList.forEach(imageName => {
          if (!req.body.cakeImages.map(cakeImage => {
            return cakeImage.cakeImageName;
          }).includes(imageName)) {
            fs.unlinkSync(newDir + '/' + imageName);
          }
        });
      }

      req.body.cakeImages.forEach(async (cakeImage) => {
        const imageModel = new CakeImage({
          cakeImageName: cakeImage.cakeImageName,
          cakeImageAddress: newDirImagesAddress + cakeImage.cakeImageName,
          cake: cake._id
        });
        imageModel.save();
      });
    });

    const justCreateCake = await Cake.findOne({linkName: req.body.cakeLinkName});


    res.status(200).json('done');
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/updatecake', async (req, res) => {
  try {
    const cakeId = req.body.cakeId;
    const previousCake = await Cake.findById(cakeId);
    const tempDirectoryAddress = path.join(__dirname, '..', 'client', 'public', 'images', 'cakes', 'temp');
    const oldImagesDirAddress = path.join(__dirname, '..', 'client', 'public', 'images', 'cakes', previousCake.linkName);
    const newImagesDirAddress = path.join(__dirname, '..', 'client', 'public', 'images', 'cakes', req.body.cakeLinkName);

    if (previousCake.name !== req.body.cakeName) {
       //rename directory
      if (fs.existsSync(oldImagesDirAddress) && fs.existsSync(tempDirectoryAddress)) {
        fs.rename(oldImagesDirAddress, newImagesDirAddress, (err) => {
          if (err) {
            console.log(err);
          }
        });

        fs.readdirSync(tempDirectoryAddress).forEach(fileName => {
          fs.renameSync(tempDirectoryAddress + '/' + fileName, newImagesDirAddress + '/' + fileName, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
        fs.rmdirSync(tempDirectoryAddress);
      } else if (fs.existsSync(oldImagesDirAddress) && !fs.existsSync(tempDirectoryAddress)) {
        fs.rename(oldImagesDirAddress, newImagesDirAddress, (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else if (!fs.existsSync(oldImagesDirAddress) && fs.existsSync(tempDirectoryAddress)) {
        fs.rename(tempDirectoryAddress, newImagesDirAddress, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      const previousImages = await CakeImage.find({cake: req.body.cakeId});
      const previousImagesCopy = [...previousImages];
      if (previousImagesCopy.length) {
        previousImagesCopy.forEach( async (previousImage) => {
          if (req.body.cakeImages.map(cakeImage => {
            return cakeImage.cakeImageName;
          }).includes(previousImage.cakeImageName)) {
            await updateCakeImageAddress(previousImage.cakeImageName);
          }else {
            await removeCakeImageById(previousImage._id);
            await removeCakeFile(newImagesDirAddress+'/'+previousImage.cakeImageName);
          }
        });
      }
    } else {
      if(fs.existsSync(oldImagesDirAddress) && fs.existsSync(tempDirectoryAddress)){
        fs.readdirSync(tempDirectoryAddress).forEach(fileName => {
          fs.renameSync(tempDirectoryAddress + '/' + fileName, oldImagesDirAddress + '/' + fileName, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
        fs.rmdirSync(tempDirectoryAddress);
      }else if(!fs.existsSync(oldImagesDirAddress) && fs.existsSync(tempDirectoryAddress)){
        fs.renameSync(tempDirectoryAddress , newImagesDirAddress, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }else if(fs.existsSync(oldImagesDirAddress) && !fs.existsSync(tempDirectoryAddress)){
        //do nothing!
      }
      const previousImages = await CakeImage.find({cake: req.body.cakeId});
      const previousImagesCopy = [...previousImages];
      if (previousImagesCopy.length) {
        previousImagesCopy.forEach( async (previousImage) => {
          if (!req.body.cakeImages.map(cakeImage => {
            return cakeImage.cakeImageName;
          }).includes(previousImage.cakeImageName)) {
            await removeCakeImageById(previousImage._id);
            await removeCakeFile(oldImagesDirAddress+'/'+previousImage.cakeImageName);
          }
        });
      }
    }

    req.body.cakeImages.forEach((imageObject) => {
      if (!imageObject._id) {
        const cakeImage = new CakeImage({
          cake: req.body.cakeId,
          cakeImageName: imageObject.cakeImageName,
          cakeImageAddress: '/public/images/cakes/' + req.body.cakeLinkName + '/' + imageObject.cakeImageName,
        });
        cakeImage.save();
      }
    });

    previousCake.name = req.body.cakeName;
    previousCake.price = req.body.cakePrice;
    previousCake.description = req.body.cakeDescription;
    previousCake.linkName = req.body.cakeLinkName;
    previousCake.save();
    res.status(200).json('done');

    async function updateCakeImageAddress(cakeImageName) {
      await CakeImage.updateOne(
        {cakeImageName: cakeImageName},
        {
          $set: {
            cakeImageAddress: '/public/images/cakes/' +
              req.body.cakeLinkName + '/' + cakeImageName
          }
        })
    }
    async function removeCakeImageById(cakeImageId) {
      await CakeImage.deleteOne({_id: cakeImageId})
    }
    async function removeCakeFile(cakeImageAddress) {
      fs.unlinkSync(cakeImageAddress);
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/getcakedata', async (req, res) => {
  try {
    const cake = await Cake.findOne({linkName: req.body.cakeLinkName});
    cake.images = await CakeImage.find({cake: cake._id});
    const fillingsPromises = cake.fillings.map((fillingId) => {
      return Filling.find({_id: fillingId})
        .then((result) => {
          return result[0];
        });
    });
    const fillings = await Promise.all(fillingsPromises);
    cake.fillings = fillings;
    res.status(200).json(cake);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/savenewimages', upload.single('imageName'), async (req, res, next) => {
  try {
    if (!req.body.newCategoryName.length) {
      const err = new Error('Имя категории не введено');
      err.status = 400;
      return next(err);
    }

    await CakeCategory.findOneAndUpdate(
      {_id: req.body.dbId},
      {
        $set: {
          newCategoryName: req.body.newCategoryName,
          newCategoryLinkName: req.body.newCategoryLinkName,
          imgName: req.body.imgName
        }
      });
    // const candidate = await CakeCategory.findOne({_id: req.body.dbId});
    const pathToCategoryImages = path.resolve(__dirname, '..', 'client', 'public', 'images', 'categories');
    const listOfFiles = fs.readdirSync(pathToCategoryImages);

    listOfFiles.forEach((imgName) => {
      if (!imagesNamesArray.includes(imgName)) {
        fs.unlinkSync(path.resolve(pathToCategoryImages, imgName));
      }
    });

    res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});


router.post('/getcakesbycategory', async (req, res) => {
  try {
    // const candidates = await CakeCategory.find();
    // console.log(candidates)
    // res.status(200).json(candidates);

    // if (!req.body.newCategoryName.length) {
    //   const err = new Error('Имя категории не введено');
    //   err.status = 400;
    //   return next(err);
    // }
    //
    //
    // const candidate = await CakeCategory.findOne({newCategoryName: req.body.newCategoryName});
    // if (candidate) {
    //   const err = new Error('Категория с таким названием уже существует');
    //   err.status = 400;
    //   return next(err);
    // }
    //
    // const newCategory = new CakeCategory({
    //   newCategoryName: req.body.newCategoryName,
    //   newCategoryLinkName: req.body.newCategoryLinkName,
    //   imgName: req.body.imgName
    // });
    //
    // await newCategory.save();
    //
    // const candidates = await CakeCategory.find();
    // const imagesNamesArray = candidates.map((img, idx) => {
    //   return img.imgName;
    // });
    //
    // const pathToCategoryImages = path.resolve(__dirname, '..', 'client', 'public', 'images', 'categories');
    // const listOfFiles = fs.readdirSync(pathToCategoryImages);
    //
    // listOfFiles.forEach((imgName) => {
    //   if (!imagesNamesArray.includes(imgName)) {
    //     fs.unlinkSync(path.resolve(pathToCategoryImages, imgName));
    //   }
    // });

    // res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
})
router.post('/removegarbageimages', async (req, res) => {
  try {
    const candidates = await CakeCategory.find();
    const imagesNamesArray = candidates.map((img, idx) => {
      return img.imageName;
    });

    const pathToCategoryImages = path.resolve(__dirname, '..', 'client', 'public', 'images', 'categories');
    const listOfFiles = fs.readdirSync(pathToCategoryImages);

    listOfFiles.forEach((imageName) => {
      if (!imagesNamesArray.includes(imageName)) {
        fs.unlinkSync(path.resolve(pathToCategoryImages, imageName));
      }
    });
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/uploadnewcakeimages', uploadForNewCakeImages.single('imageName'), async (req, res, next) => {
  try {
    // if (!req.body.categoryName.length) {
    //   const err = new Error('Имя категории не введено');
    //   err.status = 400;
    //   return next(err);
    // }
    //
    // await CakeCategory.findOneAndUpdate(
    //   {_id: req.body.id},
    //   {
    //     $set: {
    //       categoryName: req.body.categoryName,
    //       categoryLinkName: req.body.categoryLinkName,
    //       imageName: req.body.imageName
    //     }
    //   });
    // const candidate = await CakeCategory.findOne({_id: req.body.dbId});
    // const pathToCategoryImages = path.resolve(__dirname, '..', 'client', 'public', 'images', 'categories');
    // const listOfFiles = fs.readdirSync(pathToCategoryImages);
    //
    // listOfFiles.forEach((imgName) => {
    //   if (!imagesNamesArray.includes(imgName)) {
    //     fs.unlinkSync(path.resolve(pathToCategoryImages, imgName));
    //   }
    // });
    res.status(200).json('Done!');
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});


router.post('/uploadnewcategoryimage', upload.single('imageName'), async (req, res) => {
  try {
    // console.log(req.file)
    // console.log(req.file)
    // console.log(req.file);
    // upload.single('imageName')
    // const fillings = await Filling.find();
    // console.log(fillings)
    // const resultFillings = fillings.map((item, idx)=>{
    //   return {
    //     newFillingName:item.newFillingName,
    //     newFillingDescr:item.newFillingDescr,
    //   };
    // });
    // res.status(200).json(resultFillings);
    res.status(200).json('Done!');
  } catch (e) {
    // console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});


router.post('/getcakefillingsbyid', async (req, res) => {
  try {
    const arrayOfCakeFillingsPromises = await req.body.arrayOfCakeFIllingsIds.map(async (fillingId) => {
      const filling = await Filling.findById(fillingId);
      return filling;
    });
    const arrayOfCakeFillings = await Promise.all(arrayOfCakeFillingsPromises);
    res.status(200).json(arrayOfCakeFillings);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/updatecakefillings', async (req, res) => {
  try {
    // console.log(req.body);


    // const fillings = await Filling.find();
    // console.log(fillings)
    // const resultFillings = fillings.map((item, idx)=>{
    //   return {
    //     newFillingName:item.newFillingName,
    //     newFillingDescr:item.newFillingDescr,
    //   };
    // });
    // res.status(200).json(resultFillings);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/getfillinglist', async (req, res) => {
  try {
    const fillings = await Filling.find();
    res.status(200).json(fillings);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/savenewfilling', async (req, res) => {

  try {
    const filling = new Filling({
      fillingName: req.body.fillingName,
      fillingDescription: req.body.fillingDescription,
    });
    await filling.save();
    res.status(200).json('Done!');
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});
router.post('/updateonefilling', async (req, res) => {
  try {
    await Filling.findOneAndUpdate(
      {_id: req.body.id}, {
        $set: {
          fillingName: req.body.fillingName,
          fillingDescription: req.body.fillingDescription
        }
      });
    res.status(200).json('Done!');
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

router.post('/getfillingdescriptionbyid', async (req, res) => {
  try {
    const candidate = await Filling.findOne({_id: req.body.id});
    res.status(200).json(candidate);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Something went wrong. Try again.'});
  }
});

module.exports = router;
