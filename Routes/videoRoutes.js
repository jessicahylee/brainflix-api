const fs = require('fs')
const express = require('express')
const router = express.Router()
const cors = require('cors')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const videosDetailed = JSON.parse(fs.readFileSync('./data/package-lock.json'))
console.log(videosDetailed)

router.use(cors()) // Browser has access.
router.use(express.json())

// GET NEW VIDEOS:

router.get('/', (req, res) => {
  console.log('videos are uploaded')
  res.json(videosDetailed)
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
