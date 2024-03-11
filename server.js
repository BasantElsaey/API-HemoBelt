const express = require('express')
const path = require('path')
const dotenv = require('dotenv') 
require("dotenv").config()

const mongodb = require('mongodb');
const cors = require('cors');
const multer = require('multer')
// const cookieParser = require('cookie-parser');

// database config
const db = require('./config/db')


// models
const Patient = require('./models/Patient')
const Session = require('./models/Session')
const Appointment = require('./models/doctor_models/Appointment')
const Belt = require('./models/Belt')
const MedicalTest = require('./models/MedicalTest')


// routes 
const authRoutes = require('./routes/auth')
const medicalTests = require('./routes/medicaltests')
// const userRoutes = require('./routes/users')
const sessionRoutes = require('./routes/sessions')
const appointmentRoutes = require('./routes/appointments')

const app = express()

// Middlewares
// Body parser
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Cookie parser
// app.use(cookieParser);

// app.use('/auth', userRoutes)
app.use('/api',medicalTests)
app.use('/session',sessionRoutes)
app.use('/appointment',appointmentRoutes)
// app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(cors())

// Error Handling
app.use((err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message : err.message
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port " + process.env.PORT)
})

// we use mailtrap --> fake smtp