var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email: String,
    username: String,
    password : String,
    verified : Boolean,
    otp : Number
}),
commentSchema = mongoose.Schema({
    postid: String,
    email: String,
    comment: String,
}),
imageSchema = mongoose.Schema({
    filename: String,
    category: String,
    description: String,
    email: String,
    like: Number,
    comments:Number,
    likedBy: [String],
    dislike: Number,
    dislikedBy: [String],
},
    {    
        timestamps:true
    }),
    catSchema = mongoose.Schema({
        catName: String,
        catIcon: String
    }) 
module.exports = {
    image:mongoose.model("images", imageSchema),
    user:mongoose.model("users",userSchema),
    cat:mongoose.model("category",catSchema),
    comment:mongoose.model("comments",commentSchema),
}