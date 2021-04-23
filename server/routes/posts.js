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
        res.status(404).send({message:"No Post Found"});
    }
}));
route.get("/get/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.find({post_id:post._id});
    if (post) {
        res.send({
            _id:post._id,
            author:post.author,
            content:post.content,
            likes:post.likes,
            comments:comment
        });
    }
    else {
        res.status(404).send({message:"No Post Found"});
    }
}));
route.post("/post/post", Async(async (req, res) => {
    const post = new Post({
        author: req.body.author,
        user_id: req.body.user_id,
        content: req.body.content,
        title: req.body.title,
        font:req.body.font,
    });
    try {
        const newpost = await post.save();
        res.status(200).send({
            _id: newpost._id,
            author: newpost.author,
            user_id: newpost.user_id,
            content: newpost.content,
            title: newpost.title,
            font:newpost.font
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}))
route.put("/put/post", Async(async (req, res) => {
    const post = await Post.findById(req.body._id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        try {
            const updated = await post.save();
            res.send({ message: "Updated Successfully", data: updated });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    } else {
        res.sendStatus(404);
    }
}));
route.put("/put/likes", Async(async (req, res) => {
    const post = await Post.findById(req.body._id);
    const u_id = req.body.user_id;
    const uname = req.body.username;
    const arr = {username:uname,userid:u_id}
    if (post) {
        post.likes += 1;
        post.likers.push(arr);
        const updated = await post.save();
        res.send(updated);
    }
    else {
        res.sendStatus(404);
    }
}))
route.delete("/delete/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        const deleted = await post.remove();
        res.send({ message: "Deleted Successfully", data: deleted });
    }
    else {
        res.sendStatus(404);
    }
}));
export default route;