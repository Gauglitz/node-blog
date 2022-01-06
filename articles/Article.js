const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

//criando tbl
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//fazendo relacionamento entre tabelas
Category.hasMany(Article) //Uma categoria tem mts artigos
Article.belongsTo(Category) //Um artigo pertence a uma categoria


//import
module.exports = Article