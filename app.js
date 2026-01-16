require("dotenv").config()
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticateCookies } = require("./middleware/authenticate");
const Blog = require("./model/blog")

const app = express();
const PORT = process.env.PORT || 3000;

// const DB_URL = "mongodb+srv://akanksha:aaaa@projectdb.w6coa1d.mongodb.net/node?retryWrites=true&w=majority&appName=ProjectDb";
// mongoose.connect(DB_URL).then(() => {
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
        console.log(`running on ${PORT}`)
    })
}).catch(err => {
    console.log(err, "Error while connecting")
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(checkForAuthenticateCookies("token"))
app.use(express.static(path.resolve("./public")))

app.use((req, res, next) => {
    res.locals.user = req.user;
    console.log(req.user)
    next();
});

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home", {
        // user: req.user,
        blogs: allBlogs
    });
});

app.use("/user", userRoute)
app.use("/blog", blogRoute)
