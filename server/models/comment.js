import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: !0
        },
        author: {
            type: String,
            required: !0
        },
        user_id: {
            type: String,
            required: !0
        },
        post_id: {
            type: String,
            required: !0
        },
        createdAt: {
            type: Date,
            required: !0
        }
    }, {
        timestamps: !0
    }),
    commentModel = new mongoose.model("comment", commentSchema);
export default commentModel;