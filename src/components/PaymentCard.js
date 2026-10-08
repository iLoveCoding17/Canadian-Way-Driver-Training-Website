import React from "react";
import Button from "./Button";

export default function PaymentCard() {
	return (
		<div className="position-relative bg-red shadow rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4">
			<h2 className="text-white">Full Driving Course</h2>
			<div className="card-price-duration">
				<span className="text-white">$800</span>
				<span className="text-white">35 hours</span>
			</div>
			<p className="text-white">Begin your driving journey with the CWD complete driving course</p>
			<h3 className="text-white">Includes</h3>
			<p className="text-white">
				25 Hours Of Online Lessons <br />
				10 Hours Of In Class Lessons <br />
				Road Test Practice &amp; 1on1’s Included
			</p>
			<Button mode="white">Purchase & Book</Button>
		</div>
	);
}
