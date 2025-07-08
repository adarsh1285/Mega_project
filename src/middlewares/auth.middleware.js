import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import User from "../models/user.models.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new ApiError(400, "unAuthorized request");
    }
    try {
        const decodedToken = jwt.verifyJWT(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificaitonExpiry")
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next();
    } catch (error) {
        throw new ApiError(400, "invalid access token")
    }
})
