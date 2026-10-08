/**
 * @file index.js
 * @description index.js is responsible for displaying the landingPage and testimonials.
 */
import Layout from "../components/Layout";
import LandingPage from "@/pages/LandingPage";
import dotenv from "dotenv";
import Testimonials from "@/pages/Testimonials";

dotenv.config();

export default function Index() {
	return (
		<Layout dark={true}>
			<LandingPage />
			<Testimonials />
		</Layout>
	);
}
