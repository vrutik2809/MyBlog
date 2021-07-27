const User = require('../modules/user');
const express = require('express');
const router = express.Router();

router.get('/register',(req,res) =>{
    res.render('signup',{title : "MyBlog | signup"});
})

router.post('/register',(req,res) =>{
    const user = new User(req.body);
    User.findOne({username : req.body.username})
        .then((result) => {
            if(result == null){
                user.save()
                    .then(() => {
                        res.redirect('/login');
                    })
                    .catch(err => console.log(err));
            }
            else{
                res.status(404).send("<h1>username already exists</h1>");
            }
        })
        .catch((err) => console.log(err));
})

module.exports = router;