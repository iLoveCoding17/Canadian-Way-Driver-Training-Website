/**
 * @file ResetPassword.js
 * @description ResetPassword.js is contains functinos so that the user will be able to reset thier password.
 * 
 * This file includes operations for:
 * - resetting the users password.
 * - Using reset-password.js to reset send the user an email to reset thier password.
 */
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ResetPasswordPage() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [token, setToken] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [isTokenChecked, setIsTokenChecked] = useState(false);

	const router = useRouter();

	// Effect hook to retrieve and validate the reset token from URL when component loads
	useEffect(() => {
		// Only process once the router is ready with query parameters
		if (router.isReady) {
			const { token } = router.query;

			if (token) {
				setToken(token);
				setIsTokenValid(true);
			} else {
				setError("Missing reset token");
			}

			// Mark token validation as complete
			setIsTokenChecked(true);
		}
	}, [router.isReady, router.query]);

	// Handle form submission for password reset
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Client-side validation for password matching
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		// Client-side validation for password length
		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		// Update UI states before API call
		setLoading(true);
		setError("");
		setMessage("");

		try {
			// Send password reset request to API
			const response = await axios.post("/api/auth/reset-password", {
				token,
				password,
			});

			// Handle successful password reset
			setMessage(response.data.message);

			// Clear sensitive data from form fields
			setPassword("");
			setConfirmPassword("");

			// Redirect to login page after success message is shown
			setTimeout(() => {
				router.push("/");
			}, 3000);
		} catch (error) {
			// Handle different types of errors
			if (error.response?.data?.error) {
				// Server returned an error response
				setError(error.response.data.error);
			} else if (error.request) {
				// The request was made but no response was received
				setError("Network error. Please check your connection and try again.");
			} else {
				// Something happened in setting up the request
				setError("An error occurred. Please try again later.");
			}
			throw new Error("PasswordResetError");
		} finally {
			// Reset loading state regardless of outcome
			setLoading(false);
		}
	};

	// Show loading indicator while token verification is in progress
	if (!isTokenChecked) {
		return (
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<div className="text-center">Loading...</div>
			</Container>
		);
	}

	return (
		<Container className="d-flex justify-content-center align-items-center vh-100">
			<Card className="shadow border-0" style={{ maxWidth: "500px", width: "100%" }}>
				<Card.Body className="p-4">
					<h2 className="text-center mb-4" style={{ color: "#F64740" }}>
						Reset Your Password
					</h2>

					{message && (
						<Alert variant="success">
							{message}
							<p className="mt-2">Redirecting to login page...</p>
						</Alert>
					)}

					{error && <Alert variant="danger">{error}</Alert>}

					{!isTokenValid && !message && (
						<Alert variant="danger">
							Invalid or expired password reset link.
							<div className="mt-3">
								<Link
									href="/"
									className="btn btn-primary"
									style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
								>
									Return to Login
								</Link>
							</div>
						</Alert>
					)}

					{isTokenValid && !message && (
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label>New Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter new password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									minLength={8}
								/>
								<Form.Text className="text-muted">
									Password must be at least 8 characters long
								</Form.Text>
							</Form.Group>

							<Form.Group className="mb-4">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm new password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									minLength={8}
								/>
							</Form.Group>

							<div className="d-grid">
								<Button
									type="submit"
									disabled={loading}
									style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
								>
									{loading ? "Resetting Password..." : "Reset Password"}
								</Button>
							</div>
						</Form>
					)}
				</Card.Body>
			</Card>
		</Container>
	);
}
