const {makeConnection, blogschema} = require('../modules/blog');
const User = require('../modules/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const routes = express.Router();

function authenticate(req,res,next){
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"This is secret",(err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}
routes.get('/user/:username/', authenticate ,(req,res) =>{
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

routes.post('/user/:username/', authenticate ,(req,res)=>{
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
        .then(() => res.redirect(`/user/${req.params.username}/`))
        .catch(err => console.log(err));
})

routes.get('/user/:username/blogs', authenticate ,(req,res) =>{
    res.redirect(`/user/${req.params.username}/`);
})

routes.get('/user/:username/blogs/create', authenticate ,(req,res) =>{
    res.render('create_blog',{title : "My Blog | Create Blog",username: req.params.username});
})

routes.get('/user/:username/blogs/:id/update', authenticate ,(req,res)=>{
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    Blog.findById(req.params.id)
        .then((result) =>{
            res.render('update_blog',{title : "My Blog | blogs", data : result,username: req.params.username});
        })
        .catch(err => console.log(err));
})

routes.put('/user/:username/blogs/:id/update/:dataurl', authenticate ,(req,res)=>{
    const data = JSON.parse(decodeURI(req.params.dataurl));
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    Blog.findByIdAndUpdate(req.params.id,data)
        .then((result) =>{
            res.json({status : "Done"});
        })
        .catch(err => console.log(err));
})

routes.get('/user/:username/blogs/:id', authenticate ,(req,res)=>{
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

routes.delete('/user/:username/blogs/:id', authenticate ,(req,res)=>{
    const url = `mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/${req.params.username}?retryWrites=true&w=majority`
    const connection = makeConnection(url);
    const Blog = connection.model('blogs',blogschema);
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() =>{
            res.json({redirect : `/user/${req.params.username}/`});
        })
        .catch(err => console.log(err));
})

module.exports = routes;