const {makeConnection, blogschema} = require('../modules/blog');
const User = require('../modules/user');
const express = require('express');
const routes = express.Router();

routes.get('/login/:username/',(req,res) =>{
    User.findOne({username: req.params.username})
        .then((result) => {
            if(result == null){
                res.status(404).render('404',{title : "Error | 404"});
            }
        });
        
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    Blog.find().sort({ createdAt : -1})
        .then((result) =>{
            res.render('index',{title : "My Blog | Home" , data : result, username:req.params.username});
        })
        .catch(err => console.log(err));
})

routes.post('/login/:username/',(req,res)=>{
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    const blog = new Blog({
        title: req.body.title,
        overview: req.body.overview,
        discription: req.body.discription,
        username: req.params.username
    });
    blog.save()
        .then(() => res.redirect(`/login/${req.params.username}/`))
        .catch(err => console.log(err));
})

routes.get('/login/:username/blogs',(req,res) =>{
    res.redirect(`/login/${req.params.username}/`);
})

routes.get('/login/:username/blogs/create',(req,res) =>{
    res.render('create_blog',{title : "My Blog | Create Blog",username: req.params.username});
})

routes.get('/login/:username/blogs/:id',(req,res)=>{
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    const id = req.params.id;
    Blog.findById(id)
        .then((result) =>{
            res.render('blog_data',{title : "My Blog | blogs",data : result, username:req.params.username});
        })
        .catch(() => res.status(404).render('404',{title : "Error | 404"}));
})

routes.delete('/login/:username/blogs/:id',(req,res)=>{
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() =>{
            res.json({redirect : `/login/${req.params.username}/`});
        })
        .catch(err => console.log(err));
})

module.exports = routes;