const express = require('express')

const Users = require('./userDb.js')
const { validateUser, validateUserId } = require('./userValidate')


const router = express.Router()

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)

    .then(user => {
      res.status(201)
      .json(user)})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error creating the user' })
    })
})

router.get('/', (req, res) => {
  Users.get()

    .then(users => {
      res.status(200)
      .json(users)})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error retrieving the users' })
    })
})

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then(user => {

      if (user) {
        res.status(200)
        .json(user)

      } else {
        res.status(404)
        .json({ message: 'There is no user with that id' })}})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error retrieving the user' })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)

    .then(posts => {
      res.status(200)
      .json(posts)})

    .catch(error => {
      res.status(500)
      .json({ error: "We ran into an error retrieving the user's posts" })
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)

    .then(() => {
      res.status(200)
      .json({ message: 'User updated successfully' })})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error removing the user' })
    })
})

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)

    .then(() => {
      res.status(200)
      .json({ message: 'user deleted successfully' })})

    .catch(error => {
      res.status(500)
      .json({ error: 'We ran into an error removing the user' })
    })
})

module.exports = router