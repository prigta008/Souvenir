import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    author_img:String,
    post_id: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });
const commentModel = new mongoose.model("comment", commentSchema);
export default commentModel;