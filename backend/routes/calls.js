const express = require('express')
const router = express.Router()
const axios = require('axios')

const verify = require('../middlewares/verify')

const { Calls, Users } = require('../models')

router.get('/', async (req, res) => {
  const calls = await Calls.findAll()

  res.send(calls)
})

router.post('/', verify, async (req, res) => {
  const { datetime } = req.body

  if (!datetime) return res.json('Missing data')

  const user = await Users.findOne({ where: { id: res.locals.userId } })

  if (user.callsLeft <= 0) return res.json({ error: 'No more calls left' })

  const alreadyCall = await Calls.findOne({ where: { datetime: datetime } })
  if (alreadyCall) return res.json({ error: 'Already booked' })

  //get zoom meeting url
  const zoomMeetingsUrl = process.env.ZOOM_MEETINGS_URL
  const response = await axios.post(process.env.ZOOM_MEETINGS_URL, { user: user, datetime: datetime })
  const joinUrl = response.data
  console.log('JOIN URLLLLL:    ', joinUrl, zoomMeetingsUrl)

  const newCall = await Calls.create({datetime: datetime, zoomUrl: joinUrl, userId: user.id })

  await user.update({ callsLeft: user.callsLeft - 1 })

  res.send(newCall)
})

router.post('/add-count', verify, async (req, res) => {
  if (!req.body.callsCount) return

  const user = await Users.findOne({ where: { id: res.locals.userId } })

  await user.update({ callsLeft: user.callsLeft + req.body.callsCount })

  res.send('ok')
})

router.delete('/:id', verify, async (req, res) => {
  const removed = await Calls.destroy({ where: { id: req.params.id } })

  if (!removed) {
    res.json({ error: 'No call' })
    return
  }

  const user = await Users.findOne({ where: { id: res.locals.userId } })

  await user.update({ callsLeft: user.callsLeft + 1 })

  res.send('done')
})

module.exports = router