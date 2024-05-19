const express = require('express')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(cors())

const db = require('./models')

const router = require('./routes/router')
app.use('/', router)

db.sequelize.sync().then(async () => {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => console.log(`Server je pokrenut na portu ${PORT}...`))
})

