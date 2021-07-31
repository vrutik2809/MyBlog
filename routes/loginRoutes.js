const User = require('../modules/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

function createToken(id){
    return jwt.sign({ id },`${String(id)}is a secret`,{
        expiresIn: 24 * 60 * 60
    })
}

function authenticate(req,res,next){
    const token = req.cookies.jwt;
    if(token){
        const user_ID = jwt.decode(req.cookies.jwt).id;
        jwt.verify(token,`${String(user_ID)}is a secret`,(err,decodedToken)=>{
            if(err){
                res.cookie('redirect',true);
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

router.get('/',authenticate, async (req,res)=>{
    const user_ID = jwt.decode(req.cookies.jwt).id;
    const result = await User.findById(user_ID);
    res.redirect(`user/${result.username}`);
})

router.get('/login',async (req,res) =>{
    const isRedirect = req.cookies.redirect;
    if(isRedirect){
        res.clearCookie('redirect');
        res.render('signin',{title : "MyBlog | signin"});
    }
    else{
        const token = req.cookies.jwt;
        if(token){
            const user_ID = jwt.decode(token).id;
            const result = await User.findById(user_ID);
            res.redirect(`user/${result.username}`);
        }
        else{
            res.render('signin',{title : "MyBlog | signin"});
        }
    }
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
            const token = createToken(user._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
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

router.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/');
})

module.exports = router;