const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    date: Date,
    time: Date, 
    
    
})

const Appointment= mongoose.model('Appointment',appointmentSchema)
module.exports = Appointment