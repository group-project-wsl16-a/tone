//Array that stores all the states and pics of the states
// const basicImg = require('../basicImg.jpeg')

module.exports = {
    allStates: (req, res) => {
        const dbInstance = req.app.get('db')
        console.log(dbInstance)
        dbInstance.get_db()
            .then( db => {
                res.status(200).send(db)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },

    addState: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(dbInstance)
        dbInstance.add_state([req.body.state, req.body.pic, req.body.environment])
            .then( state => {
                res.status(200).send(state)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
}