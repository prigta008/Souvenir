import express from "express";
import Async from "express-async-handler";
import User from "../models/user.js";
import bcrptjs from "bcryptjs";
import {
    generatetoken
} from "../util.js";
const route = express.Router();
route.get("/get/userdetails/:id", Async(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            description: user.description,
            createdAt: user.createdAt,
            img: user.img,
            followers: user.followers,
            following: user.following,
            age: user.age
        })
    } else {
        res.status(404).send({
            message: "Not Found!"
        })
    }
}));
route.post("/post/user/signin", Async(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    user ? bcrptjs.compareSync(req.body.password, user.password) ? res.status(200).send({
        _id: user._id,
        username: user.username,
        description: user.description,
        followers: user.followers,
        following: user.following,
        img: user.img,
        email: user.email,
        createdAt: user.createdAt,
        age: user.age
    }) : res.status(401).send({
        message: "Invalid Email-Id or Password"
    }) : res.status(404).send({
        message: "User not found"
    })
})), route.post("/post/user/signup", Async(async (req, res) => {
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
            following: newuser.following,
            followers: newuser.followers,
            token: generatetoken(newuser)
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
})), route.get("/get/username/:name", Async(async (req, res) => {
    const reg = new RegExp(req.params.name, "i"),
        users = await User.find({
            username: {
                $in: reg
            }
        });
    users ? res.status(200).send(users) : res.status(404).send({
        message: "User not Found"
    })
})), route.get("/get/userdet/:id", Async(async (req, res) => {
    const user = await User.findById(req.params.id);
    user ? res.status(200).send({
        _id: user._id,
        username: user.username,
        description: user.description,
        followers: user.followers,
        following: user.following,
        img: user.img,
        createdAt: user.createdAt
    }) : res.status(404).send({
        message: "User Not Found !"
    })
})), route.get("/get/img/:id", Async(async (req, res) => {
    const user = await User.findById(req.params.id);
    user ? res.status(200).send(user.img) : res.status(404).send({
        message: "Not Found"
    })
})), route.get("/get/following/list/:id", Async(async (req, res) => {
    const user = await User.findById(req.params.id);
    user ? res.status(200).send(user.following) : res.status(404).send({
        message: "Not Found !"
    })
})), route.put("/put/user", Async(async (req, res) => {
    const user = await User.findById(req.body._id);
    user.description = req.body.desc, user.username = req.body.username, user.age = req.body.age, user.img = req.body.img;
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
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})), route.put("/put/follow", Async(async (req, res) => {
    const subject = await User.findById(req.body.subject),
        object = await User.findById(req.body.object),
        bool = () => {
            for (let i = 0; i < object.followers.length; i++)
                if (object.followers[i].id.toString() === subject._id.toString()) return !0
        };
    if (subject && object)
        if (bool()) {
            object.followers = object.followers.filter(u => {
                u.id, subject._id
            }), subject.following = subject.following.filter(u => {
                u.id, object._id
            });
            const s = await subject.save(),
                o = await object.save();
            res.status(200).send({
                s: {
                    _id: s._id,
                    username: s.username,
                    description: s.description,
                    followers: s.followers,
                    following: s.following,
                    age: s.age,
                    img: s.img,
                    email: s.email,
                    createdAt: s.createdAt
                },
                o: {
                    _id: o._id,
                    username: o.username,
                    description: o.description,
                    followers: o.followers,
                    following: o.following,
                    img: o.img,
                    createdAt: o.createdAt
                }
            })
        } else {
            var arr = {
                    id: req.body.object
                },
                arr2 = {
                    id: req.body.subject
                };
            subject.following.push(arr), object.followers.push(arr2);
            const s = await subject.save(),
                o = await object.save();
            res.status(200).send({
                s: {
                    _id: s._id,
                    username: s.username,
                    description: s.description,
                    followers: s.followers,
                    following: s.following,
                    age: s.age,
                    img: s.img,
                    email: s.email,
                    createdAt: s.createdAt
                },
                o: {
                    _id: o._id,
                    username: o.username,
                    description: o.description,
                    followers: o.followers,
                    following: o.following,
                    img: o.img,
                    createdAt: o.createdAt
                }
            })
        }
    else res.status(404).send({
        message: "Not Found!"
    })
}));
export default route;