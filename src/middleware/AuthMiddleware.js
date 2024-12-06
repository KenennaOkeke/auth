const jwt = require("jsonwebtoken");
const config = require("../config");
const { User } = require("../models");

const middleware = {}

middleware.guest = async (req, res, next) => {
  if(req.header('Authorization')) {
    return res.status(409).send()
  }
  return next()
}

middleware.authorized = async (req, res, next) => {
  if(!req.header('Authorization')) {
    return res.status(401).send()
  }
  const token = req.header('Authorization').replace('Bearer ', '')
  let jwtToken
  try {
    jwtToken = jwt.verify(token, config.accessTokenSecret)
    req.user = await User.findOne({ where: { id: jwtToken.data.user_id } })
    return next()
  } catch (err) {
    return res.status(401).send()
  }
}

module.exports = middleware