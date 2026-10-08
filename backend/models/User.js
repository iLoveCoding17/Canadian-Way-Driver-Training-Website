/**
 * @file User.js
 * @description User model for MongoDB using Mongoose
 *
 * This model defines the schema for the User collection in the database.
 * It includes fields for first name, last name, email, password, login count,
 * reset password token, and reset password expiration date.
 *
 * It also includes methods for hashing passwords, comparing passwords,
 * generating JWT tokens, and finding users by token.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },

		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			validate: [validator.isEmail, "Please enter a valid email address"],
		},
		
		Paymentstatus: { 
			type: String,
			enum: ["paid", "unpaid"],
			default: "unpaid", 
			required: true,
		},

		gender: {
			type: String,
			required: true,
		},
		
		masterNumber: {
			type: String,
			required: false,
		},

		password: { type: String, required: true },

		loginCount: {
			type: Number,
			default: 0,
		},

		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{
		timestamps: true,
	},
);

// Hash the password before saving the user model
userSchema.pre("save", async function () {
	const user = this;
	if (!user.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
});

// Compare password with hased password store in the database
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Increment login count when user logs in
userSchema.methods.incrementLoginCount = async function () {
	this.loginCount++;
	await this.save();
};

// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: "7 days",
	});
	return token;
};

userSchema.statics.findByToken = async function (token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return await this.findOne({ _id: decoded._id });
	} catch (err) {
		throw new Error(`Invalid token: ${err.message}`);
	}
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
