const fs = require('fs')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const cors = require('cors')

router.use(cors()) // Browser has access.
router.use(express.json())
// console.log('hello!', __dirname)
const videosDetailed = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'video-details.json')),
)

//Get a list of videos
router.get('/', (req, res) => {
  // console.log('videos are here')
  res.status(200).json(videosDetailed)
})

router.get('/video/:id', (req, res) => {
  // Get video with id
  // Fetch video with the from
  const id = req.params.id
  console.log(id)
  const video = videosDetailed.filter((v) => v.id === id)
  console.log(video)
  res.json(video)

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
