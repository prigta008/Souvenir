import express from "express";
import Async from "express-async-handler";
import Post from "../models/posts.js";
import Comment from "../models/comment.js";
import mongoose from "mongoose";
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

// for following 
route.post("/get/allposts/following", Async(async (req, res) => {
    var arr = [];
    for (let i = 0; i < req.body.following.length; i++) {
        arr.push(req.body.following[i].id);
    }
    const posts = await Post.find({ user_id: { $in: arr } })
    if (posts) { res.status(200).send(posts) }
    else { res.status(404).send({ message: "Not Found" }) }
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
                _id: post._id,
                author: post.author,
                user_id: post.user_id,
                font: post.font,
                content: post.content,
                likers: post.likers,
                title: post.title,
                createdAt: post.createdAt,
                comments: comment
            })
        } else {
            res.status(200).send({
                _id: post._id,
                author: post.author,
                user_id: post.user_id,
                font: post.font,
                content: post.content,
                likers: post.likers,
                title: post.title,
                createdAt: post.createdAt
            })
        }
    }
    else {
        res.status(404).send({ message: "No Post Found" });
    }
}));
route.post("/post/post", Async(async (req, res) => {
    const date = new Date();
    const post = new Post({
        author: req.body.author,
        user_id: req.body.user_id,
        content: req.body.content,
        title: req.body.title,
        font: req.body.font,
        createdAt: date.toString()
    });
    try {
        let t = await post.save(); res.status(200).send(t);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}));

route.put("/put/post", Async(async (req, res) => {
    const post = await Post.findById(req.body._id), date = new Date();
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.font = req.body.font;
        post.createdAt = date.toString();
        try {
            const updated = await post.save();
            res.status(200).send(updated);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    } else {
        res.status(404).send({ messge: "Not Found!" });
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
            if (bool()) {
                post.likers = post.likers.filter((u) => { return u.username !== uname });
                const updated = await post.save();
                res.status(200).send(updated);
            }
            else {
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
}));

route.delete("/delete/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        try {
            await post.remove();
            res.status(200).send({ message: "Deleted" });
        }
        catch (error) {
            res.status(403).send({ message: error });
        }
    }
    else {
        res.status(404).send({ message: "Not Found!" });
    }
}));

export default route;