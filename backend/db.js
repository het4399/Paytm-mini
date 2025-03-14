const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Het:Qxbu9SYJocBPqr3l@cluster0.ivlpmjg.mongodb.net/paytm_backend');

const UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String,
})

const User=new mongoose.Model('UserSchema',UserSchema);
module.exports = User;