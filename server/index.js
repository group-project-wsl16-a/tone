require('dotenv').config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const states = require('./states_controller')
const massive = require('massive');

const app = express()

//Connecting to the Database
// console.log(process.env.CONNECTION_STRING)
massive( process.env.CONNECTION_STRING ).then( dbInstance => { app.set('db', dbInstance) });

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
let PORT = process.env.PORT || 3030;
app.listen( PORT, () => { console.log(`Server listening on port ${PORT}.`) })