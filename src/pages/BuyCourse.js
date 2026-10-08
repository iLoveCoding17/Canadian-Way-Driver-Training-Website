/**
 * @file BuyCourse.js
 * @description BuyCourse.js is mainly used to show the information about the courses which Canadian Way Driver has. It also can redirect he user to
 * the buy page for courses.
 */
import React, { useCallback } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function BuyCourse() {
	const router = useRouter();
	const handleBuyCourse = useCallback((courseName, coursePrice) => {
		router.push(`/CompletePurchase?courseName=${courseName}&coursePrice=${coursePrice}`);
	}, [router]);

	return (
		<Layout>
			<main>
				<Container className="py-5">
					<h1 className="text-center fw-bold mb-2">Our Driving Courses</h1>
					<h2 className="text-center text-black mb-4 text-secondary">
						Select the course that best fits your driving goals and schedule
					</h2>
					<Row className="g-4 justify-content-center">
						{/* On the road practice */}
						<Col md={4}>
							<Card className="h-100 shadow-sm card-hover rounded-4">
								<Card.Body className="d-flex flex-column">
									<div
										className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
										style={{ width: "60px", height: "60px" }}
									>
										<i className="bi bi-car-front-fill fs-3 text-danger"></i>
									</div>
									<Card.Title className="fs-4 fw-bold">On the Road Practice</Card.Title>
									<Card.Subtitle className="mb-3">
										<span className="text-danger fs-2">$100</span>{" "}
										<small className="text-muted">/ 2 hours</small>
									</Card.Subtitle>
									<Card.Text className="flex-grow-1 text-muted">
										Our tailored one-on-one in-car training with a certified instructor is designed to boost confidence, sharpen skills, and prepare you for your road test or independent driving. Flexible scheduling and focused lessons ensure that every session meets your needs, helping you build safe habits behind the wheel.
									</Card.Text>
									<Button
										variant="danger"
										className="mt-auto rounded-pill"
										onClick={() => handleBuyCourse("On the Road Practice", 100)}
									>
										Purchase
									</Button>
								</Card.Body>
							</Card>
						</Col>

						{/* Defensive driving*/}
						<Col md={4} className="position-relative">
							<Card className="h-100 shadow-sm card-hover rounded-4">
								<Card.Body className="d-flex flex-column">
									<div
										className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
										style={{ width: "60px", height: "60px" }}
									>
										<i className="bi bi-shield-fill fs-3 text-white"></i>
									</div>
									<Card.Title className="fs-4 fw-bold">Defensive Driving (Driver Improvement) </Card.Title>
									<Card.Subtitle className="mb-3">
										<span className="text-danger fs-2">$100</span>{" "}
										<small className="text-muted">/ 6 hours</small>
									</Card.Subtitle>
									<Card.Text className="flex-grow-1 text-muted">
										Our 6-hour (online or in-person) defensive driving course is designed to remove demerit points and help you exit 
										the Graduated Driver Licensing (GDL) phase. 
									</Card.Text>
									<h6 className="fw-semibold">This interactive program focuses on: </h6>
									<ul className="list-unstyled text-muted">
										<li>✓ Understanding common driver errors (the leading cause of ~94–98 % of accidents)</li>
										<li>✓ Proactive hazard identification and handling </li>
										<li>✓ Techniques to anticipate and defend against risky behaviours from other drivers </li>
									</ul>
									<h6 className="fw-semibold">Approved by Nova Scotia Department of Transportation and Infrastructure Renewal  </h6>
									<Button
										variant="danger"
										className="mt-auto rounded-pill"
										onClick={() => handleBuyCourse("Defensive Driving (Driver Improvement)", 100)}
									>
										Purchase
									</Button>
								</Card.Body>
							</Card>
						</Col>

						{/* Full Driving Course */}
						<Col md={4}>
							<Card className="h-100 shadow-sm card-hover rounded-4">
								<Card.Body className="d-flex flex-column">
									<div
										className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
										style={{ width: "60px", height: "60px" }}
									>
										<i className="bi bi-mortarboard-fill fs-3 text-success"></i>
									</div>

									<Card.Title className="fs-4 fw-bold">Full Driving Course</Card.Title>
									<Card.Subtitle className="mb-3">
										<span className="text-danger fs-2">$600</span>{" "}
										<small className="text-muted">/ 35 hours</small>
									</Card.Subtitle>

									<Card.Text className="flex-grow-1 text-muted">
										Our comprehensive driver education package combines <strong>10 hours</strong> of in-car instruction with <b>25 hours</b> of self-paced online
										 theory. It’s structured to deepen your understanding of defensive driving, improve hazard perception, and meet provincial GDL requirements. 
									</Card.Text>

									<h6 className="fw-semibold">You&apos;ll enjoy benefits like:</h6>

									<ul className="list-unstyled text-muted">
										<li>✓ Reduced wait time toward your full license</li>
										<li>✓ <b>“N”</b> removal and upgrade to <b>“R”</b> without requiring another course </li>
										<li>✓ Eligibility for insurance discounts </li>
										<li>✓ Use of our dual-brake car for practice and your road test</li>
									</ul>
									<h6 className="fw-semibold">Approved by Nova Scotia Department of Transportation and Infrastructure Renewal  </h6>
									<Button
										variant="danger"
										className="mt-auto rounded-pill"
										onClick={() => handleBuyCourse("Full Driving Course", 600)}
									>
										Purchase
									</Button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</Layout>
	);
}
