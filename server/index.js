const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const states = require('./controllers/states_controller')

const app = express()

app.use(bodyParser.json({limit: '700kb'}));
app.use( cors() )

//API Endpoints
app.get('/api/examples', states.allStates)
app.post('/api/examples', states.addState)

//Catch all routes that don't match anything and send to Build/index.js for Production
app.get('/*', express.static(
    path.join(__dirname, '..', 'build')
))

//Define Port and Launch Server
const port = 3030
app.listen( port, () => { console.log(`Server listening on port ${port}.`) })