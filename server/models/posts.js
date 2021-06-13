import mongoose from "mongoose";
const likerSchema = new mongoose.Schema({
        username: {
            type: String
        },
        userid: {
            type: String
        }
    }),
    postSchema = new mongoose.Schema({
        author: {
            type: String,
            required: !0
        },
        user_id: {
            type: String,
            required: !0
        },
        font: {
            type: String
        },
        content: {
            type: String,
            required: !0
        },
        likers: [likerSchema],
        title: {
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
    postModel = new mongoose.model("Posts", postSchema);
export default postModel;