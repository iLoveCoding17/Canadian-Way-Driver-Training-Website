import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

function ForgotPassword({ show, handleClose }) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	/**
	 * Handles the form submission for password reset request
	 * @param {Event} e - The form submission event
	 */
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setLoading(true); // Show loading state
		setMessage(""); // Clear any previous success messages
		setError(""); // Clear any previous error messages

		try {
			// Send password reset request to the backend API
			const response = await axios.post("/api/auth/forgot-password", { email });

			// Display success message from the server
			setMessage(response.data.message);
			setEmail(""); // Clear the email input field
		} catch (error) {
			// Handle errors from API request
			setError(error.response?.data?.error || "Failed to send reset email");
		} finally {
			// Reset loading state regardless of outcome
			setLoading(false);
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title style={{ color: "#F64740" }}>Reset Password</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{message && (
					<Alert variant="success">
						{message}
						<p className="mt-2">Please check your email inbox for the reset link.</p>
					</Alert>
				)}

				{error && <Alert variant="danger">{error}</Alert>}

				{!message && (
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Form.Text className="text-muted">
								We&apos;ll send you a link to reset your password.
							</Form.Text>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							disabled={loading}
							style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
						>
							{loading ? "Sending..." : "Send Reset Link"}
						</Button>
					</Form>
				)}
			</Modal.Body>
		</Modal>
	);
}

ForgotPassword.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default ForgotPassword;
