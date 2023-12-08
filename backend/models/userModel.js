const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        validate:[validator.isAlpha]
    },
    username:{
        type:String,
        required:[true,'username is required'],
        // validate:[validator.isAlpha]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:6,
        select:false
    },
    profileImage:String
    // confirmPassword:{
    //     type:String,
    //     required:[true,'Please enter your confirm password'],
    //     minlength:8,
    //     //this validator will only work for save() and create()
    //     validate:{
    //         validator: function(val){
    //             return val===this.password;
    //         },
    //         message:'Password & confirm password does not match.'
    //     },
    // }

})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    // this.confirmPassword = undefined; ///because we dont want store confirm password in db
    next();
})

userSchema.methods.comparePasswordInDb=(async function(pass,passDB){
    return await bcrypt.compare(pass,passDB);
})

const User = mongoose.model('User',userSchema);

module.exports = User;