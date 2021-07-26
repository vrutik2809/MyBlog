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
    },
    username:{
        type: String,
        required: true
    }
},{timestamps : true});

function makeConnection(url){
    return dB.createConnection(url,{useNewUrlParser : true,useUnifiedTopology: true,useFindAndModify: false});
}

module.exports = {
    makeConnection,
    blogschema,
};
