import app from "./src/app.js";
import dotenv from "dotenv"
import connectDB from "./src/db/index.js";

dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server start at port ${PORT}`);
        })
    })
    .catch((error) => {
        console.error("MongoDB connection error", error)
        process.exit(1)
    })

