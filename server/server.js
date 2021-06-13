import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postroute from "./routes/posts.js";
import commentroute from "./routes/comment.js";
import userroute from "./routes/user.js";
dotenv.config();
const app = express();
app.use(express.json({
    limit: "30mb",
    extended: !0
})),
 app.use(express.urlencoded({
    limit: "30mb",
    extended: !0
})), app.use(cors());
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: !0,
    useUnifiedTopology: !0,
    useCreateIndex: !0
}).then(() => {
    console.log("connected")
}).catch(err => console.log(err)), mongoose.set("returnOriginal", !1), app.use("/api/posts", postroute), app.use("/api/comments", commentroute), app.use("/api/user", userroute), app.use((err, req, res, next) => res.status(500).send({
    message: err.message
})),
    app.get("/", (req, res) => res.send("Running")),
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));