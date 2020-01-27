const server = require('./api/server.js')

const port = 4321
server.listen(port, () => console.log(`\n== API running on port ${port} ==\n`))