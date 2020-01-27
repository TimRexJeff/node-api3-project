module.exports = {
    validateUser,
    validateUserId
}

function validateUser(req, res, next) {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400)
        .json({ message: 'missing user data' })
  
    } else if (!req.body.name) {
        res.status(400)
        .json({ message: 'missing required name field' })

    } else {
        next()
    }
  }

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
        .then(user => {

        if (user) {
            req.user = user
            next()

        } else {
            res.status(400)
            .json({ message: 'Invalid user id' })}})

        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error searching for the user' })
        })
}