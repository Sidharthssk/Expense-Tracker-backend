const user = require('../models/User')


const getUsers = async () => {
    try {
        const users = await user.find()
        return users;
    } catch (error) {
        res.send("Error " + error)
    }
}

module.exports = getUsers