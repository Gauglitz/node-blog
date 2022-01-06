const express = require("express")
const router = express.Router()
const Category = require("./Category")
const Slugify = require("slugify")
const { default: slugify } = require("slugify")
const adminAuth = require("../middlewares/adminAuth")

//criando a rota new
router.get("/admin/categories/new", adminAuth , (req, res) => {
    res.render("admin/categories/new")
})

//salvar no banco de dados
router.post("/categories/save", adminAuth , (req, res) => { //form=post
    var title = req.body.title
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })
})

router.post("/categories/delete", adminAuth , (req, res) => {
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){ 
            Category.destroy({ //deletar
                where: {
                    id: id
                } 
            }).then(() => {
                res.redirect("/admin/categories")
            })
        }else { //Não for um número
            res.redirect("/admin/categories")
        }
    }else{ //null
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id", adminAuth , (req, res) => {
    var id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/categories")
    }
    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit", {category: category})
        }else{
            res.redirect("/admin/categories")
        }
    }).catch(erro => {
        res.redirect("/admin/categories")
    })
})

//rota para atualizar
router.post("/categories/update", adminAuth , (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({title: title, slug: slugify(title)}, { //vou atualizar o titulo usando o id como referencia
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
})

module.exports = router