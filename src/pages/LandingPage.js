/**
 * @file LandingPage.js
 * @description LandingPage.js is a component for the home page which displays a car driving/ purchase courses.
 */
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import MultiStepPopup from "@/components/MultiStepPopup";
import AnnouncementPopUp from "@/components/AnnouncementPopUp";

export default function LandingPage() {
	const [showPopup, setShowPopup] = useState(false);

	const handleOpenPopup = () => setShowPopup(true);
	const handleClosePopup = () => setShowPopup(false);

	const CourseCard = ({ icon, title, price }) => (
		<Col xs={12} sm={{ span: 6, offset: 3 }}>
			<Card className={`h-100 card-cool bg-opacity-75 ${showPopup ? "d-none" : ""}`}>
				<Card.Body className="text-center d-flex flex-column">
					<div className="mb-3">
						<i className={`bi ${icon} fs-2 text-danger`}></i>
					</div>
					<Card.Title className="fw-bold">{title}</Card.Title>
					<Card.Subtitle className="text-danger fs-4 mb-4">{price}</Card.Subtitle>
					<Button
						variant="danger"
						mode="card"
						className="mt-auto rounded-pill"
						onClick={handleOpenPopup}
					>
						Learn More
					</Button>
				</Card.Body>
			</Card>
		</Col>
	);

	return (
		<>
			<AnnouncementPopUp />

			{/* HERO */}
			<section className="position-relative overflow-hidden" style={{ minHeight: "100vh" }}>
				<video
					autoPlay
					loop
					muted
					playsInline
					className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
				>
					<source src="/videos/Video2.mp4" type="video/mp4" />
				</video>
				<div className="position-absolute inset-0 bg-dark bg-opacity-50" />

				<Container className="position-relative d-flex flex-column justify-content-center pt-5">
					<Row className="align-items-center">
						<div className="d-flex flex-row justify-content-center bg-dark bg-opacity-75 p-2 rounded-3 mb-4 w-100 text-align-center">
							<h1 className="hero-heading fw-bold w-100 text-white text-center p-2 m-0">
								Tailored Driving Lessons for Every Skill Level
							</h1>
						</div>

						{showPopup && (
							<MultiStepPopup
								className="d-flex"
								closePopup={handleClosePopup}
								style={{ zIndex: 100 }}
							/>
						)}

						{/* Left: Cards */}
						<Col md={6} className="text-center text-md-start mb-3 mb-md-0">
							<Row className="g-4">
								<CourseCard
									icon="bi-shield-fill"
									title="Defensive Driving (Driver Improvement)"
									price="$100"
								/>
							</Row>
							<Row className="g-4 mt-3">
								<CourseCard
									icon="bi-person-fill"
									title="On the Road Practice"
									price="$100"
								/>
							</Row>
							<Row className="g-4 mt-3">
								<CourseCard
									icon="bi-mortarboard-fill"
									title="Full Course"
									price="$600"
								/>
							</Row>
						</Col>

						{/* Right: Hero Image */}
						<Col md={6} className={`position-relative text-center ${showPopup ? "d-none" : ""}`}>
							<Image
								src="/img/LPP1.png.jpg"
								alt="Instructor"
								fluid
								style={{ height: "25rem", width: "15rem" }}
								className="object-fit-cover align-self-start rounded-pill border me-3"
							/>
							<div className="position-absolute bottom-0 end-0 bg-danger bg-opacity-90 text-white px-4 py-2 rounded-pill shadow-lg">
								Steel‑nerved Abawayj is the grandaddy of Halifax’s newcomer driving scene!
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* TAGLINE */}
			<section className="py-5 bg-dark text-white text-center">
				<Container>
					<p className="fs-3 fst-italic mb-0">
						Over 25 years of turning beginners into confident and skilled drivers
					</p>
				</Container>
			</section>
		</>
	);
}

