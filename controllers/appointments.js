const Patient = require('../models/Patient')
const Appointment = require('../models/doctor_models/Appointment')
const mongoose = require('mongoose');


// when a patient reaches home page , 
//print welcome Muhammed , your session is at 2 pm

exports.getHome =  async (req, res) => {
  
    const patientId = '65e711ddc679ddd9f00a0f98'; // Replace with the patient's ID
  
    try {
      // Find the patient by ID
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        res.status(404).send('Patient not found');
        return;
      }
  
      // Find the latest appointment for the patient
      const appointment = await Appointment.findOne({ patientId })
        .sort({ date: -1 })
        .exec();
  
      if (!appointment) {
        res.status(404).send('Appointment not found');
        return;
      }
  
      const sessionTime = appointment.startTime;
  
      res.send(`Hi, welcome ${patient.username}!<br>Your session is at 
      ${sessionTime} PM`);

    } catch (error)  {    
      console.error('Error retrieving data:', error);
      res.sendStatus(500);
    }
  };


/////////////////////////////////////////////////////////////////////////////////////










