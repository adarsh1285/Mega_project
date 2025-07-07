import { ApiResponse } from "../utils/api-response.js"

const healthCheck = async (req, res) => {
    try {
        console.log("logic to connect with db");
        res.status(200).json(new ApiResponse(200, { message: "Server is runing" }));
    } catch (error) {

    }
}

export { healthCheck }