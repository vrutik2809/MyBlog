const User = require('../modules/user');
const express = require('express');
const router = express.Router();

router.get('/register',(req,res) =>{
    res.render('signup',{title : "MyBlog | signup"});
})

router.post('/register',(req,res) =>{
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
})

module.exports = router;