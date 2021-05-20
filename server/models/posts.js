import mongoose from "mongoose";

const likerSchema = new mongoose.Schema({
    username: { type: String },
    userid: { type: String }
})

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    font: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    likers: [likerSchema],
    title: {
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        required:true
    }
}, { timestamps: true });
const postModel = new mongoose.model("Posts", postSchema);
export default postModel;