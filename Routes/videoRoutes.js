const fs = require('fs')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const uniqid = require('uniqid')

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

router.post('/videos/:id', (req, res) => {
  const newId = uniqid()
  const newComment = Object.assign({ id: newId }, req.body)
  const videoId = req.params.id
  const video = videosDetailed.find((el) => el.id === videoId)
  video.comments.push(newComment)
  fs.writeFile(
    `./assets/data/video-details.json`,
    JSON.stringify(videosDetailed),
    (err) => {
      res.status(201).json(video)
    },
  )
})

module.exports = router
