import express from "express";
import Async from "express-async-handler";
import User from "../models/user.js";
import bcrptjs from "bcryptjs";
import { generatetoken } from "../util.js";
const route = express.Router();

//signin route
route.post("/post/user/signin", Async(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrptjs.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                _id: user._id,
                username: user.username,
                description: user.description,
                followers: user.followers,
                following: user.following,
                img: user.img,
                email: user.email,
                createdAt: user.createdAt,
                age: user.age
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
route.get("/get/username/:name", Async(async (req, res) => {
    const users = await User.find({ username: req.params.name });
    if (users) {
        res.status(200).send(users);
    }
    else {
        res.status(404).send({ message: "User not Found" });
    }
}));

//user by id
route.get("/get/userdet/:id", Async(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send({
            _id: user._id,
            username: user.username,
            description: user.description,
            followers: user.followers,
            following: user.following,
            img: user.img,
            createdAt: user.createdAt
        });
    }
    else {
        res.status(404).send({ message: "User Not Found !" });
    }
}));
route.get("/get/img/:id",Async(async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){res.status(200).send(user.img)}
    else{res.status(404).send({message:"Not Found"})}
}));
//signup
route.post("/post/user/signup", Async(async (req, res) => {
    const user = new User({
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: bcrptjs.hashSync(req.body.password),
        createdAt: req.body.time,
        img: req.body.img
    });
    try {
        const newuser = await user.save();
        res.status(200).send({
            _id: newuser._id,
            username: newuser.username,
            email: newuser.email,
            age: newuser.age,
            createdAt: newuser.createdAt,
            img: newuser.img,
            token: generatetoken(newuser)
        });
    }
    catch (error) {
        res.status(401).send({ message: error.message });
    }
}));

//edit userprofile
route.put("/put/user", Async(async (req, res) => {
    const user = await User.findById(req.body._id);
    user.description = req.body.desc;
    user.username = req.body.username;
    user.age = req.body.age;
    user.img = req.body.img;
    try {
        const updateduser = await user.save();
        res.status(200).send({
            _id: updateduser._id,
            username: updateduser.username,
            description: updateduser.description,
            followers: updateduser.followers,
            following: updateduser.following,
            img: updateduser.img,
            email: updateduser.email,
            createdAt: updateduser.createdAt,
            age: updateduser.age
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));

//follow //logic - If I click on follow button , I will be subject , and user profile will be object 
// my following array will change and object's followers array will change; wait for save
route.put("/put/follow", Async(async (req, res) => {
    const subject = await User.findById(req.body.subject);
    const object = await User.findById(req.body.object);
    const bool = () => {
        for (let i = 0; i < object.followers.length; i++) {
            if (object.followers[i].id.toString() === subject._id.toString()) { return true }
        }
    }
    if (subject) {
        if (object) {
            if (bool()) {
                object.followers = object.followers.filter((u) => { u.id !== subject._id });
                subject.following = subject.following.filter((u) => { u.id !== object._id });
                await subject.save();
                const updated = await object.save();
                res.status(200).send({
                    _id: updated._id,
                    username: updated.username,
                    description: updated.description,
                    followers: updated.followers,
                    following: updated.following,
                    img: updated.img,
                    createdAt: updated.createdAt
                });
            }
            else {
                var arr = { id: req.body.object }, arr2 = { id: req.body.subject };
                subject.following.push(arr);
                object.followers.push(arr2);
                await subject.save();
                const updated = await object.save();
                res.status(200).send({
                    _id: updated._id,
                    username: updated.username,
                    description: updated.description,
                    followers: updated.followers,
                    following: updated.following,
                    img: updated.img,
                    createdAt: updated.createdAt
                });
            }
        }
        else {
            res.status(404).send({ message: "Not Found!" });
        }
    }
    else {
        res.status(404).send({ message: "Not Found!" })
    }
}));

export default route;