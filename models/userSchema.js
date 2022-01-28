const  mongoose  = require('mongoose');
const express =  require('express');
const bcrypt = require('bcrypt');

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
    min: 8
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

module.exports =  User 

