import mongoose from "mongoose";
const followers = new mongoose.Schema({
    id:{
        type:String
    }
})
const logindata = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    followers: [followers],
    age: {
        type: Number,
        required: true
    },
    img:String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    login: [logindata]
});
const userModel = new mongoose.model("user", userSchema);
export default userModel;