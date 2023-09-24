const fs = require('fs')
const express = require('express')
const router = express.Router()
const cors = require('cors')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const path = require('path')
// const videosDetailed = data.videos

router.use(cors()) // Browser has access.
router.use(express.json())
console.log('this is the line')
const videosDetailed = JSON.parse(fs.readFileSync('../data/video-details.json'))
const videos = JSON.parse(fs.readFileSync('../data/video.json'))
//Get a list of videos
router.get('/', (req, rest) => {
  console.log('videos are here')
  res.status(200).json(videosDetailed)
})

router.get('/video/:videoID', (req, res) => {
  fs.readFile(
    path.join(__dirname, 'files', 'package.json'),
    (err, fileData) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error reading file')
      } else {
        console.log(fileData)
        console.log('videos are uploaded')
        res.json(videosDetailed)
      }
    },
  )
})

router.post('/', (req, res) => {
  const { title, channel, views, description, like, videoUrl } = req.body
  const newVideos = {
    id: uuidv4(),
    title,
    channel,
    views,
    description,
    like,
    videoUrl,
  }
  videosDetailed.push(newVideos)
  res.json(newVideos)
})

module.exports = router
