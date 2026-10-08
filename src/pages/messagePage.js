/**
 * @file messagePage.js
 * @description messagePage.js is the page in which the admin can send the user a message.
 * 
 * This file includes operations for:
 * - Sending messages to users.
 * - Using message.js to post the message to the database.
 */
import Layout from "@/components/Layout";
import React from "react";
import Button from "@/components/Button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function MessageUser() {
	const [message, setMessage] = useState(null);
	const [subject, setSubject] = useState(null);
	const router = useRouter();
	const emailParameter = router.query.email;
	
	//Function to send the message to the user and post it on the database.
	async function messageSubmit(event) {
		event.preventDefault();
	
		const response = await axios.post("/api/message", { subject: subject, message: message, email: emailParameter });
		if (response.data.success) {
			window.alert("Your message has been sent successfully");
			setSubject("");
			setMessage("");
		} else {
			console.error("Failed to submit your message ", response.data.error);
			window.alert("Failed to submit your message");
		}
	}
	
	return (
		<Layout>
			<div className="container col-lg-9 bg-white shadow rounded-4 mt-5 p-4">
				<form onSubmit={messageSubmit}>
					<div>
						<h4 className="text-center mb-3">Send Message to User</h4>
						<input
							className="form-control mb-2"
							type="text"
							placeholder="Subject"
							required
							value={subject}
							onChange={(event) => setSubject(event.target.value)}
						/>
						<textarea
							className="form-control mb-2"
							rows="6"
							placeholder="Message"
							required
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<Button type="submit">Send Message</Button>
					</div>
				</form>
			</div>
		</Layout>
	);
}
