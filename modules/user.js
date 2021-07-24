const dB = require('mongoose');
const connection = dB.createConnection('mongodb+srv://popaye:drowssap@cluster0.m2mv7.mongodb.net/userdata?retryWrites=true&w=majority',{useNewUrlParser : true,useUnifiedTopology: true})
const Schema = dB.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps : true})

const User = connection.model('users',userSchema);
module.exports = User;