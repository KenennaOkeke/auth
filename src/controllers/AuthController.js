const {register, login, me} = require('../services/AuthService')

const controller = {}

controller.me = async (req, res, next) => {
  const {token} = req.body
  try {
    if(
      token !== undefined
    ) {
      const response = await me(token)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}

controller.register = async (req, res, next) => {
  const {name, email, password, password2} = req.body
  try {
    if(
      name !== undefined &&
      email !== undefined &&
      password !== undefined &&
      password2 !== undefined
    ) {
      const response = await register(name, email, password, password2)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}

controller.login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    if(email !== undefined && password !== undefined) {
      const response = await login(email, password)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = controller