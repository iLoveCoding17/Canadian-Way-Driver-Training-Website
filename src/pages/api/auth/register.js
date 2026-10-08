/**
 * @file register.js
 * @description API route for user registration
 *
 * This route handles user registration requests.
 * It connects to the database, checks the request method,
 * and calls the userController to create a new user.
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

		// Extract user data from the request body
		const result = await userController.createUser(req.body);

		// Check if the registration was successful
		if (result.success) {
			return res.status(201).json(result.data);
		} else {
			return res.status(400).json({ error: result.error });
		}
	} catch {
		throw new Error("RegistrationError");
	}
}
