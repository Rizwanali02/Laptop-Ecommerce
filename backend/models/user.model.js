import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },

    phone: {
        type: Number,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
    },

    createdOn: {
        type: Date,
        default: Date.now,
    }
});

//hashing user password for save database----------------------------------------------------------------
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



//compare login user :- enter password correct ? --------------------------------------------
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};


//Generateing JWT Token for user --------------------------------------------------------
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);