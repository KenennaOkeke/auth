module.exports = (app) => {
  require('./Auth')(app)
  require('./Account')(app)
}
