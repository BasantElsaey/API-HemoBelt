const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({

    date: Date,
    startTime: Date,
    duration: Number,

    rate : {
        type : Number,
    },
      waste: {
        type: Number,
        required: true,
      },
      fluid: {
        type: Number,
        required: true,
      },
      bloodTemperature: {
        type: Number,
        required: true,
      },
      bloodPressure: {
          type: Number,
          required: true,
      },
    completed : {
        type : Boolean 
    },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

     totalSessions: Number,
     completedSessions: Number,
     pointer: Number,
     
     timestamp: { type: Date, default: Date.now },

})

const Session = mongoose.model('Session',sessionSchema)
module.exports = Session