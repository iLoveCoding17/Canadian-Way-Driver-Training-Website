/**
 * @file forgot-password.js
 * @description API route for handling password reset requests
 *
 * This route handles POST requests to initiate a password reset process.
 * It connects to the database, validates the request body, and calls the
 * userController to handle the password reset logic.
 */

import dbConnect from "../../../../backend/dbconnect.js";
import { userController } from "../../../../backend/controllers/user.controller.js";

export default async function handler(req, res) {
	// Check if the request method is POST for security
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		// Connect to the database
		await dbConnect();

		// Extract the email from the request body
		const { email } = req.body;

		// Validate the email
		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		/**
		 * Call the userController to handle the password reset request
		 * This method should handle the logic for sending the password reset email
		 * and generating the reset token
		 */
		const result = await userController.requestPasswordReset(email);

		// Check if the result is successful
		if (result.success) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({ error: result.error });
		}
	} catch {
		throw new Error("PasswordResetError");
	}
}
