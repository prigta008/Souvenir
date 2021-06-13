import mongoose from "mongoose";
const followers = new mongoose.Schema({
        id: {
            type: String
        }
    }),
    userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: !0
        },
        description: {
            type: String
        },
        followers: [followers],
        following: [followers],
        age: {
            type: Number,
            required: !0
        },
        img: String,
        email: {
            type: String,
            required: !0,
            unique: !0
        },
        password: {
            type: String,
            required: !0
        },
        createdAt: {
            type: Date,
            required: !0
        }
    }),
    userModel = new mongoose.model("user", userSchema);
export default userModel;