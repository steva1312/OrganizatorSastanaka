const express = require('express')
const router = express.Router()
const axios = require('axios')

const clientId = process.env.ZOOM_CLIENT_ID
const clientSecret = process.env.ZOOM_CLIENT_SECRET

let refreshToken = ''
let accessToken = ''

const getZoomAccessToken = async (req, res, next) => {
  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    accessToken = response.data.access_token
    
    next()
  }
  catch(err) {
    console.error('Error:', err)
    res.json(err)
  }
    
}

router.get('/auth', (req, res) => {
  const redirectUri = encodeURIComponent('http://localhost:4000/zoom/callback')
  const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
  res.redirect(authorizationUrl)
})

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
      return res.status(400).send('No code provided');
  }

  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.ZOOM_REDIRECT_URL
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'routerlication/x-www-form-urlencoded'
      }
    })

    refreshToken = response.data.refresh_token
    res.json(response.data);
  }
  catch(err) {
    console.error('Error:', err)
    res.json(err)
  }
})

router.get('/', getZoomAccessToken, async (req, res) => {
  try {
    const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    res.json(response.data)
  }
  catch(err) {
    console.error('Error: ', err)
    res.json(err)
  }
})

router.get('/meetings', getZoomAccessToken, async (req, res) => {
  try {
    const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    console.log('ACAB KEROVI')
    res.json(response.data.meetings)
  }
  catch(err) {
    console.error('Error: ', err)
    res.json(err)
  }
})

router.post('/meetings', getZoomAccessToken, async (req, res) => {
  const { user, datetime } = req.body
  console.log(datetime + 'KERINE BEEEE')

  if (!user || !datetime) {
    res.send('Missing data')
    return
  }

  try {
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', 
      {
        topic: `Personal call with ${user.fullName}`,
        start_time: datetime,
        duration: 30,
        timezone: 'UTC',
        agenda: `Personal online date scheduled by ${user.fullName}.`,
        type: 2,

        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: false,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'none'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )

    console.log('ZOOM MEETING URL POST')
    res.json(response.data.join_url)
  }
  catch(err) {
    console.error('Error: ', err)
    res.json(err)
  }
})


module.exports = router