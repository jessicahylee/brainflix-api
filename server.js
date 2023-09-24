require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const path = require('path')

const videoRoutes = require('./Routes/videoRoutes') // I'm exporting the videoRoute
const submitVideo = require('./Routes/submitVideo.js')
console.log('this is line 9')
app.use('/videos', videoRoutes)
app.use('/submitVideo', submitVideo)

app.listen(PORT, () => {
  console.log('Server Started on http://localhost:8080')
  console.log('Press CTRL + C to stop server')
})
