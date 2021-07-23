const express = require('express');
const  dB = require('mongoose');
const Blog = require('./modules/blog');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
// const path = require('path');

//database connection
const dBURL = "mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/sample?retryWrites=true&w=majority";
dB.connect(dBURL,{useNewUrlParser : true,useUnifiedTopology: true}) 
    .then((res) => {
        app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));

//app.set('views',path.join(__dirname,'views_dir'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

app.get('/',(req,res) =>{
    Blog.find().sort({ createdAt : -1})
        .then((result) =>{
            res.render('index',{title : "My Blog | Home" , data : result});
        })
        .catch(err => console.log(err));
})

app.post('/',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
})

//blog routing
app.use(blogRoutes);

app.get('/contact',(req,res) =>{
    res.render('contact',{title : "My Blog | Contact"});
})

//redirecting
app.get('/contact-us',(req,res) =>{
    res.redirect('/contact');
})

app.use((req,res) =>{
    res.status(404).render('404',{title : "Error | 404"});
})
