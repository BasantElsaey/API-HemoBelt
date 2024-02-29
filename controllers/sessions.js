const User = require('../models/User')
const mongoose = require('mongoose');
const Session = require('../models/Session')


const MAX_WEEKLY_SESSION_DURATION = 12;
const SESSION_DURATION_INCREMENT = 2;

// Function to increment the pointer value by 2
function incrementPointer(patient) {
  patient.pointer += 2;
}

// Function to start a session for a patient
async function startSession(patientId) {
  const patient = await User.findById(patientId);

  // Calculate the start time of the current session
  const startTime = new Date();

  // Create a new session object
  const newSession = {
    startTime,
    duration: 0,
    completed: false,
  };

  // Add the new session to the patient's sessions array
  patient.sessions.push(newSession);

  // Increment the total number of sessions
  patient.totalSessions += 1;

  // Save the updated patient document
  await patient.save();

  // Start the timer for 2 hours
  setTimeout(async () => {
    // Find the current session based on the start time
    const currentSession = patient.sessions.find(session => session.startTime.getTime() === startTime.getTime());

    // Increment the pointer value by 2
    incrementPointer(patient);

    // Update the session duration and mark it as completed
    currentSession.duration += SESSION_DURATION_INCREMENT;
    currentSession.completed = true;

    // Calculate the total duration of sessions within the week
    const currentWeekStart = getWeekStart(startTime);
    const currentWeekEnd = getWeekEnd(startTime);
    const totalDurationInWeek = patient.sessions.reduce((total, session) => {
      if (session.startTime >= currentWeekStart && session.startTime <= currentWeekEnd) {
        return total + session.duration;
      }
      return total;
    }, 0);

    // Check if the weekly session duration exceeds the limit
    if (totalDurationInWeek > MAX_WEEKLY_SESSION_DURATION) {
      console.log('Weekly session duration limit exceeded!');
      // Handle the case when the limit is exceeded (e.g., display an error message)
    } else {
      // Increment the completed sessions count
      patient.completedSessions += 1;

      // Save the updated patient document
      await patient.save();

      console.log('Pointer incremented by 2!');
      // Handle the case when the pointer is incremented successfully
    }
  }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
}

// Helper function to calculate the start of the week for a given date
function getWeekStart(date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(date.getDate() - date.getDay());
  return start;
}

// Helper function to calculate the end of the week for a given date
function getWeekEnd(date) {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  end.setDate(date.getDate() + (6 - date.getDay()));
  return end;
}

// Example usage
const patientId = 'your_patient_id';
startSession(patientId);































// // total number hours of sessions in a week = 12
// const MAX_WEEKLY_SESSION_DURATION = 12;

// async function addSessionToPatient(patientId, newSession) {
//   const patient = await User.findById(patientId);
//   const currentWeekStart = getWeekStart(newSession.date);
//   const currentWeekEnd = getWeekEnd(newSession.date);

//   // Calculate the total duration of sessions within the week
//   const totalDurationInWeek = patient.sessions.reduce((total, session) => {
//     if (session.date >= currentWeekStart && session.date <= currentWeekEnd) {
//       return total + session.duration;
//     }
//     return total;
//   }, 0);

//   // Check if adding the new session exceeds the weekly limit
//   if (totalDurationInWeek + newSession.duration > MAX_WEEKLY_SESSION_DURATION) {
//     throw new Error('Adding this session exceeds the weekly limit.');
//   }

//   // Add the new session to the patient's sessions array
//   patient.sessions.push(newSession);

//   // Save the updated patient document
//   await patient.save();
// }