import mongoose from "mongoose";

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
    age: {
        type: Number,
        required: true
    },
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