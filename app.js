const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const path = require('path');

//app.set('views',path.join(__dirname,'views_dir'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.listen(process.env.PORT || 3000);


//login routes
app.use(loginRoutes);

//register routes
app.use(registerRoutes);

//blog routing
app.use(blogRoutes);

app.get('/user/:username/contact',(req,res) =>{
    res.render('contact',{title : "My Blog | Contact",username:req.params.username});
})

//redirecting
app.get('/user/:username/contact-us',(req,res) =>{
    res.redirect('/user/:username/contact');
})

app.use((req,res) =>{
    res.status(404).render('404',{title : "Error | 404"});
})
