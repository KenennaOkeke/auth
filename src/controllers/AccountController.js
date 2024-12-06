const {updateSettings, updatePassword} = require('../services/AccountService')

const controller = {}

controller.updateSettings = async (req, res, next) => {
  const {name, email} = req.body
  try {
    if(name !== undefined && email !== undefined) {
      const response = await updateSettings(req.user.id, name, email)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}

controller.updatePassword = async (req, res, next) => {
  const {oldPassword, newPassword, newPassword2} = req.body
  try {
    if(oldPassword !== undefined && newPassword !== undefined && newPassword2 !== undefined) {
      const response = await updatePassword(req.user.id, oldPassword, newPassword, newPassword2)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}
module.exports = controller