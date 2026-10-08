/**
 * @file AuthPage.js
 * @description AuthPage.js is the page which the user is lead to when they are trying to sign into thier account or signing up for an account.
 * 
 * This file includes operations for:
 * - Displaying if the user is logged/not logged into an account.
 * - Displaying the log in/sign up button.
 */
import React, { useState, useEffect } from "react";
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function AuthPage() {
	const router = useRouter();
	const { state } = router.query;

	const [activeState, setActiveState] = useState("login");

	const setActiveCard = (card) => {
		setActiveState(card);
	};

	const imageVariantTop = {
		hidden: { opacity: 0, x: 100 },
		visible: { opacity: 1, x: 0, transition: { duration: 1 } },
	};

	const imageVariantBottom = {
		hidden: { opacity: 0, x: -100 },
		visible: { opacity: 1, x: 0, transition: { duration: 1 } },
	};

	useEffect(() => {
		if (state === "signup") {
			setActiveState("signup");
		} else if (state === "login") {
			setActiveState("login");
		}
	}, [state]);

	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-6 d-none d-xl-block">
						<div className="row">
							<div className="col-6 d-flex flex-column justify-content-center">
								<h1 className="authenticationHeader ">
									{activeState === "login" ? "Login" : "Sign up"} to <br></br> start your <br></br>{" "}
									driving journey
								</h1>
							</div>
							<div className="col d-flex flex-column justify-content-end">
								<motion.img
									src="/img/LoginPageImage.jpg"
									alt="Person with Car"
									className="img-fluid h-75 object-fit-cover rounded-top-circle"
									style={{ width: "300px", marginRight: "40px" }}
									variants={imageVariantTop}
									initial="hidden"
									animate="visible"
								/>
							</div>
						</div>
						<div className="row position-relative">
							<motion.img
								src="/img/LoginBottomPageImage.jpg"
								alt="Person with Car"
								className="img-fluid object-fit-cover rounded-bottom-circle"
								style={{ width: "300px", marginBottom: "40px" }}
								variants={imageVariantBottom}
								initial="hidden"
								animate="visible"
							/>
							<div
								className="position-absolute w-100 d-flex justify-content-center popup-card"
								style={{ top: "-20px", zIndex: 10 }}
							>
								<Button>Create Booking</Button>

							</div>
						</div>
					</div>
					{activeState === "login" ? (
						<div className="col">
							<Login className="login" setActiveCard={setActiveCard} />
						</div>
					) : (
						<div className="col d-flex flex-column justify-content-center align-items-center">
							<SignUp setActiveCard={setActiveCard} />
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
