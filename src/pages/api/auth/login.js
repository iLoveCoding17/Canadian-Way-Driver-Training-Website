/**
 * @file login.js
 * @description API route for user login
 *
 * This route handles user login requests.
 * It connects to the database, checks the request method,
 * and calls the userController to authenticate the user.
 * If successful, it returns the user data; otherwise, it returns an error.
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

		// Extract user credentials from the request body
		const result = await userController.loginUser(req.body);

		// Check if the login was successful
		if (result.success) {
			return res.status(200).json(result.data);
		} else {
			return res.status(401).json({ error: result.error });
		}
	} catch {
		throw new Error("LoginError");
	}
}
