const mongoose = require('mongoose');

const beltSchema = new mongoose.Schema({

    name : {
        type : String,
    },
    version : {
        type : String,
    },
    price : {
       type : Number,
    },
 
  charge: {
    type : String, 
  },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
    

})

const Belt = mongoose.model('Belt',beltSchema)
module.exports = Belt


// pressure --> > 180 or < 100 --> not start session
// temperature --> > 38 or < 36 --> not session
