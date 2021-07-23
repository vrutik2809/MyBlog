const Blog = require('../modules/blog');
const express = require('express');
const routes = express.Router();

routes.get('/blogs',(req,res) =>{
    res.redirect('/');
})

routes.get('/blogs/create',(req,res) =>{
    res.render('create_blog',{title : "My Blog | Create Blog"});
})

routes.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) =>{
            res.render('blog_data',{title : "My Blog | blogs",data : result});
        })
        .catch(() => res.status(404).render('404',{title : "Error | 404"}));
})

routes.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() =>{
            res.json({redirect : '/'});
        })
        .catch(err => console.log(err));
})


module.exports = routes;