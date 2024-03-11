const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({

    date: Date,
    time: String,

    startTime: Date,
    duration: Number,
       
    name : {
       type : String,
    },
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
      temperature: {
        type: Number,
        required: true,
      },
      pressure: {
          type: Number,
          required: true,
      },
      weight : {
        type : Number,
        required : true,
      },
    completed : {
        type : Boolean 
    },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

    movingPointer: {
      type: Number,
      default: 0,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    completedSessions: {
      type: Number,
      default: 0,
    },
    delayedSessions: {
      type: Number,
      default: 0,
    },
    weeklySessionHours: {
      type: Number,
      default: 12,
    },
    
     timestamp: { type: Date, default: Date.now },

})

const Session = mongoose.model('Session',sessionSchema)
module.exports = Session