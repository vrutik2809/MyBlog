const User = require('../modules/user');
const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.redirect('/login');
})

router.get('/login',(req,res) =>{
    res.render('signin',{title : "MyBlog | signin"});
})

router.post('/login',(req,res) =>{
    const user = new User(req.body);
    User.findOne(req.body)
        .then((result) => {
            if(result == null){
                res.status(404).render('404',{title : "Error | 404"});
            }
            else{
                res.redirect(`/login/${req.body.username}`);
            }
        });
})

module.exports = router;