import express from "express";
import Async from "express-async-handler";
import User from "../models/user.js";
import bcrptjs from "bcryptjs";
import multer from "multer"; 
import { generatetoken } from "../util.js";
const route = express.Router();

route.post("/post/user/signin", Async(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrptjs.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                age: user.age,
                description:user.description,
                createdAt: user.createdAt,
                token: generatetoken(user)
            });
        }
        else {
            res.status(401).send({ message: "Invalid Email-Id or Password" })
        }
    }
    else {
        res.status(404).send({ message: "User not found" });
    }
}));
//getting user by name
route.get("/get/username/:id", Async(async (req, res) => {
    const user = await User.find({ username: req.params.id });
    if (user) {
        res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
            age: user.age,
            createdAt: user.createdAt
        });
    }
    else {
        res.status(404).send({ message: "User not Found" });
    }
}));
//signup
route.post("/post/user/signup", Async(async (req, res) => {
    const user = new User({
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: bcrptjs.hashSync(req.body.password, 10),
        createdAt: req.body.time
    });
    try {
        const newuser = await user.save();
        res.send({
            _id: newuser._id,
            username: newuser.username,
            email: newuser.email,
            age: newuser.age,
            createdAt: newuser.createdAt,
            token: generatetoken(newuser)
        });
    }
    catch (error) {
        res.status(404).send({ message: error.message });
    }
}));
//edit userprofile
route.put("/put/user", Async(async (req, res) => {
    const user = await User.findById(req.body._id);
    user.description = req.body.desc;
    user.username = req.body.username;
    user.age = req.body.age;
    user.password = bcrptjs.hashSync(req.body.password, 10);
    try {
        const updated = await user.save();
        res.status(200).send( {
                _id: updated._id,
                username: updated.username,
                email: updated.email,
                age: updated.age,
                description: updated.description,
                createdAt:updated.createdAt
            }
        );
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
//edit image 
route.put("/put/user/image", Async(async (req, res) => {
    const user = await User.findById(req.body._id);
    user.image.data = req.body.image.buffer;
    user.image.contentType="image/jpg";
    try {
        const updated = await user.save();
        res.status(200).send({data: updated });
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}))
export default route;