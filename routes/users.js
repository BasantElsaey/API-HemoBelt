const express = require('express')
const {register,login, forgetPassword, resetPassword,verifyPassResetCode,logout} = require('../controllers/users');

const router = express.Router()

router.post('/register',register);
router.post('/login',login)
router.post('/forgetpassword',forgetPassword)
router.post('/verifyResetCode',verifyPassResetCode)
router.put('/resetpassword',resetPassword)


module.exports = router