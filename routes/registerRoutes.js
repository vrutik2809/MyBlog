const User = require('../modules/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

function createToken(id){
    return jwt.sign({ id },`${String(id)}is a secret`,{
        expiresIn: 24 * 60 * 60
    })
}
function handleError(err){
    let errors = {
        username: "",
        password: ""
    }
    if(err.code === 11000){
        errors.username = "User aleardy exist"
        return errors;
    }
    Object.values(Object.values(err.errors)).forEach(({properties})=>{
        errors[properties.path] = properties.message;
    })
    return errors;
}
router.get('/register',(req,res) =>{
    res.render('signup',{title : "MyBlog | signup"});
})

router.post('/register',async (req,res) =>{
    try{
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({errors:{username : ""},username: user.username});
    }
    catch(err){
        const errors = handleError(err);
        res.status(404).json({errors});
    }
})

module.exports = router;