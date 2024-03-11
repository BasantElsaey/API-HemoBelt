const express = require('express')
const { getHome } = require('../controllers/appointments')
const Appointment = require('../models/doctor_models/Appointment')

const router = express.Router()


router.get('/',getHome)

module.exports = router