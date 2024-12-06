const db = require('../models')

async function seed() {
  await db['User'].sync({ force: true })
  await db['sequelize'].sync({force: true})
}

seed()
