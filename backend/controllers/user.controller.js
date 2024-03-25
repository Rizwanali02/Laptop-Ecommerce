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
        throw error
    }
});

const logout = asyncHandler(async (req, res) => {
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

const getMyProfile = asyncHandler(async (req, res) => {

    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });

});

const updateProfile = asyncHandler(async (req, res, next) => {
    try{
        const { id } = req.params;
        let user = await User.findById(id);
        if (!user) return next(new ErrorHandler(404, "User not found"));

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }

        user = await User.findByIdAndUpdate(id, newUser, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });
    }catch (error) {
        console.log("errorr profile update",error);
    }

});


export {
    register,
    login,
    logout,
    getMyProfile,
    updateProfile
};