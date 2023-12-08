const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const fileSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
    },
    filename:String,
    code:Number,
    transformedFilename:String,
    filepath:String
})


fileSchema.pre('save',async function(next){
    this.code = Math.floor(100000 + Math.random() * 900000);
    next();
})

fileSchema.methods.comparePasswordInDb=(async function(pass,passDB){
    return await bcrypt.compare(pass,passDB);
})


const File = mongoose.model('File',fileSchema);

module.exports = File;