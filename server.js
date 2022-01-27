// loading express modules
const  mongoose  = require('mongoose');
const express =  require('express');
const cors = require("cors");
const path = require('path');
// const { MongoClient } = require('mongodb');
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const Swal = require('sweetalert2')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded ({ extended : true }))


//to load css files and html
app.use(express.static(path.join(__dirname + '/static')));
app.use(express.static(path.join(__dirname + '/views')));


// connect to Db
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
  console.log("mongodb not connected");
  console.log(error);
}); 

// mongoose.connect('mongodb://localhost/Oluaka_Db')
//     .then(() => console.log('Connected to Mongodb..'))
//     .catch((err) => console.log('Could not connect to Mongodb.. ', err));

// schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true
  },
  programs: {
    type: String,
    required: true
  },
  courses: {
    type: String,
    required: true
  }
  // status: {
  //   enum: ['Pending', 'Active'],
  //   default: 'Pending'
  // }
}); 
// model init
const User = mongoose.model('User', userSchema);

// user registration
// POST /api/users/register
// register and get token



app.post('/register', async (req, res) => {
  let { firstname, lastname, email, password, sex, programs, courses } = req.body;

  const data = `<h3>Email Verification</h3>
  <p>Welcome ${req.body.firstname} ${req.body.lastname}</p>
  <a href="https://oluaka-lms2.herokuapp.com/login_page.html">Click here to login</a>
  `;

  const userExists = await User.findOne({ email });

  if (userExists){
    res.json({
      message: "User Already Exist, go back and try again"
    })
  } else {
    // const salt = await bcrypt.genSalt(10);
    // User.password = await bcrypt.hash(password, salt);  
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
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
        pass: 'zrechdvogjyzgtvz',
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

app.post('/login', async(req, res) =>{
  let { email, password } = req.body;
  console.log(email, password)
  await User.findOne({ email }).then(user =>{
    if(!user ) {
      return res.send({message: "Invalid email or Password "});
    }
    if (password !== user.password){
      return res.send({message: "Invalid email or Password"}); 
    }
    // res.json({message:"login succesful"})
    res.redirect("/dashboard.html")
    
  })
})




//PORT Environment var
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));





