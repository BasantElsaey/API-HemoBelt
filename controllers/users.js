const Patient = require('../models/Patient');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs')


// Register --> Signup (Patient)
exports.register = async (req, res, next) => {

    try{
        const user = new User(req.body)
       // console.log(user)
        await user.save()
        const token = user.generateToken()
        res.send({
            message : "success",
            user,
            token
        })
    }
    catch(e){
        res.send(e.message)
    }
}
//     const { username,email,password,countryCode,mobileNumber,age,gender,barcode } = req.body
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password less than 6 characters" })
//     }
//     try {
//       await User.create({
//         username,
//         password,
//         email,
//         countryCode,
//         mobileNumber,
//         age,
//         gender,
//         barcode
//       })
//       .then(user =>
//         res.status(200).json({
//           message: "User successfully created",
//           user,
//         })
//       )
//     } catch (err) {
//       res.status(401).json({
//         message: "User not successful created",
//         error: err.message,
//       })
//     }
//   }

  // Login --> Patient

  exports.login = async (req, res) => {

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    let comparePassword;
    if(user){
        comparePassword = bcrypt.compareSync(password,user.password)
    };
    if(!user || !comparePassword){
        return res.status(400).json({
            message : "Email or Password is invalid"
        });
    }
    await user.save();

    let token = jwt.sign({id : user._id},process.env.JWT_SECRET)
    res.cookie('jwtToken',token).status(200).json({
        message : "success",
        token
    });
  
  }

// forget password
exports.forgetPassword = async(req,res,next) =>{
    // Get user by email 
    const user = await User.findOne({email : req.body.email});
    if(!user){
       return res.status(404).send(`There is no user with that email ${req.body.email}`)  
    }
    // if user exists , generate hash reset random 4 digit and save it in database
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedResetCode = crypto
            .createHash('sha256')  
            .update(resetCode)  
            .digest('hex');  

            // console.log(resetCode);
            // console.log(hashedResetCode);

        // save hashed password reset code into db
        user.passwordResetCode = hashedResetCode;

        /* 10 --> 10 min * 60 * 1000  --> millisecond
         add expiration time for password reset code (10 min)
        */
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        user.passwordResetVerified = false;

       await  user.save();


    const message = `Hi ${user.username} , \n We received a request to reset the password on your Hemobelt account. \n ${resetCode} \n Enter this code to complete the reset
    \n Thanks for helping us keep your account secure \n Hemobelt Team `
    // send the reset code via email
   
    try{
        await sendEmail({
            email : user.email , 
            subject : 'Your password reset code (valid for 10 min)',
            message,
        
        })
    }catch(err){
       user.passwordResetCode = undefined;
       user.passwordResetExpires = undefined;
       user.passwordResetVerified = undefined;

       await user.save();
       return next(!new Error('There is an error in sending email'),500)
    }
    res.status(200).json({
        status : 'success',
        message : 'Reset code sent to email successfully '
    })

}

// Verify reset code
exports.verifyPassResetCode = async(req,res,next) =>{
    // get user based on reset code
 
    const hashedResetCode = crypto
    .createHash('sha256')  
    .update(req.body.resetCode)  
    .digest('hex'); 

    const user = await User.findOne({
        passwordResetCode : hashedResetCode,
        passwordResetExpires : {$gt : Date.now()}
    });
    if(!user){
        return res.send('Reset code invalid or expired');
    }
    // reset code invalid
    user.passwordResetVerified = true;

    await user.save();
    res.status(200).json({
        status : "success",
    })
}

// Reset Password 
exports.resetPassword = async(req,res,next) =>{
    // get a user based on email
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return res.send({
        error : `There is no user with that email ${req.body.email}`});
    }
    
    // check if reset code is verified
    if(!user.passwordResetVerified){
        return res.status(400).json({
            error : 'Reset code not verified'});  
    }
    user.password = req.body.newPassword;
    user.password = req.body.confirmPassword
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    // create token
    let token = jwt.sign({id : user._id},process.env.JWT_SECRET)
    res.cookie('jwtToken',token).status(200).json({
        message : "Password is changed successfully",
        token
    });
}




// token for basantelsaey@gmail.com
// -- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2E1YTM3YzMzNjMyZDFjYzA2NjU0NiIsImlhdCI6MTcwNzg2NjU4NX0.FFY1vTT9wPpswuS-RL4jc2fEh8yvt8oZrOH5UWsaSO8



