const { Blog, validate } = require('../models/blogModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const express = require('express');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    let blog = await Blog.find({ userid: req.user._id });
    if (blog.length === 0) return res.status(404).send('No blogs found');
    res.send(blog);
});

router.post('/', authMiddleware, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const blog = new Blog({ userid: req.user._id, text: req.body.text });
    await blog.save();

    res.send(blog);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const blog = await Blog.findOneAndUpdate(
        { _id: req.params.id, userid: req.user._id },
        { text: req.body.text },
        { new: true }
    );

    if (!blog) return res.status(404).send('Blog not found');
    res.send(blog);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, userid: req.user._id });

    if (!blog) return res.status(404).send('Blog not found');
    res.send({ message: 'Blog deleted successfully' });
});

module.exports = router;