const User = require('../modules/user');
const express = require('express');
const router = express.Router();

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
        res.redirect(`/user/${user.username}`);
    }
    catch(err){
        const errors = handleError(err);
        res.status(404).json({errors});
    }
})

module.exports = router;