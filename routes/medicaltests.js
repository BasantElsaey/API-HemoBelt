const express = require('express')
const multer = require('multer');
const {uploadTest, getTestDetails,resizeImage,multerStorage} = require('../controllers/medicalTests');
const { v4: uuidv4 } = require('uuid'); // generate unique id

const router = express.Router()

// const multerStorage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,'uploads/medicalTests') // null --> no errors
//     },
//     filename : function(req,file,cb){
//         // test-${id} , Date.now() .jpg
//         const extension = file.mimetype.split("/")[1]
//         const filename = `test-${uuidv4()}-${Date.now()}.${extension}` // unique filename
//         cb(null,filename)
//     },
// })

const upload = multer({ storage : multerStorage,fileFilter(req,file,cb){
    // tes47rdg@t.png --> /\ . $/
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif|pdf)$/)){
      return cb(new Error('An extension of this file is not supported'),null)
    }
    cb(null, true)
}});


router.post("/tests/upload_files",upload.single('file'),uploadTest,resizeImage);

router.get('/test/:id',getTestDetails);

module.exports = router;