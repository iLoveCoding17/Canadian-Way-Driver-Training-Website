/**
 * @file user.controller.js
 * @description User controller for handling user-related operations
 *
 * This controller includes methods for:
 * - Getting all users
 * - Creating a new user (signup)
 * - Authenticating a user (login)
 * - Requesting password reset and sending email link
 * - Resetting password with JWT token
 *
 * It uses the User model to interact with the database and perform operations.
 * It also includes a helper function to send password reset emails using nodemailer.
 */

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const userController = {
	/**
	 * Get all users
	 */
	getAllUsers: async () => {
		try {
			const users = await User.find();
			return { success: true, data: users };
		} catch {
			return { success: false, error: "Failed to fetch users" };
		}
	},

	/**
	 * Create a new user (signup)
	 */
	createUser: async (userData) => {
		try {
			const { firstName, lastName, email, gender, password } = userData;

			// Check if user already exists
			const existedUser = await User.findOne({ email });
			if (existedUser) {
				return { success: false, error: "User already exists!" };
			}

			// Create new user
			const newUser = new User({ firstName, lastName, email, gender, password });
			await newUser.save();

			// Return user without password
			const userObject = newUser.toObject();
			delete userObject.password;

			return { success: true, data: userObject };
		} catch {
			return { success: false, error: "Failed to create user!" };
		}
	},

	/**
	 * Authenticate a user (login)
	 */
	loginUser: async (credentials) => {
		try {
			const { email, password } = credentials;

			// Find user by email
			const user = await User.findOne({ email });
			if (!user) {
				return { success: false, error: "User not found!" };
			}

			// Verify password
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return { success: false, error: "Invalid password!" };
			}

			// Generate authentication token
			const token = await user.generateAuthToken();

			// Increment login count
			await user.incrementLoginCount();

			// Return user data without password
			const data = user.toObject();
			delete data.password;

			return {
				success: true,
				data: { user: data, token },
			};
		} catch {
			return { success: false, error: "Login failed!" };
		}
	},

	  /**
   		* Update payment status
   		*/
	updatePaymentStatus: async (email, paymentStatus) => {
		try {
		console.log("Update payment status called with:", email, paymentStatus);

		if (!["paid", "unpaid"].includes(paymentStatus.toLowerCase())) {
			console.log("Invalid payment status value:", paymentStatus);
			return { success: false, error: "Invalid payment status" };
		}

		const user = await User.findOneAndUpdate(
			{ email },
			{ Paymentstatus: paymentStatus.toLowerCase() },
			{ new: true, runValidators: true, select: "email Paymentstatus" } // Only validate updated fields
		);

		if (!user) {
			console.log("User not found with email:", email);
			return { success: false, error: "User not found" };
		}

		console.log("Payment status updated successfully");
		return { success: true, message: "Payment status updated" };
		} catch (error) {
		console.error("Error in updatePaymentStatus:", error);
		return { success: false, error: "Failed to update payment status" };
		}
	},

	/**
	 * Request password reset and send email link
	 */
	requestPasswordReset: async (email) => {
		try {
			// Find user by email
			const user = await User.findOne({ email });

			if (!user) {
				return { success: false, error: "User with this email does not exist" };
			}

			// Generate reset token
			const resetToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			// Hash token before saving to database
			const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

			// Save token hash and expiry to user
			user.resetPasswordToken = resetTokenHash;
			user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
			await user.save();

			// Create reset URL
			const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/ResetPassword?token=${resetToken}`;

			// Send email with reset link
			const mailResult = await sendPasswordResetEmail(user.email, resetUrl);

			if (!mailResult.success) {
				return { success: false, error: "Failed to send reset email" };
			}

			return {
				success: true,
				message: "Password reset link sent to your email",
				// For development, return the URL directly
				// resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
			};
		} catch {
			return { success: false, error: "Failed to process password reset request!" };
		}
	},

	/**
	 * Reset password with JWT token
	 */
	resetPassword: async (token, newPassword) => {
		try {
			// Verify JWT token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user by ID from token
			const user = await User.findById(decoded._id);

			if (!user) {
				return { success: false, error: "User not found!" };
			}

			// Verify reset token is still valid
			const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

			if (!user.resetPasswordToken || !user.resetPasswordExpires) {
				return { success: false, error: "Reset token information missing!" };
			}

			if (user.resetPasswordToken !== resetTokenHash || Date.now() > user.resetPasswordExpires) {
				return { success: false, error: "Reset token is invalid or expired!" };
			}

			// Update password
			user.password = newPassword;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			await user.save();

			return { success: true, message: "Password has been reset successfully!" };
		} catch (error) {
			if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
				return { success: false, error: "Reset token is invalid or expired!" };
			}

			return { success: false, error: `Failed to reset password: ${error.message}` };
		}
	},
};

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email, resetUrl) {
	try {
		// Create email transporter (configure for your email provider)
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST || "smtp.gmail.com",
			port: process.env.EMAIL_PORT || 587,
			secure: process.env.EMAIL_SECURE === "true",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Define email content
		const mailOptions = {
			from: process.env.EMAIL_FROM || '"Canadian Way Driver" <canadianwaydriver@gmail.com>',
			to: email,
			subject: "Password Reset Instructions",
			text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F64740;">Password Reset</h2>
          <p>You requested a password reset for your Canadian Way Driver account.</p>
          <p>Please click the button below to reset your password. This link will expire in 1 hour.</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #F64740; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Thank you,<br>Canadian Way Driver Team</p>
        </div>
      `,
		};

		// Send email
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
