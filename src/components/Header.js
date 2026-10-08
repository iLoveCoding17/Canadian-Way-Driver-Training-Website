import Button from "./Button";
import { Nav, Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Header({ dark = false }) {
	const [loggedInUser, setLoggedInUser] = useState(false);
	const [adminButtonVisible, setAdminButtonVisibility] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const LoggedInUserToken = localStorage.getItem("token");
		setLoggedInUser(LoggedInUserToken !== null);

		const adminButtonVisibility = localStorage.getItem("admin");
		setAdminButtonVisibility(adminButtonVisibility === "true");
	}, []);

	const logoutUser = () => {
		localStorage.removeItem("token");
		localStorage.setItem("admin", "false");
		setLoggedInUser(false);
		setAdminButtonVisibility(false);
		router.push("/");
	};

	return (
		<header>
			<Navbar
				collapseOnSelect
				expand="lg"
				className={`navbar ${dark && "bg-dark bg-opacity-50"} py-3`}
			>
				<Container>
					<Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
						<Image
							src="/img/CWDLogo.png"
							alt="CWD Logo"
							width={50}
							height={50}
							className="me-2"
						/>
						<div className="d-none d-sm-block">
							<h5 className={`mb-0 fw-bold ${dark ? "text-white" : "text-dark"}`}>
								Canadian Way <br /> Driver Training
							</h5>
						</div>
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						className={`${dark && "bg-white"}`}
					/>

					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mx-lg-auto text-center my-3 my-lg-0 gap-lg-4 gap-3">
							<Button mode="navButton" href="/AboutUs">
								About Us
							</Button>
							<Button mode="navButton" href="/BuyCourse">
								Buy Course
							</Button>
							<Button mode="navButton" href="/ContactPage">
								Contact Us
							</Button>
							<Button mode="navButton" href="/booking">
								Bookings
							</Button>
							{adminButtonVisible && (
								<Button id="adminButton" mode="navButton" href="/Admin">
									Admin
								</Button>
							)}
						</Nav>

						<Nav className="text-center gap-2">
							{loggedInUser ? (
								<Button click={logoutUser}>Logout</Button>
							) : (
								<>
									<Button href="/AuthPage?state=login">Login</Button>
									<Button href="/AuthPage?state=signup">Sign Up</Button>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
