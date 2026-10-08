import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Container, Card, InputGroup } from "react-bootstrap";
import Button from "./Button";
import { useRouter } from "next/router";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";

function Login({ setActiveCard }) {
	const router = useRouter();

	// State to manage form data
	const [formData, setFormData] = React.useState({
		email: "",
		password: "",
	});

	// State to manage forgot password modal
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [adminCheckbox, setAdminCheckbox] = useState(false);
	const [adminKey, setAdminKey] = useState("");

	/**
	 * Updates the form data state when input fields change
	 * @param {Event} e - The input change event from form controls
	 */
	const handleChange = (e) => {
		// Create a new state object with all existing form data
		// and update only the field that changed using computed property name
		setFormData({
			...formData, // Spread operator to keep all existing values
			[e.target.name]: e.target.value, // Update specific field using input name attribute
		});
	};

	/**
	 * Handles the login form submission
	 * @param {Event} e - The form submission event
	 */
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		try {
			// Send login credentials to the server
			const response = await axios.post("/api/auth/login", formData);

			localStorage.setItem("userData", JSON.stringify(response.data.user));

			// Store authentication token in browser's local storage
			localStorage.setItem("token", response.data.token);

			if(adminCheckbox) {
				if(adminKey === "CWDT2025") {
					//setting admin in the local storage to true if the user signs in as an admin
					localStorage.setItem("admin", "true");
					router.push("/Admin");
				} else {
					window.alert("Please enter a valid admin key");
					return;
				}
			} else {
				//setting admin in the local storage to false if the user signs in as not an admin
				localStorage.setItem("admin", "false");

				// Redirect user to booking page after successful login
				router.push("/booking");
			}
		} catch (error) {
			// Show appropriate error message based on error type
			if (error.response) {
				// Server responded with an error status
				alert(error.response.data.error || `Error ${error.response.status}: Failed to log in!`);
			} else if (error.request) {
				// Request was made but no response received
				alert("No response received from server. Is the API running?");
			} else {
				// Error in setting up the request
				alert(`Error: ${error.message}`);
			}
		}
	};

	/**
	 * Handles the "forgot password" link click
	 * @param {Event} e - The click event
	 */
	const handleForgotPasswordClick = (e) => {
		e.preventDefault(); // Prevent default link behavior
		setShowForgotPassword(true); // Show the forgot password modal
	};

	const [view, setActiveView] = useState("desktop");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setActiveView("mobile");
			} else if (window.innerWidth > 768 && window.innerWidth < 1400) {
				setActiveView("tablet");
			} else {
				setActiveView("desktop");
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (view === "desktop") {
		return (
			<Container fluid className="login-container d-flex justify-content-center align-items-center h-100">
				<Card className="w-75 p-4 shadow border-0">
					<Card.Body>
						<h2 className="login-head-desktop text-center mb-3 fw-bold" style={{ color: "#F64740" }}>
							Login
						</h2>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="email"
										placeholder="Username or Email"
										value={formData.email}
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
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="d-flex justify-content-center mb-3">
								<Form.Check
									type="checkbox"
									id="adminLoginCheckbox"
									label="Login As Admin"
									style={{ color: "#F64740" }}
									checked={adminCheckbox}
									onChange={() => setAdminCheckbox(!adminCheckbox)}
								/>
							</Form.Group>
							{adminCheckbox && (
								<Form.Group className="mb-3">
									<InputGroup>
										<InputGroup.Text>
											<i className="bi bi-lock"></i>
										</InputGroup.Text>
										<Form.Control
											type="password"
											name="adminKey"
											placeholder="Admin Key"
											value={adminKey}
											onChange={(event) => setAdminKey(event.target.value)}
											required
										/>
									</InputGroup>
								</Form.Group>
							)}
							<Card.Link
								href="#"
								onClick={handleForgotPasswordClick}
								className="d-flex justify-content-center fs-7 text-decoration-none"
								style={{ color: "#F64740" }}
							>
								I forgot my password!
							</Card.Link>
							<Form.Group className="d-flex justify-content-center" style={{ padding: "1em" }}>
								<Button>Login</Button>
							</Form.Group>
							<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em" }}>
								No Account?{" "}
								<Card.Link
									onClick={() => setActiveCard("signup")}
									style={{ color: "#F64740", cursor: "pointer" }}
								>
									Sign up
								</Card.Link>
							</Card.Text>
						</Form>
					</Card.Body>
				</Card>
				<ForgotPassword show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
			</Container>
		);
	} else if (view === "mobile") {
		return (
			<Container
				fluid
				className="login-container d-flex flex-column justify-content-center align-items-center vh-100"
			>
				<h2 className="fw-bold text-center mb-3 fs-1" style={{ color: "#F64740" }}>
					Login
				</h2>
				<Form className="" onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<InputGroup>
							<InputGroup.Text>
								<i className="bi bi-person"></i>
							</InputGroup.Text>
							<Form.Control
								className="p-3 shadow"
								type="text"
								name="email"
								placeholder="Username or Email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<InputGroup className="mobile-inputs">
							<InputGroup.Text>
								<i className="bi bi-lock"></i>
							</InputGroup.Text>
							<Form.Control
								className="username p-3 shadow"
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group className="d-flex justify-content-center mb-3">
						<Form.Check
							type="checkbox"
							id="adminLoginCheckbox"
							label="Login As Admin"
							style={{ color: "#F64740" }}
							checked={adminCheckbox}
							onChange={() => setAdminCheckbox(!adminCheckbox)}
						/>
					</Form.Group>
					{adminCheckbox && (
						<Form.Group className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-lock"></i>
								</InputGroup.Text>
								<Form.Control
									type="password"
									name="adminKey"
									placeholder="Admin Key"
									value={adminKey}
									onChange={(event) => setAdminKey(event.target.value)}
									required
								/>
							</InputGroup>
						</Form.Group>
					)}

					<Form.Group className=" buttons d-flex justify-content-center" style={{ padding: "1em" }}>
						<Button>Login</Button>
					</Form.Group>
					<Card.Link
						href="#"
						onClick={handleForgotPasswordClick}
						className="d-flex justify-content-center fs-7"
						style={{
							color: "#F64740",
							fontSize: "15px",
							textDecoration: "none",
							marginTop: "20px",
						}}
					>
						I forgot my password!
					</Card.Link>
					<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em", marginTop: "20px" }}>
						No Account?{" "}
						<Card.Link
							onClick={() => setActiveCard("signup")}
							style={{ color: "#F64740", cursor: "pointer" }}
						>
							Sign up
						</Card.Link>
					</Card.Text>
				</Form>
				<ForgotPassword show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
			</Container>
		);
	} else if (view === "tablet") {
		return (
			<Container fluid className="login-container d-flex justify-content-center align-items-center vh-100">
				<Card className="w-75 my-card-tablet login-card p-4 shadow border-0 ">
					<Card.Body>
						<h2 className=" tablet-login text-center mb-4 fw-bold" style={{ color: "#F64740" }}>
							Login
						</h2>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="email"
										placeholder="Username or Email"
										value={formData.email}
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
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="d-flex justify-content-center mb-3">
								<Form.Check
									type="checkbox"
									id="adminLoginCheckbox"
									label="Login As Admin"
									style={{ color: "#F64740" }}
									checked={adminCheckbox}
									onChange={() => setAdminCheckbox(!adminCheckbox)}
								/>
							</Form.Group>
							{adminCheckbox && (
								<Form.Group className="mb-3">
									<InputGroup>
										<InputGroup.Text>
											<i className="bi bi-lock"></i>
										</InputGroup.Text>
										<Form.Control
											type="password"
											name="adminKey"
											placeholder="Admin Key"
											value={adminKey}
											onChange={(event) => setAdminKey(event.target.value)}
											required
										/>
									</InputGroup>
								</Form.Group>
							)}
							<Card.Link
								href="#"
								onClick={handleForgotPasswordClick}
								className=" buttons d-flex justify-content-center fs-7 text-decoration-none"
								style={{ color: "#F64740" }}
							>
								I forgot my password!
							</Card.Link>
							<Form.Group className="d-flex justify-content-center buttons" style={{ padding: "1em" }}>
								<Button>Login</Button>
							</Form.Group>
							<Card.Text className="text-center" style={{ color: "#F64740", padding: "1em" }}>
								No Account?{" "}
								<Card.Link
									onClick={() => setActiveCard("signup")}
									style={{ color: "#F64740", cursor: "pointer" }}
								>
									Sign up
								</Card.Link>
							</Card.Text>
						</Form>
					</Card.Body>
				</Card>
				<ForgotPassword show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
			</Container>
		);
	}
}

Login.propTypes = {
	setActiveCard: PropTypes.func.isRequired,
};

export default Login;
