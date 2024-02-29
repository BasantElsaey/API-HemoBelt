const express = require('express')
const dotenv = require('dotenv') 
require("dotenv").config()

const mongodb = require('mongodb');
const cors = require('cors');
const multer = require('multer')
// const cookieParser = require('cookie-parser');

// database config
const db = require('./config/mongoose')


// models
const Patient = require('./models/Patient')
const session = require('./models/Session')
const appointment = require('./models/Appointment')
const belt = require('./models/Belt')
const MedicalTest = require('./models/MedicalTest')


// routes 
const authRoutes = require('./middlewares/auth')
const medicalTests = require('./routes/medicaltests')
const userRoutes = require('./routes/users')

const app = express()

// Middlewares
// Body parser
app.use(express.json());

// Cookie parser
// app.use(cookieParser);

app.use('/auth', userRoutes)
app.use('/api',medicalTests)

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