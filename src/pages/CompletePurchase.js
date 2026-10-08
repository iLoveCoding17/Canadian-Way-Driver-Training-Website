/**
 * @file CompletePurchases.js
 * @description CompletePurchases.js is the page in which the user can complete thier purchase.
 * 
 * This file includes operations for:
 * - Validating if the information the user put in is valid to purchase a course.
 * - Posting the completedpurchase on the database.
 */
import React from "react";
import Layout from "../components/Layout";
import { Form, Card, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import axios from "axios";

export default function CompletePurchase() {
	const router = useRouter();
	const courseParameter = router.query.courseName;
	const priceParameter = router.query.coursePrice;
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [masterNum, setMasterNumber] = useState("")

	async function purchaseFromSubmit(event) {
		event.preventDefault();
		//Posting the purchase information on the database
		try {
			const response = await axios.post("/api/coursePurchase", {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				paymentMethod: paymentMethod,
				courseName: courseParameter,
				coursePrice: priceParameter,
				masterNumber: masterNum,
			});
			
			if (response.data.success) {
				window.alert("Your purchase information has been submitted successfully");
				setFirstName("");
				setLastName("");
				setEmail("");
				setPhone("");
				setPaymentMethod("");
				setMasterNumber("");
			}

			//Updating the users master number
			const responsePut = await axios.put("/api/users",{
				email: email,
				masterNumber: masterNum,
			});
		} catch(error) {
			//Letting the user know if there is anything wrong with the purchase information they inputted.
			if(error.response.status === 400) {
				window.alert("This email is not registred, please create an account first");
			} else {
				console.error("Failed to submit your purchase information ", response.data.error);
				window.alert("Failed to submit your purchase information");
			}
		}
		
	}
	return (
		<Layout>
			<div className="container d-flex justify-content-center align-items-center py-5">
				<Card className="d-flex p-4 shadow" style={{ borderColor: "white", maxWidth: "600px", width: "100%" }}>
					<Card.Body>
						<h2
							className="text-center mb-3"
							style={{
								color: "#F64740",
								fontWeight: "550",
							}}
						>
							Complete Purchase
						</h2>
						<div className="text-center mb-3">
							<p
								style={{
									color: "#F64740",
									fontWeight: "550",
								}}
							>
								Course Name: {courseParameter}
							</p>
							<p
								style={{
									color: "#F64740",
									fontWeight: "550",
								}}
							>
								Course Price: ${priceParameter}
							</p>
						</div>
						<Form onSubmit={purchaseFromSubmit}>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person-fill"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="firstName"
										placeholder="First Name"
										value={firstName}
										onChange={(event) => setFirstName(event.target.value)}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-person-fill"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="lastName"
										placeholder="Last Name"
										value={lastName}
										onChange={(event) => setLastName(event.target.value)}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-envelope-at-fill"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="email"
										placeholder="Email"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-telephone-fill"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="phone"
										placeholder="Phone"
										value={phone}
										onChange={(event) => setPhone(event.target.value)}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-hash"></i>
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="masterNum"
										placeholder="Master Number"
										value={masterNum}
										onChange={(event) => setMasterNumber(event.target.value)}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<InputGroup>
									<InputGroup.Text>
										<i className="bi bi-cash-stack"></i>
									</InputGroup.Text>
									<Form.Select
										name="paymentMethod"
										value={paymentMethod}
										onChange={(event) => setPaymentMethod(event.target.value)}
										required
									>
										<option value="">Select Payment Method</option>
										<option value="E-Transfer">E-Transfer</option>
										<option value="Cash">Cash</option>
									</Form.Select>
								</InputGroup>
							</Form.Group>
							
							{paymentMethod == "E-Transfer" && (
								<div
									className="text-center mt-2 mb-4"
									style={{
										color: "#F64740",
										fontWeight: "550",
									}}
								>
									Please send your e-transfer to <strong>canadianwaydriver@gmail.com</strong>
								</div>
							)}
							{paymentMethod == "Cash" && (
								<div
									className="text-center mt-2 mb-4"
									style={{
										color: "#F64740",
										fontWeight: "550",
									}}
								>
									Please have the cash amount ready for your course
								</div>
							)}
							<Form.Group style={{ textAlign: "center" }}>
								<Button type="submit">Complete Purchase</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	);
}
