import { body } from "express-validator";
import { asyncHandler } from "../utils/async-handler.js"

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    registrationValidation(body);
    console.log("this is registration ")
})

export { registerUser };