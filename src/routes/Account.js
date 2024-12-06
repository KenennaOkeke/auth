const { authorized } = require('../middleware/AuthMiddleware')
const {updateSettings, updatePassword} = require('../controllers/AccountController')

module.exports = (app) => {
  app.patch('/api/v1/account/settings', authorized, updateSettings)
  app.patch('/api/v1/account/password', authorized, updatePassword)
}