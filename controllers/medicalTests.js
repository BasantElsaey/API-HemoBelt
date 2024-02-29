const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // generate unique id
const sharp = require('sharp')

const mongoose = require('mongoose');
const MedicalTest = require('../models/MedicalTest')

// Disk Storage engine
const multerStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/medicalTests') // null --> no errors
    },
    filename : function(req,file,cb){
        // test-${id} , Date.now() .jpg
        const extension = file.mimetype.split("/")[1]
        const filename = `test-${uuidv4()}-${Date.now()}.${extension}` // unique filename
        cb(null,filename)
    },
})



const upload = multer({ storage : multerStorage });

exports.uploadTest = async(req,res) => {
    console.log(req.body);
    // // console.log(req.files); // array of files
    console.log(req.file)
    
    res.json({ message: "Test is uploaded successfully" });

}

exports.resizeImage = async(req,res,next) =>{
    console.log(req.file)
}


// Controller function for getting test details
exports.getTestDetails = (req, res) => {
    const testId = req.params.id;
  
    MedicalTest.findById(testId)
      .then((test) => {
        if (!test) {
          return res.status(404).json({ error: 'Test data not found' });
        }
  
        res.status(200).json(test);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to fetch test data' });
      });
  };