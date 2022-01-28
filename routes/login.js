const express =  require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userSchema')


router.post('/login', async(req, res) =>{
  const email = req.body.email
  const password = req.body.password;
  console.log(email, password);
 

  try {
    let user = await User.findOne({ email });
      if(!user ) {
        return res.json({message: "Invalid email or "})
      };
      let validatePassword = await bcrypt.compare(password, user.password)
      if (!validatePassword){
        return res.json({message: "Invalid email or Password"}); 
      }
      // else {
        // res.json({message: "login succesful"})
        res.redirect("https://oluaka-lms2.herokuapp.com/dashboard.html")
      // }
     
  }

  catch(err){
    console.log(err.message)
  }
  
})


module.exports = router