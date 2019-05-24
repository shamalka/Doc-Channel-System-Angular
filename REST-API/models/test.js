var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})

var postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comments:[commentSchema]
})

var Post = module.exports = mongoose.model('Post', postSchema);
var Comment = module.exports = mongoose.model('Comment', commentSchema);

// Get Doctors
// module.exports.getDoctors = function(callback, limit){
//     Doctor.find(callback).limit(limit);
// }

//Add Post
module.exports.addPost = function(post, callback){
    Post.create(post, callback);
}

//Add Comment
module.exports.addComment = function(comment, callback){
    Post.Comment.create(comment, callback);
}

//Get Posts
module.exports.getPosts = function(post, limit){
    Post.find(post).limit(limit);
}