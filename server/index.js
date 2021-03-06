const path = require('path')
require('dotenv').config({'path': path.join(__dirname, '..', ".env")});
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const states = require('./states_controller')
const massive = require('massive');

const app = express()

//Connecting to the Database
console.log('Connection string', process.env.CONNECTION_STRING)
massive( process.env.CONNECTION_STRING, {"scripts":path.join(__dirname, "db")}).then( dbInstance => { app.set('db', dbInstance) });

app.use(bodyParser.json({limit: '700kb'}));
app.use( cors() )

//API Endpoints
app.get('/api/examples', states.allStates)
app.post('/api/examples', states.addState)

//Catch all routes that don't match anything and send to Build/index.js for Poduction
app.get('/*', express.static(
    path.join(__dirname, '..', 'build')
))

//Define Port and Launch Server
let PORT = process.env.PORT || 3030;
app.listen( PORT, () => { console.log(`Server listening on port ${PORT}.`) })