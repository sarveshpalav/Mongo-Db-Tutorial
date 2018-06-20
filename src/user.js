const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
name:{
    type:String,
    validate:{
        validator:(name)=>name.length>2,
        message:'Name must be longer than 2 characters.'
    },
    required:[true,'Name is required.']
},

posts :[PostSchema],
likes:Number,
blogPosts:[{
    type:Schema.Types.ObjectId,
    ref:'blogPost'
}]

});

UserSchema.virtual('postCount').get(function(){  // we dont use fat arrow fn's because this is the instane of the model
return this.posts.length;

});


UserSchema.pre('remove',function(next){
/// this === joe
const BlogPost = mongoose.model('blogPost');

BlogPost.remove({_id:{$in:this.blogPosts}})
.then(()=>{
    next();
})


})
const User = mongoose.model('user',UserSchema) //represents all collection of data

module.exports = User;
