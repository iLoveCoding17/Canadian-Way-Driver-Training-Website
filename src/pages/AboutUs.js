/**
 * @file AboutUs.js
 * @description This is the page which the user sees when they are on the about us page.
 */
import Layout from "@/components/Layout";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

export default function AboutUs() {
	return (
		<Layout>
			<Container fluid className="bg-white pt-5 pb-5">
				<Row className="justify-content-center g-4">
					{[
						{
							title: "Comprehensive Courses",
							text: "Our driving courses are designed to equip you with the knowledge and skills needed to be a safe and responsible driver. From beginner to advanced levels, we have the right course for you.",
							image: "img/graduate.png",
						},
						{
							title: "Expert Instructors",
							text: "Our team of experienced and certified instructors is dedicated to providing top-notch training, ensuring that you receive the best guidance and support throughout your learning journey.",
							image: "img/training.png",
						},
						{
							title: "Flexible Scheduling",
							text: "We understand the importance of convenience. That's why we offer flexible scheduling options to fit your busy lifestyle. You can easily book your classes at your preferred time.",
							image: "img/snowycar.jpg",
						},
					].map((section, idx) => (
						<Col xs={12} md={4} key={idx}>
							<Card className="border-0 shadow-sm bg-black h-100" style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
								<Image
									src={section.image}
									alt={section.title}
									fluid
									style={{ height: "400px", objectFit: "cover" }}
								/>
								<Card.Body
									className="text-white rounded-bottom"
									style={{ backgroundColor: "#F64740", minHeight: "300px", padding: "2.5rem" }}
								>
									<Card.Title style={{ fontSize: "2.8rem", marginBottom: "1.8rem" }}>
										{section.title}
									</Card.Title>
									<Card.Text style={{ lineHeight: "1.8", fontSize: "1.2rem" }}>
										{section.text}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</Layout>
	);
}
