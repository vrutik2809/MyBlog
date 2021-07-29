const dB = require('mongoose');
const bcrypt = require('bcrypt');
const connection = dB.createConnection('mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/userdata?retryWrites=true&w=majority',{useNewUrlParser : true,useUnifiedTopology: true,useCreateIndex:true})
const Schema = dB.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        validate: [(val) =>{
            const user_regex = /^[^ ]+$/;
            return user_regex.test(val);
        } ,'Please enter valid username']
    },
    password:{
        type: String,
        required: true,
        validate: [(val)=>{
            const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-z0-9]).{5,}$/;
            return password_regex.test(val);
        },'Please enter a valid password']
    }
},{timestamps : true})

userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = connection.model('users',userSchema);
module.exports = User;