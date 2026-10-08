/**
 * @file ConactPage.js
 * @description ContactPage.js contains the UI/webpage for the contact page.
 */
import React from "react";
import Button from "../components/Button";
import Layout from "@/components/Layout";

const ContactPage = () => {
	return (
		<Layout>
			<div className="container my-4">
				{/* Message Form and Map */}
				<div className="row justify-content-center align-items-stretch g-3">
					{/* Form */}
					<div className="col-lg-5">
						<div className="bg-white p-4 shadow rounded-4 h-100">
							<h2 className="mb-4 text-center">Send us a message</h2>
							<form>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input type="text" className="form-control" placeholder="Ex: Alex Hayes" />
								</div>
								<div className="mb-3">
									<label className="form-label">Subject</label>
									<input type="text" className="form-control" placeholder="Ex: Driving Lessons" />
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" placeholder="Ex: alexhayes@gmail.com" />
								</div>
								<div className="mb-3">
									<label className="form-label">Message</label>
									<textarea className="form-control" rows="4" placeholder="Message"></textarea>
								</div>
								<div className="d-flex justify-content-center">
									<Button>Submit</Button>
								</div>
							</form>
						</div>
					</div>

					{/* Map */}
					<div className="col-lg-5">
						<iframe
							title="Google Map"
							className="w-100 h-100 rounded-4 shadow"
							style={{ minHeight: "500px" }}
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.3822834012785!2d-63.64847502328111!3d44.650540687357456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a21b161ec9f37%3A0x249784927230d95b!2sCanadian%20Way%20Driver%20Training!5e0!3m2!1sen!2sca!4v1741119599687!5m2!1sen!2sca"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>

				{/* Contact Info Icons */}
				<div className="row text-center mt-5">
					<div className="col-md-4 mb-4">
						<i className="bi bi-telephone-fill fs-1 text-primary"></i>
						<h5 className="mt-2">Phone Number</h5>
						<p><a href="tel:+19022757523">+1 (902) 275-7523</a></p>
					</div>
					<div className="col-md-4 mb-4">
						<i className="bi bi-envelope-fill fs-1 text-success"></i>
						<h5 className="mt-2">Email</h5>
						<p><a href="mailto:supportcanadadriverway@gmail.com">supportcanadadriverway@gmail.com</a></p>
					</div>
					<div className="col-md-4 mb-4">
						<i className="bi bi-geo-alt-fill fs-1 text-danger"></i>
						<h5 className="mt-2">Address</h5>
						<p>147 Frederick Ave<br />Halifax, NS B3N 2L2</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ContactPage;