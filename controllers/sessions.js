const Patient = require('../models/Patient')
const mongoose = require('mongoose');
const Session = require('../models/Session')
// const noble = require('noble')
const Belt = require('../models/Belt')
const { MongoClient } = require('mongodb');


// Start the session timer
exports.startSessionTimer = (patientId) => {
    setTimeout(async () => {
      try {
        // Find the patient by ID
        const patient = await Patient.findById(patientId);
  
        if (!patient) {
          console.log('Patient not found');
          return;
        }
  
        // Increment the moving pointer by 2
        patient.movingPointer += 2;
  
        // Increment the completed sessions by 1
        patient.completedSessions += 1;
  
        // Calculate the delayed sessions
        patient.delayedSessions = patient.totalSessions - patient.completedSessions;
  
        
        // Check if the weekly session hours are reached
        if (patient.completedSessions >= patient.weeklySessionHours) {
          // Reset the completed sessions count
          patient.completedSessions = 0;
        }
  
        // Save the changes to the database
        await patient.save();
  
        console.log('Session completed:', patient);
      } catch (error) {
        console.error('Error updating patient session:', error);
      }
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  };
  
///////////////////////////////////////////////////////////////////////////////////

// create session

exports.createSession = async (req, res) => {
  const { patientId } = req.body;

  try {
    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    // Increment the total sessions by 1
    patient.totalSessions += 1;

    // Save the changes to the database
    await patient.save();

    // Start the session timer
    startSessionTimer(patientId);

    res.send('Session created');
  } catch (error) {
    console.error('Error creating session:', error);
    res.sendStatus(500);
  }
};


