const express = require('express')
const router = express.Router()

const paypal = require('@paypal/checkout-server-sdk')
const paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
  'ARfpvxdId9hZ47YQSQeqCmKp8bDWqViZC4kXvcWJ9ddmSBNswQu2oKaL4ibKBovehBvbbtFyqpEHzWtV',
  'EE3H16okDEdObbwezJ9FOOmdqfzepG0IokUm7ECVE127F8V0arZwZrjjevFDRLrWmyRRXA3d0m8ZbYW8'
))

const PLANS = [
  {
    id: 'CHARMER',
    name: 'Charmer Plan',
    price: 99
  },
  {
    id: 'MACHO',
    name: 'Macho Plan',
    price: 199
  },
  {
    id: 'CALLS',
    name: 'Calls',
    price: [19, 34, 55, 63]
  },
]

router.post('/buy', async (req, res) => {
  const { id, callsCount } = req.body

  console.log(id, callsCount)

  if (!id) return res.json({ error: 'No plan id specified' })
  if (id == 'CALLS' && !callsCount) return res.json({ error: 'No count for calls id specified' })
  if (id == 'CALLS' && (callsCount < 1 || callsCount > 4)) return res.json({ error: 'Invalid calls count' })

  const plan = PLANS.find(p => p.id == id)

  if (!plan) return res.json({ error: 'Invalid plan id' })

  const finalPrice = id != 'CALLS' ? plan.price : plan.price[callsCount - 1]

  const request = new paypal.orders.OrdersCreateRequest()

  request.prefer('return=representation')

  request.requestBody({
    intent: 'CAPTURE',
    application_context: {
      shipping_preference: 'NO_SHIPPING',
    },
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: finalPrice,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: finalPrice,
            }
          }
        },
        items: [
          {
            name: plan.name,
            unit_amount: {
              currency_code: 'USD',
              value: finalPrice,
            },
            quantity: 1
          }
        ]
      }
    ]
  })

  try {
    const order = await paypalClient.execute(request)
    res.json({ id: order.result.id })
  } catch(e) {
    console.log(e)
    res.json(e)
  }
})

module.exports = router