import express from "express";
import Async from "express-async-handler";
import Post from "../models/posts.js";
import Comment from "../models/comment.js";
const route = express.Router();
route.get("/get/allpost/:id", Async(async (req, res) => {
    const posts = await Post.find({ user_id: req.params.id });
    if (posts) {
        res.status(200).send(posts);
    }
    else {
        res.status(404).send({ message: "Posts not found !" });
    }
}));
route.get("/get/allpostby/:name", Async(async (req, res) => {
    const posts = await Post.find({ title: req.params.name });
    if (posts) {
        res.status(200).send(posts);
    } else {
        res.status(404).send({ message: "Posts not found ! We search posts by Title" })
    }
}));
// for posts details
route.get("/get/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        const comment = await Comment.find({ post_id: post._id });
        if (comment) {
            res.status(200).send({
                author: post.author,
                user_id: post.user_id,
                user_img: post.user_img,
                font: post.font,
                content: post.content,
                likes: post.likes,
                likers: post.likers,
                title: post.title,
                comments: comment
            })
        } else {
            res.status(200).send(post);
        }
    }
    else {
        res.status(404).send({ message: "No Post Found" });
    }
}));
route.post("/post/post", Async(async (req, res) => {
    const post = new Post({
        author: req.body.author,
        user_id: req.body.user_id,
        content: req.body.content,
        title: req.body.title,
        font: req.body.font,
        user_img: req.body.user_img
    });
    try {
        const newpost = await post.save();
        res.status(200).send(newpost);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
}))
route.put("/put/post", Async(async (req, res) => {
    const post = await Post.findById(req.body._id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        try {
            const updated = await post.save();
            res.status(200).send(updated);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    } else {
        res.sendStatus(404);
    }
}));
//like button 
route.put("/put/likes", Async(async (req, res) => {
    const post = await Post.findById(req.body._id);
    const u_id = req.body.user_id;
    const uname = req.body.username;
    const arr = { username: uname, userid: u_id }
    const bool = () => {
        for (let i = 0; i < post.likers.length; i++) {
            if (post.likers[i].username === uname) { return true }
        }
    }
    if (post) {
        try {
            if (bool()) {//sudhar needed
                post.likes -= 1;
                var t = post.likers.filter((u) => { return u.username !== uname });
                post.likers = t;
                const updated = await post.save();
                res.status(200).send(updated);
            }
            else {
                post.likes += 1;
                post.likers.push(arr);
                const updated = await post.save();
                res.status(200).send(updated);
            }
        }
        catch (err) {
            res.status(403).send({ message: err })
        }
    }
    else {
        res.status(404).send({ message: "Not Found" });
    }
}))
route.delete("/delete/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        try {
            const deleted = await post.remove();
            res.status(200).send(deleted);
        }
        catch (error) {
            res.status(403).send(error);
        }
    }
    else {
        res.sendStatus(404);
    }
}));
export default route;