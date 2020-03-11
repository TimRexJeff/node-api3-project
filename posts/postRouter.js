const express = require('express')

const Posts = require('../posts/postDb.js')
const { validatePost, validatePostId } = require('../posts/postValidate')

const router = express.Router()

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

  const postData = { ...req.body, user_id: req.params.id }

  Posts.insert(postData)

    .then(post => {
      res.status(201)
      .json(post)})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error creating the post' })
    })
})

router.get('/', (req, res) => {
  Posts.get()

    .then(posts => {
      res.status(200)
      .json(posts)})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error retrieving the posts' })
    })
})

router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {

      if (post) {
        res.status(200)
        .json(post)

      } else {
        res.status(404)
        .json({ message: 'There is no post with that id' })}})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error retrieving the post' })
    })
})

router.put('/:id', validatePostId, validatePost, (req, res) => {
  Posts.update(req.params.id, req.body)

    .then(() => {
      res.status(200)
      .json({ message: 'Post updated successfully' })})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error removing the post' })
    })
})

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)

    .then(() => {
      res.status(200)
      .json({ message: 'Post deleted successfully' })})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error removing the post' })
    })
})

module.exports = router
