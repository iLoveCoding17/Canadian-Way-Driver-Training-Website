import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="text-white py-4 px-2 bg-red">
			<div className="container">
				<div className="row gy-4"> {/* gy-4 adds vertical spacing on mobile */}
					<div className="col-12 col-sm-6 col-md-3">
						<h5>Company</h5>
						<ul className="list-unstyled">
							<li>
								<Link href="/" className="text-white text-decoration-none">Home</Link>
							</li>
							<li>
								<Link href="/ContactPage" className="text-white text-decoration-none">Contact Us</Link>
							</li>
							<li>
								<Link href="/AboutUs" className="text-white text-decoration-none">About Us</Link>
							</li>
							<li>
								<Link href="/TestimonialPage" className="text-white text-decoration-none">Testimonials</Link>
							</li>
						</ul>
					</div>

					<div className="col-12 col-sm-6 col-md-3">
						<h5>Services</h5>
						<ul className="list-unstyled">
							<li>
								<Link href="/booking" className="text-white text-decoration-none">Create booking</Link>
							</li>
							<li>
								<Link href="/BuyCourse" className="text-white text-decoration-none">Road Test Practice</Link>
							</li>
							<li>
								<Link href="/BuyCourse" className="text-white text-decoration-none">One-on-One Lessons</Link>
							</li>
							<li>
								<Link href="/BuyCourse" className="text-white text-decoration-none">Full Driving Course</Link>
							</li>
						</ul>
					</div>

					<div className="col-12 col-sm-6 col-md-3">
						<h5>Contact Us</h5>
						<ul className="list-unstyled text-wrap text-break">
							<li>
								<a href="mailto:supportcanadadriverway@gmail.com" className="text-white">
									supportcanadadriverway@gmail.com
								</a>
							</li>
							<li>
								<a href="tel:+19022757523" className="text-white">
									+1 (902) 275-7523
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="text-center mt-4 pt-3 border-top">
					<p className="mb-0">&copy; 2025 Canadian Way Driver Training. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
