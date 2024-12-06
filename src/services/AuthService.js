const {User} = require('../models')
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const config = require('../config')
const jwt = require("jsonwebtoken");

const service = {}

async function generateJwt(user){
  return await jwt.sign({ //TODO: Add User Agent and etc. to the token
    data: {
      user_id: user.id //todo: add time and physical expiration? pegged to expiresIn from accessTokenSecret?
    }
  }, config.accessTokenSecret, { expiresIn: '7d' });
}

service.me = async(token) => {
  let success = false
  const data = {}
  const errors = []
  let jwtToken
  try {
    jwtToken = jwt.verify(token, config.accessTokenSecret)
  } catch (err) {
    errors.push('Invalid JWT Token')
  }
  if(errors.length === 0) {
    const user = await User.findOne({ where: { id: jwtToken.data.user_id } })
    data.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    success = true
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

service.login = async(email, password) => {
  //TODO: reCaptcha or rate limits on controller
  let success = false
  const data = {}
  const errors = []

  if(email.length < 3 || email.length > 255) { // TODO: common login for email validation
    errors.push('Email must be between 3 and 255 characters.')
  }
  if(password.length < 8) { // TODO: common login for password validation
    errors.push('Password cannot be less than 8 characters.')
  }
  if(password.length > 255) {
    errors.push('Password cannot be greater than 255 characters.')
  }

  if(!emailValidator.validate(email)) {
    errors.push('Invalid Email Address.')
  }

  if(errors.length === 0) {
    const user = await User.findOne({where: {email: email.toLowerCase()}})
    if(!user) {
      errors.push('Invalid Email Address or Password.')
    }
    if(errors.length === 0) {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        success = true
        data.accessToken = await generateJwt(user)
      } else {
        errors.push('Invalid Email Address or Password.')
      }
    }
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

service.register = async(name, email, password, password2) => {
  //TODO: reCaptcha or rate limits on controller
  let success = false
  const data = {}
  const errors = []

  if(name.length < 3 || name.length > 255) {
    errors.push('Name must be between 3 and 255 characters.')
  }
  if(email.length < 3 || email.length > 255) { // TODO: common login for email validation
    errors.push('Email must be between 3 and 255 characters.')
  }
  if(password.length < 8) { // TODO: common login for password validation
    errors.push('Password cannot be less than 8 characters.')
  }
  if(password.length > 255) {
    errors.push('Password cannot be greater than 255 characters.')
  }
  if(password !== password2) {
    errors.push('Passwords must match.')
  }

  if(!emailValidator.validate(email)) {
    errors.push('Invalid Email Address.')
  }

  if(errors.length === 0) {
    const user = await User.findOne({where: {email: email.toLowerCase()}})
    if(user) {
      errors.push('Email Address is already in use.')
    }

    if(errors.length === 0) {
      //TODO: Email Verification
      const user = await User.create({
        email: email.toLowerCase(),
        name: name,
        password: await bcrypt.hash(password, 12)
      })
      success = true
      data.accessToken = await generateJwt(user.toJSON())
    }
  }

  return {
    success: success,
    data: data,
    errors: errors
  }
}

module.exports = service