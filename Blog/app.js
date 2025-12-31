//    jshint esversion:6
const express = require('express')
const path = require('path')
const fs = require('fs')

/* eslint-disable no-unused-vars */
const ejs = require('ejs')

//load lodash
var _ = require('lodash');

const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.'
/* eslint-disable no-unused-vars */
const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Serve React frontend from build directory
const frontendBuildPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendBuildPath))

app.use(express.json())

// JSON file storage for posts
const postsFilePath = path.join(__dirname, 'posts.json')

// Load posts from JSON file
const loadPosts = () => {
  try {
    if (fs.existsSync(postsFilePath)) {
      const data = fs.readFileSync(postsFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading posts:', error)
  }
  return []
}

// Save posts to JSON file
const savePosts = (posts) => {
  try {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))
    return true
  } catch (error) {
    console.error('Error saving posts:', error)
    return false
  }
}

let posts = loadPosts()

// API Routes for React frontend

//get all posts
app.get('/api/posts', (req, res) => {
  res.json({ posts, homeContent: homeStartingContent })
})

//get about content
app.get('/api/about', (req, res) => {
  res.json({ aboutContent })
})

//get contact content
app.get('/api/contact', (req, res) => {
  res.json({ contactContent })
})

//compose route 
app.post('/api/compose', (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    title: postTitle,
    content: postContent,
    createdAt: new Date().toISOString()
  }
  posts.push(postObj)
  savePosts(posts) // Save to JSON file
  res.json({ success: true, posts })
})

//get specific post
app.get('/api/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let foundPost = null
  
  posts.forEach((post) => {
    if (_.toLower(post.title) === _.toLower(postTitle)) {
      foundPost = post
    }
  })

  if (foundPost) {
    res.json(foundPost)
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

//delete specific post
app.delete('/api/posts/:postIndex', (req, res) => {
  const postIndex = parseInt(req.params.postIndex)
  if (postIndex >= 0 && postIndex < posts.length) {
    posts.splice(postIndex, 1)
    savePosts(posts)
    res.json({ success: true, posts })
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

// Serve React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'))
})

// app .listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
  console.log(`Frontend served from: ${frontendBuildPath}`)
})
