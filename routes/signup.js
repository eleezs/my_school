const express =  require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const router = express.Router();
require("dotenv").config();
// const data = require('../utils/mailLetter')
const User = require('../models/userSchema')

const salt  = 10;


router.post('/register', async (req, res) => {
  let { firstname, lastname, email, password, sex, programs, courses } = req.body;

  const data = 
`
  <h3>Email Verification</h3>
  <h4>Dear ${req.body.firstname} ${req.body.lastname}</h4>
  <p>Thank you for your interest in studying the course ${req.body.courses}</p>
  <p>Your login details are as follows:
    <ul>
      <li>Username: ${req.body.email} </li>
      <li> Password: ${req.body.password}</li>
    </ul>
    <a href="https://oluaka-lms2.herokuapp.com/login_page.html">Click here to login</a><br>
    Thank you.<br>
    Admission Team.
    </p>
`;
  
const userExists = await User.findOne({ email });

 
  if (userExists){
    res.json({
      message: "User Already Exist, go back and try again"
    })
  } else {
    let hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      sex,
      programs,
      courses
    })
    res.json({message: "Your account has been created successfully check your mail for further instruction. if you dont see it in your inbox, check your spam. If is not there that means your email is invalid, go and register again."});

    let transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'spiritcat@yahoo.com',
        pass: process.env.MAILPAWD,
      },
      tls: {
        rejectUnauthorized:false
      }
    })
    
    
    const mailOptions = {
      from: '"Oluaka Learnning Management" <spiritcat@yahoo.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Account Creation and Activation', // Subject line
      html: data, // plain text body
    }
  
    transporter.sendMail(mailOptions, (error, info) =>{
      if (error) console.log(error)
      else console.log(info)
      
    })
  }

})

module.exports = router
