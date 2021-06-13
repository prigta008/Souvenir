import express from "express";
import Async from "express-async-handler";
import Post from "../models/posts.js";
const route = express.Router();
route.get("/get/allpost/:id", Async(async (req, res) => {
    const posts = await Post.aggregate([{
        $match: {
            user_id: req.params.id
        }
    }, {
        $sort: {
            createdAt: -1
        }
    }]);
    posts ? res.status(200).send(posts) : res.status(404).send({
        message: "Posts not found !"
    })
})), route.post("/get/allposts/following", Async(async (req, res) => {
    var arr = [];
    for (let i = 0; i < req.body.following.length; i++) arr.push(req.body.following[i].id);
    let posts = await Post.aggregate([{
        $match: {
            user_id: {
                $in: arr
            }
        }
    }, {
        $sort: {
            createdAt: -1
        }
    }]);
    posts ? res.status(200).send(posts) : res.status(404).send({
        message: "Not Found"
    })
})), route.get("/get/allpostby/:name", Async(async (req, res) => {
    var reg = new RegExp(req.params.name, "i");
    const posts = await Post.find({
        title: {
            $in: reg
        }
    });
    posts ? res.status(200).send(posts) : res.status(404).send({
        message: "Posts not found ! We search posts by Title"
    })
})), route.get("/get/likes/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    post ? res.status(200).send({
        likes: post.likers.length
    }) : res.status(404).send({
        message: "Not Found !"
    })
})), route.get("/get/post/:id", Async(async (req, res) => {
    const post = await Post.findById(req.params.id);
    post ? res.status(200).send({
        _id: post._id,
        author: post.author,
        user_id: post.user_id,
        font: post.font,
        content: post.content,
        likers: post.likers,
        title: post.title,
        createdAt: post.createdAt
    }) : res.status(200).send({
        message: "Not Found"
    })
})), route.post("/post/post", Async(async (req, res) => {
    const date = new Date,
        post = new Post({
            author: req.body.author,
            user_id: req.body.user_id,
            content: req.body.content,
            title: req.body.title,
            font: req.body.font,
            createdAt: date.toString()
        });
    try {
        let t = await post.save();
        res.status(201).send(t)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})), route.put("/put/post", Async(async (req, res) => {
    const post = await Post.findById(req.body._id),
        date = new Date;
    if (post) {
        post.title = req.body.title, post.content = req.body.content, post.font = req.body.font, post.createdAt = date.toString();
        try {
            const updated = await post.save();
            res.status(200).send(updated)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    } else res.status(404).send({
        messge: "Not Found!"
    })
})), route.put("/put/likes", Async(async (req, res) => {
    const post = await Post.findById(req.body._id),
        u_id = req.body.user_id,
        uname = req.body.username,
        arr = {
            username: uname,
            userid: u_id
        },
        bool = () => {
            for (let i = 0; i < post.likers.length; i++)
                if (post.likers[i].username === uname) return !0
        };
    if (post) try {
        if (bool()) {
            post.likers = post.likers.filter(u => u.username !== uname);
            const updated = await post.save();
            res.status(200).send(updated)
        } else {
            post.likers.push(arr);
            const updated = await post.save();
            res.status(200).send(updated)
        }
    } catch (err) {
        res.status(403).send({
            message: err
        })
    } else res.status(404).send({
        message: "Not Found"
    })
})), route.delete("/delete/post/:id", Async(async (req, res) => {
    try {
        await Post.deleteOne({
            _id: req.params.id
        }), res.status(200).send({
            message: "Deleted"
        })
    } catch (error) {
        res.status(403).send({
            message: error
        })
    }
}));
export default route;