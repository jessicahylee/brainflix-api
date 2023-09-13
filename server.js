const express = require('express')

const app = express()
const videos = require('./routes/videosRoutes')

app.use('/videos', videos)

app.listen(8080, () => {
  console.log('Server Started on http://localhost:8080')
  console.log('Press CTRL + C to stop server')
})
