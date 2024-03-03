import app from "./app.js"
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API_KEY,
    api_secret: process.env.CLOUDINARY_CLIENT_API_SECRET,
});


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})