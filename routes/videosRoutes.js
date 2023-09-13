const express = require('express')
const router = express().router()
const cors = require('cors')

//Define a GET Route for Videos:

app.get('/videos', (req, res) => {
  const videos = ['video1', 'video2', 'video3'] // I need to find the real VIDEOS
  res.send('videos')
})

app.use(cors())
//Export
module.exports = router
