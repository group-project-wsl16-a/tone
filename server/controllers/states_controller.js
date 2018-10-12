//Array that stores all the states and pics of the states
// const basicImg = require('../basicImg.jpeg')
let states = []

module.exports = {
    allStates: (req, res) => {
        res.status(200).send(states)
    },

    addState: (req, res) => {
        states.push({ state: req.body.state, pic: req.body.pic })

        res.status(200).send(states)
    }
}