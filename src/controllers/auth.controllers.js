import { body } from "express-validator";
import { asyncHandler } from "../utils/async-handler.js"
import User from "../models/user.models.js"

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({
            message: "all the field are required",
        })
    }
    try {
        //check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "This email is already exits"
            })
        }
        //if user not exists in database then create this new user
        const user = await User.create({
            username,
            email,
            password,
            role,
        })
        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "User not registered"
            })
        }
        // creating a verification token
        const token = crypto.randomBytes(32).toString('hex');
        console.log(token);

        //save token in database
        user.emailVerificationToken = token;
        await user.save();
    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            error,
            success: false
        })
    }
   
})

export { registerUser };