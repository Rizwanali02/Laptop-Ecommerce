import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/jwtToken.js";
import { ErrorHandler } from "../utils/error.js"



const register = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return next(new ErrorHandler(400, "Please fill all fields"));
        }

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler(400, "User already exists"));
        }

        user = await User.create({
            name,
            email,
            password,
            phone,
        });
        sendToken(user, 200, "User Registered Successfully", res);

    } catch (error) {
        console.log(`error in register ${error}`);
    }
});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please fill all fields", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Please Enter Valid email or password", 400));
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Please Enter Valid password", 400));
        }

        sendToken(user, 200, "User logged in successfully", res);
    } catch (error) {
        console.log(`Error in login ${error}`);
    }
});

const logout = asyncHandler(async (req, res) => {
    console.log("Logout route hit"); // Debugging statement
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "User logged out"
        });
    } catch (error) {
        console.error("Error in logout route:", error);
        res.status(500).json({ success: false, message: "An error occurred during logout." });
    }
});


export { register, login, logout };