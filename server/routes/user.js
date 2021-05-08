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
            res.status(200).send(user);
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
route.get("/get/userdet/:id",Async(async (req,res) =>{
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).send(user);
    }
    else{
        res.status(404).send({message:"User Not Found !"});
    }
}));

//signup
route.post("/post/user/signup", Async(async (req, res) => {
    const user = new User({
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: bcrptjs.hashSync(req.body.password, 10),
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
                img:newuser.img,
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
    user.img = req.body.img;
    try {
        const updated = await user.save();
        res.status(200).send(updated);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}));
export default route;