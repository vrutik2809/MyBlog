const User = require('../modules/user');
const express = require('express');
const router = express.Router();

router.get('/register',(req,res) =>{
    res.render('signup',{title : "MyBlog | signup"});
})

router.post('/register',(req,res) =>{
    const user = new User(req.body);
    User.findOne(req.body)
        .then((result) => {
            if(result == null){
                res.status(404).render('404',{title : "Error | 404"})
            }
            user.save()
                .then(() => {
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
        })
        .catch((err) => console.log(err));
})

module.exports = router;