const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const accessToken = req.header('accessToken')

  if (!accessToken) return res.json({ error: 'No token' })

  try {
    const decoded = jwt.verify(accessToken, 'sifra')

    res.locals.userId = decoded.id

    if (decoded) return next()
  }
  catch (e) {
    return res.json({ error: 'Invalid token' })
  }
}

module.exports = verify