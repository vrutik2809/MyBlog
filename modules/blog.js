const dB = require('mongoose');
const Schema = dB.Schema;

const blogschema = new Schema({
    title:{
        type: String,
        required : true
    },
    overview:{
        type: String,
        required : true
    },
    discription:{
        type: String,
        required: true
    }
},{timestamps : true});

const Blog = dB.model('blogs',blogschema);
module.exports = Blog;
