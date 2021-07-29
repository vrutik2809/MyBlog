const User = require('../modules/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/',(req,res) =>{
    res.redirect('/login');
})

router.get('/login',(req,res) =>{
    res.render('signin',{title : "MyBlog | signin"});
})

router.post('/login',async (req,res) =>{
    const user = await User.findOne({ username : req.body.username });
    let result = {
        user_ID: null,
        error:{
            username : {
                message : "",
                status : false
            },
            password : {
                message : "",
                status : false
            }
        }
    }
    if(user){
        const password = await bcrypt.compare(req.body.password,user.password);
        if(password){
            result.user_ID = user._id;
            res.status(200).json(result);
        }
        else{
            result.error.password.status = true;
            result.error.password.message = "Password doesn't match";
            res.status(404).json(result);
        }
    }
    else{
        result.error.username.status = true;
        result.error.username.message = "User doesn't exist";
        res.status(404).json(result);
    }
})

module.exports = router;