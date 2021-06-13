import express from "express";
import Async from "express-async-handler";
import Comment from "../models/comment.js";
const route = express.Router();
route.get("/get/comments/:id", Async(async (req, res) => {
    const comments = await Comment.aggregate([{
        $match: {
            post_id: req.params.id
        }
    }, {
        $sort: {
            createdAt: -1
        }
    }]);
    comments ? res.status(200).send(comments) : res.status(404).send({
        message: "Comment not Found"
    })
})), route.get("/get/length/:id", Async(async (req, res) => {
    const comment = await Comment.find({
        post_id: req.params.id
    });
    comment ? res.status(200).send({
        length: comment.length
    }) : res.status(404).send({
        message: "Not Found"
    })
})), route.get("/get/comment/:id", Async(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    comment ? res.status(200).send(comment) : res.status(404).send({
        message: "not found"
    })
})), route.post("/post/comment", Async(async (req, res) => {
    const t = new Date,
        data = new Comment({
            content: req.body.content,
            author: req.body.author,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            createdAt: t.toString()
        });
    try {
        const comment = await data.save();
        res.status(201).send({
            _id: comment._id,
            content: comment.content,
            author: comment.author,
            user_id: comment.user_id,
            post_id: comment.post_id,
            createdAt: comment.createdAt
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})), route.put("/put/comment", Async(async (req, res) => {
    const data = await Comment.findById(req.body._id);
    if (data) {
        data.content = req.body.comment;
        try {
            const comment = await data.save();
            res.status(200).send(comment)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    } else res.status(404).send({
        message: "Comment not Found"
    })
})), route.delete("/delete/comment/:id", Async(async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        }), res.status(200).send({
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.status(400).send({
            message: error
        })
    }
}));
export default route;