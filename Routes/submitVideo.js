const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const multer = require('multer')

const handleError = (req, res) => {
  res.status(500).contentType('text/plain').end('Oops! Something went wrong!')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public')
  },
  filename: (req, file, cb) => {
    console.log('file')
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('image'), (req, res) => {
  const tempPath = req.file.path
  const targetPath = path.join(__dirname, '../public/image.png') // Should I change this to public?

  if (path.extname(req.file.originalname).toLowerCase() === '.png') {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res)

      res.status(200).contentType('text/plain').end('File uploaded!')
    })
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res)

      res
        .status(403)
        .contentType('text/plain')
        .end('Only .png files are allowed!')
    })
  }
})

router.get('/image.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/image.png'))
})
