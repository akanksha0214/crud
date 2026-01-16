const Blog = require("../model/blog");
const Comment = require("../model/comment")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

const addBlog = async (req, res) => {
    return res.render("addblog", {
        user: req.user
    })
}

const postBlog = async (req, res) => {
    console.log(req.body);
    console.log(req.file)
    const { title, body } = req.body;
    const blog = await Blog.create({
        title, body,
        createdby: req.user._id,
        coverimg: `uploads/${req.file.filename}`
    })
    return res.redirect("/")
}

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdby")
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    return res.render("blogs", {
        user: req.user,
        blog,
        comments
    })
}

const postComment = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}

const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect("/");
}


module.exports = { addBlog, postBlog, upload, getBlog, postComment, deleteBlog }