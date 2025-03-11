const Joi = require('joi');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    }
});

const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(blog) {
    const schema = Joi.object({
        text: Joi.string().min(1).max(1000).required(),
    });

    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;