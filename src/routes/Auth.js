const { guest } = require('../middleware/AuthMiddleware')
const {register, login, me} = require('../controllers/AuthController')

module.exports = (app) => {
  app.post('/api/v1/auth/register', guest, register)
  app.post('/api/v1/auth/login', guest, login)
  app.post('/api/v1/auth/me', me)
}