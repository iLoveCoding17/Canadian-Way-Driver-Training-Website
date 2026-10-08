/**
 * @file reset-password.js
 * @description API route for handling password reset requests.
 *
 * This file contains the server-side logic for processing password reset requests.
 * It connects to the database, validates the request, and interacts with the user controller
 * to reset the user's password.
 */

import dbConnect from "../../../../backend/dbconnect.js";
import { userController } from "../../../../backend/controllers/user.controller.js";

export default async function handler(req, res) {
	// Check if the request method is POST
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		// Connect to the database
		await dbConnect();

		// Extract the reset token and new password from the request body
		const { token, password } = req.body;

		// Validate the input
		if (!token || !password) {
			return res.status(400).json({ error: "Token and password are required" });
		}

		// Call the userController to handle the password reset logic
		const result = await userController.resetPassword(token, password);

		// Check the result and send appropriate response
		if (result.success) {
			return res.status(200).json({ message: result.message });
		} else {
			return res.status(400).json({ error: result.error });
		}
	} catch {
		throw new Error("PasswordResetError");
	}
}
