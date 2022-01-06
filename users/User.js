const Sequelize = require("sequelize")
const connection = require("../database/database")

//criando tbl
const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false})

//import
module.exports = User