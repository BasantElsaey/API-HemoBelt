const express = require('express')
const { createSession} = require('../controllers/sessions')
const { startSessionTimer } = require('../controllers/sessions');


const Session = require('../models/Session')

const router = express.Router()

router.get('/startTimer',startSessionTimer)
router.post('/createSession',createSession)


module.exports = router;