import React from "react";
import PropTypes from "prop-types";
import { Form, Container, Card, InputGroup } from "react-bootstrap";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";

function SignUp({ setActiveCard }) {
	// Initialize form state with empty values for all fields
	const [formData, setFormData] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
		password: "",
		confirmPassword: "",
	});

	// Handler to update form data when input fields change
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value, // Update the specific field based on input name
		});
	};

	// Handler for form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Validate that passwords match before submission
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			// Send registration data to backend API
			await axios.post("/api/auth/register", formData);

			// If successful, show success message and redirect to login
			alert("Registration successful!");
			setActiveCard("login");
		} catch (error) {
			// Handle error responses from the server
			if (error.response) {
				alert(error.response.data.error || "Failed to register!");
			} else {
				// Generic error message for network or other issues
				alert("Failed to register!");
			}
		}
	};

	/*This effect handles responsiveness for the signup card.
    When the window reaches a certain width the card will alter */

	const [view, setActiveView] = useState("desktop");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				//Mobile view if window width less than 768 pixels
				setActiveView("mobile");
			} else if (window.innerWidth > 768 && window.innerWidth < 1400) {
				//Tablet view if pixels are in between 768 and 1400
				setActiveView("tablet");
			} else {
				setActiveView("desktop"); //Desktop view if larger than 1400 pixels
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	/*Each logic branch indicates how the components are placed based on the view
            For instance this is how the react components are structured for the desktop view.
            React-Bootstrap is used and link is in the documentation.*/

	if (view === "desktop") {
		return (
			<Card
				className=" w-75 p-4 shadow d-flex flex-row justify-content-center align-items-center"
				style={{ borderColor: "white" }}
			>
				<Card.Body>
					<h2
						className="text-center"
						style={{
							width: "375px",
							height: "425",
							color: "#F64740",
							marginBottom: "20px",
							fontWeight: "600",
						}}
					>
						Sign Up
					</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-person"></i>
								</InputGroup.Text>
								<Form.Control
									type="text"
									name="firstName"
									placeholder="First Name"
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-person"></i>
								</InputGroup.Text>
								<Form.Control
									type="text"
									name="lastName"
									placeholder="Last Name"
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-person"></i>
								</InputGroup.Text>
								<Form.Control
									type="text"
									name="email"
									placeholder="Enter your Email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</Form.Select>
								</InputGroup>
                    	</Form.Group>
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-lock"></i>
								</InputGroup.Text>
								<Form.Control
									className="username"
									type="password"
									name="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-lock"></i>
								</InputGroup.Text>
								<Form.Control
									className="username"
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password "
									value={formData.confirmPassword}
									onChange={handleChange}
									required
								/>
							</InputGroup>

							<Card.Text style={{ color: "#F64740", fontSize: "12px" }}>
								Characters should be between 8-20
							</Card.Text>
						</Form.Group>
						<Form.Group style={{ textAlign: "center", padding: "1em" }}>
							<Button>Sign Up</Button>
						</Form.Group>
						<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em" }}>
							Already have an account?
							<Card.Link
								onClick={() => setActiveCard("login")}
								style={{ color: "#F64740", cursor: "pointer" }}
							>
								Login
							</Card.Link>
						</Card.Text>{" "}
						{/*This login link will switch active card state to signup card. setActiveCard found in AuthPage */}
					</Form>
				</Card.Body>
			</Card>
		);
	} else if (view === "mobile") {
		return (
			<Container
				fluid
				className="login-container d-flex flex-column justify-content-center align-items-center vh-100"
			>
				<div className="mobileHeader"></div>
				<h2
					className=" login text-center"
					style={{
						width: "375px",
						height: "285",
						color: "#F64740",
						marginBottom: "20px",
						fontSize: "50",
						fontWeight: "600",
					}}
				>
					Sign Up
				</h2>
				<Form>
					<Form.Group className="mb-3">
						<InputGroup className="mobile-inputs">
							<InputGroup.Text>
								<i className="bi bi-person" style={{ color: "#F64740" }}></i>
							</InputGroup.Text>
							<Form.Control
								className=" username inputfield p-3 shadow"
								type="text"
								placeholder="Full Name"
							></Form.Control>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<InputGroup className="mobile-inputs">
							<InputGroup.Text>
								<i className="bi bi-person" style={{ color: "#F64740" }}></i>
							</InputGroup.Text>
							<Form.Control
								className=" username inputfield p-3 shadow"
								type="text"
								placeholder="Email"
							></Form.Control>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<InputGroup>
							<InputGroup.Text>
								<i className="bi bi-person"></i>
							</InputGroup.Text>
							<Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</Form.Select>
						</InputGroup>
                    </Form.Group>
					<Form.Group className="mb-3">
						<InputGroup className=" password mobile-inputs">
							<InputGroup.Text>
								<i className="bi bi-lock" style={{ color: "#F64740" }}></i>
							</InputGroup.Text>
							<Form.Control
								className=" username inputfield p-3 shadow"
								type="password"
								placeholder="Password"
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<InputGroup className=" password mobile-inputs">
							<InputGroup.Text>
								<i className="bi bi-lock" style={{ color: "#F64740" }}></i>
							</InputGroup.Text>
							<Form.Control
								className=" username inputfield p-3 shadow"
								type="password"
								placeholder="Confirm Password"
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group className=" buttons d-flex justify-content-center" style={{ padding: "1em" }}>
						<Button className="login-button">Sign up</Button>
					</Form.Group>
					<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em", marginTop: "20px" }}>
						Already have an account?
						<Card.Link
							onClick={() => setActiveCard("login")}
							style={{ color: "#F64740", cursor: "pointer" }}
						>
							Login
						</Card.Link>
					</Card.Text>{" "}
					{/*This login link will switch active card state to signup card. setActiveCard found in AuthPage */}
				</Form>
			</Container>
		);
	} else if (view === "tablet") {
		return (
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<Card className=" p-4 shadow" style={{ borderColor: "white" }}>
					<Card.Body>
						<h2
							className="text-center"
							style={{
								width: "375px",
								height: "425",
								color: "#F64740",
								marginBottom: "20px",
								fontWeight: "600",
							}}
						>
							Sign Up
						</h2>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="firstName"
										placeholder="First Name"
										value={formData.firstName}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="lastName"
										placeholder="Last Name"
										value={formData.lastName}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="email"
										placeholder="Enter your Email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</Form.Select>
								</InputGroup>
                    		</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-lock"></i>
									</InputGroup.Text>
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-lock"></i>
									</InputGroup.Text>
									<Form.Control
										type="password"
										name="confirmPassword"
										placeholder="Confirm Password "
										value={formData.confirmPassword}
										onChange={handleChange}
										required
									/>
								</InputGroup>

								<Card.Text style={{ color: "#F64740", fontSize: "12px" }}>
									Characters should be between 8-20
								</Card.Text>
							</Form.Group>
							<Form.Group style={{ textAlign: "center", padding: "1em" }}>
								<Button>Sign Up</Button>
							</Form.Group>
							<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em" }}>
								Already have an account?
								<Card.Link
									onClick={() => setActiveCard("login")}
									style={{ color: "#F64740", cursor: "pointer" }}
								>
									Login
								</Card.Link>
							</Card.Text>{" "}
							{/*This login link will switch active card state to signup card. setActiveCard found in AuthPage */}
						</Form>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}
SignUp.propTypes = {
	setActiveCard: PropTypes.func.isRequired,
};

export default SignUp;
