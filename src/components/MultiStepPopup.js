import React, { useState } from "react";
import { Form, Container, Card, Button } from "react-bootstrap";
import axios from "axios";

export default function MultiStepPopup({ closePopup }) {
	const [step, setStep] = useState("course");
	const [selectedCourse, setSelectedCourse] = useState(0);
	const [customerInfo, setCustomerInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});

	// Course Contents
	const courses = [
		{ id: 1, name: "On the Road Practice", description: "Tailored one-on-one in-car training session for 2 hours", price: 100 },
		{ id: 2, name: "Defensive Driving (Driver Improvement) ", description: "Defensive driving course", price: 100 },
		{ id: 3, name: "Full Course", description: "Complete comprehensive driver education package", price: 800 },
	];

	{
		/*Regular Expressions for all emails types*/
	}
	const emailSyntax = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Handles course selection.
	const handleCourseSelect = (course) => {
		setSelectedCourse(course);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCustomerInfo((prev) => ({ ...prev, [name]: value }));
	};

	const handleContinueFromInfo = () => {
		if (!customerInfo.email) {
			alert("Please enter your email to continue");
		} else if (!emailSyntax.test(customerInfo.email)) {
			alert("Please enter a correct email to continue");
		} else {
			setStep("payment");
		}
	};
	// Handles moving to the next card. Dependent on selecting a course.
	const handleContinueFromCourse = () => {
		if (selectedCourse) {
			setStep("information");
		} else {
			alert("Please select a course to continue");
		}
	};

	//handles the submittion when you click on complete
	const handleSubmit = async () => {
		const formData = {
			firstName: customerInfo.firstName,
			lastName: customerInfo.lastName,
			email: customerInfo.email,
			phone: customerInfo.phone,
			course: selectedCourse.name,
		};

		try {
			await axios.post("/api/PurchaseEmail", formData);
			alert("Purchase completed! Confirmation emails sent.");
		} catch {
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
			<Card className="shadow-lg border-0 rounded-lg overflow-hidden w-100" style={{ maxWidth: "800px" }}>
				<div className="row g-0">
					{/*Sidebar indicating booking steps*/}
					<div className="col-md-4 text-white" style={{ background: "#F64740" }}>
						<div className="p-4 h-100 d-flex flex-column">
							<h4 className="mb-4">Booking Steps</h4>
							<div className="d-flex flex-column">
								<div className={`d-flex align-items-center mb-3 ${step === "course" ? "fw-bold" : ""}`}>
									<div
										className={`rounded-circle bg-white d-flex justify-content-center align-items-center me-2`}
										style={{ width: "24px", height: "24px", color: "#F64740" }}
									>
										<small>1</small>
									</div>
									<span>Select Course</span>
								</div>
								<div
									className={`d-flex align-items-center mb-3 ${step === "information" ? "fw-bold" : ""}`}
								>
									<div
										className={`rounded-circle ${step === "information" || step === "payment" ? "bg-white" : "bg-white bg-opacity-50 text-white"} d-flex justify-content-center align-items-center me-2`}
										style={{ width: "24px", height: "24px", color: "#F64740" }}
									>
										<small>2</small>
									</div>
									<span>Personal Information</span>
								</div>
								<div
									className={`d-flex align-items-center mb-3 ${step === "payment" ? "fw-bold" : ""}`}
								>
									<div
										className={`rounded-circle ${step === "payment" ? "bg-white" : "bg-white bg-opacity-50 text-white"} d-flex justify-content-center align-items-center me-2`}
										style={{ width: "24px", height: "24px", color: "#F64740" }}
									>
										<small>3</small>
									</div>
									<span>Payment Details</span>
								</div>
							</div>
						</div>
					</div>

					{/*Main content for each card*/}
					<div className="col-md-8">
						<div className="p-4">
							<div>
								<button
									className=" position-absolute btn-close d-flex flex-row"
									onClick={closePopup}
									style={{ position: "absolute", right: "30px" }}
								></button>
							</div>
							{step === "course" ? (
								<>
									<h2 className="text-center mb-4">Select Your Course</h2>
									<div className="d-flex flex-column align-items-center gap-3 mb-4">
										{courses.map((course) => (
											<Card
												key={course.id}
												className={`w-100 mb-2 popup-card border ${selectedCourse.id === course.id ? "border-danger" : "border-0"} shadow-sm`}
												role="button"
												onClick={() => handleCourseSelect(course)}
											>
												<Card.Body className="d-flex justify-content-between align-items-center p-3">
													<div>
														<Card.Title className="mb-0">{course.name}</Card.Title>
														<Card.Text className="text-muted small">
															{course.description}
														</Card.Text>
													</div>
													<div className="d-flex align-items-center">
														<div className=" fw-bold fs-4" style={{ color: "#F64740" }}>
															${course.price}{" "}
														</div>
														{selectedCourse.id === course.id && (
															<i
																className="bi bi-check-circle-fill ms-2"
																style={{ color: "#F64740" }}
															></i>
														)}
													</div>
												</Card.Body>
											</Card>
										))}
									</div>
									<div className="d-flex justify-content-end mt-4">
										<Button
											onClick={handleContinueFromCourse}
											className="px-4 py-2 rounded-pill"
											style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
										>
											Continue <i className="bi bi-arrow-right ms-1"></i>
										</Button>
									</div>
								</>
							) : step === "information" ? (
								<>
									<div className="d-flex align-items-center mb-3">
										<Button
											variant="link"
											onClick={() => setStep("course")}
											className="p-0 border-0"
											style={{ color: "#F64740" }}
										>
											<i className="bi bi-arrow-left me-1"></i> Back
										</Button>
										<h2 className="text-center flex-grow-1 me-4">Personal Information</h2>
									</div>

									{selectedCourse && (
										<div className="alert d-flex justify-content-between align-items-center mb-3">
											<span>
												Selected: <strong>{selectedCourse.name}</strong>
											</span>
											<span className="fw-bold" style={{ color: "#F64740" }}>
												${selectedCourse.price}
											</span>
										</div>
									)}

									<Form>
										<div className="row gy-3 gx-3 mb-3">
											<div className="col-md-6">
												<Form.Group>
													<Form.Label>First Name</Form.Label>
													<Form.Control
														type="text"
														placeholder="Enter first name"
														name="firstName"
														value={customerInfo.firstName}
														onChange={handleInputChange}
													/>
												</Form.Group>
											</div>
											<div className="col-md-6">
												<Form.Group>
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														type="text"
														placeholder="Enter last name"
														name="lastName"
														value={customerInfo.lastName}
														onChange={handleInputChange}
													/>
												</Form.Group>
											</div>
										</div>

										<div className="row gy-3 gx-3 mb-4">
											<div className="col-md-6">
												<Form.Group>
													<Form.Label>Email Address</Form.Label>
													<Form.Control
														type="email"
														placeholder="cwd@gmail.com"
														name="email"
														value={customerInfo.email}
														onChange={handleInputChange}
													/>
												</Form.Group>
											</div>
											<div className="col-md-6">
												<Form.Group>
													<Form.Label>Phone Number</Form.Label>
													<Form.Control
														type="tel"
														placeholder="(123) 456-7890"
														name="phone"
														value={customerInfo.phone}
														onChange={handleInputChange}
													/>
												</Form.Group>
											</div>
										</div>

										<div className="d-flex justify-content-end mt-4">
											<Button
												onClick={() => handleContinueFromInfo()}
												className="px-4 py-2 rounded-pill"
												style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
											>
												Continue <i className="bi bi-arrow-right ms-1"></i>
											</Button>
										</div>
									</Form>
								</>
							) : (
								<>
									<div className="d-flex align-items-center mb-3">
										<Button
											variant="link"
											onClick={() => {
												setStep("information");
											}}
											className="p-0 border-0"
											style={{ color: "#F64740" }}
										>
											<i className="bi bi-arrow-left me-1"></i> Back
										</Button>
										<h2 className="text-center flex-grow-1 me-4">Payment Details</h2>
									</div>

									{selectedCourse && (
										<div className="bg-light p-3 rounded-3 mb-4">
											<div className="d-flex justify-content-between align-items-center">
												<span>Selected Course:</span>
												<span className="fw-bold">{selectedCourse.name}</span>
											</div>
											<div className="d-flex justify-content-between align-items-center mt-2">
												<span>Total Amount:</span>
												<span className="fw-bold fs-5" style={{ color: "#F64740" }}>
													${selectedCourse.price}
												</span>
											</div>
											<div className="d-flex justify-content-between align-items-center mt-2">
												<span>Email:</span>
												<span>{customerInfo.email}</span>
											</div>
										</div>
									)}

									<div className="d-flex justify-content-end mt-4">
										<Button
											className="px-4 py-2 rounded-pill"
											style={{ backgroundColor: "#F64740", borderColor: "#F64740" }}
											onClick={handleSubmit}
										>
											Complete
										</Button>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</Card>
		</Container>
	);
}
