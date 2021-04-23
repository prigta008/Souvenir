import express from "express";
import Async from "express-async-handler";
import Comment from "../models/comment.js";
const route = express.Router();
route.get("/get/comment/:id", Async(async (req, res) => {
    const data = await Comment.find({ post_id: req.params.id });
    if (data) {
        res.send({
            _id:data._id,
            content:data.content,
            author:data.author
        });
    }
    else {
        res.send({message:"Comment not Found"});
    }
}));
route.post("/post/comment", Async(async (req, res) => {
    const data = new Comment({
        content: req.body.content,
        author: req.body.author,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    });
    try {
        const comment = await data.save();
        res.send({
            _id: comment._id,
            content: comment.content,
            author: comment.author,
            user_id: comment.user_id,
            post_id: comment.post_id
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
route.put("/put/comment", Async(async (req, res) => {
    const data = await Comment.findById(req.body._id);
    if (data) {
        data.content = req.body.comment;
        try {
            const comment = await data.save();
            res.send({ message: "Updated Successfully", data: comment });
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    else {
        res.send({message:"Comment not Found"});
    }
}));
route.delete("/delete/comment", Async(async (req, res) => {
    const comment = Comment.findById(req.body._id);
    if (comment) {
        const deleted = await comment.remove();
        res.send({ message: "Deleted Successfully", data: deleted });
    }
    else {
        res.send({message:"Comment not Found"});
    }
}));
export default route;