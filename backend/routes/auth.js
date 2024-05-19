const express = require('express')
const router = express.Router()

const verify = require('../middlewares/verify')

const jwt = require('jsonwebtoken')

const { Users, Calls } = require('../models')

router.post('/email', async (req, res) => {
  const { email } = req.body

  const user = await Users.findOne({ where: { email: email } })

  res.json({ available: user == null })
})

router.post('/register', async (req, res) => {
  const user = req.body.userData
  const {email, password, fullName} = user
  user.plan = req.body.plan

  if (user.plan == 'CALLS') user.callsLeft = req.body.callsCount
  else if (user.plan == 'CHARMER') user.callsLeft = 4
  else user.callsLeft = 8

  if (!email || !password || !fullName) {
    res.json({ error: 'Wrong input data' })
    return
  }

  const emailRE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  if (!emailRE.test(email)) {
    res.json({ error: 'Wrong mail format' })
    return
  }

  if (password.length < 6) {
    res.json({ error: 'Too short password' })
    return
  }

  const alreadyExistsUser = await Users.findOne({ where: { email: email } })
  if (alreadyExistsUser != null) {
    res.json({ error: 'Mail is already registered' })
    return
  }
  
  const newUser = await Users.create(user)
  const accessToken = jwt.sign({ email: newUser.email, id: newUser.id }, 'sifra')
  res.json({ accessToken: accessToken })
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.json({ error: 'Wrong input data' })
    return
  }

  const user = await Users.findOne({ where: { email: email } })

  if (user == null) {
    res.json({ error: 'User doesn\'t exist' })
    return
  }
  
  if (user.password != password) {
    res.json({ error: 'Wrong password' })
    return
  }

  const accessToken = jwt.sign({ email: user.email, id: user.id }, 'sifra')

  res.json({ accessToken: accessToken })
})

router.get('/validate', verify, async (req, res) => {
  const user = await Users.findByPk(res.locals.userId)

  const calls = await Calls.findAll()

  res.json({ user: user, calls: calls })
})

module.exports = router