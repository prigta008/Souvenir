import jwt from "jsonwebtoken";

export const generatetoken = (user)=>{
    return jwt.sign( {
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin},
        process.env.JWT_SECRET || "something",
        {expiresIn:"30d"}
        )
}