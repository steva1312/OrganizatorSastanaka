const express = require('express')
const router = express.Router()

const authRouter = require('./auth')
router.use('/auth', authRouter)

const paymentRouter = require('./payment')
router.use('/payment', paymentRouter)

const callsRouter = require('./calls')
router.use('/calls', callsRouter)

const zoomRouter = require('./zoom')
router.use('/zoom', zoomRouter)

router.get('/', (req, res) => {
  res.send(req.protocol + '://' + req.get('host') + req.originalUrl)
})

module.exports = router