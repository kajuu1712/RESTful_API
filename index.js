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
      username: "tech_girl23",
      content: "Just deployed my first Node.js app! 🚀 #WebDev",
      id : uuidv4()
    },
    {
      username: "coffeeCoder",
      content: "Debugging is like being the detective in a crime movie where you're also the murderer.",
      id : uuidv4()
    },
    {
      username: "john_doe",
      content: "Learning EJS templating today... and it's actually fun!",
      id : uuidv4()
    },
    {
        username: "designqueen",
        content: "Minimal CSS, maximum impact. Styling my CRUD app like a pro! 🎨",
        id : uuidv4()
      },
      {
        username: "code_ninja",
        content: "Finally understood how method-override works. Feeling powerful! 💪",
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
app.get("/", (req, res) => {
    res.redirect("/posts"); 
  });
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})