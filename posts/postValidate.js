module.exports = {
    validatePost,
    validatePostId
}

function validatePost(req, res, next) {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400)
        .json({ message: 'missing post data' })
  
    } else if (!req.body.text) {
        res.status(400)
        .json({ message: 'missing required text field' })
  
    } else {
        next()
    }
}

function validatePostId(req, res, next) {
    Posts.getById(req.params.id)
        .then(post => {

        if (post) {
            req.post = post
            next()

        } else {
            res.status(400)
            .json({ message: 'Invalid post id' })}})

        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error searching for the user' })
        })
}