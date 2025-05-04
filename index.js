const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4 : uuidv4} = require('uuid');  //unique id for each post
const methodOverride = require('method-override');   //override post requests


//views
app.set("view engine", "views");
app.set("views", path.join(__dirname, "/views"));
//public
app.use(express.static(path.join(__dirname, "/public")));
//parsing
app.use(express.urlencoded({extended : true}));
app.use(express.json());
//override
app.use(methodOverride('_method'));


//data
let posts = [
    {
        username : "user1",
        content : "content1",
        id : uuidv4()
    },
    {
        username : "user2",
        content : "content2",
        id : uuidv4()
    },
    {
        username : "user3",
        content : "content3",
        id : uuidv4()
    }
];

app.get("/posts", (req, res) => {
    res.render("home.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let newPost = req.body;
    posts.push({username: newPost.username, content: newPost.content, id: uuidv4()});
    res.redirect("/posts");
})
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", {post});
})
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
})
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    post.content = req.body.content;
    res.redirect("/posts");
})
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})