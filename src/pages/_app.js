import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		let timer;

		const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

		const logoutUser = () => {
			localStorage.removeItem("token");
			router.push("/AuthPage");
		};

		const resetTimer = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				logoutUser();
			}, 30 * 60 * 1000); // 30 minutes
		};

		events.forEach((event) => window.addEventListener(event, resetTimer));
		resetTimer();

		return () => {
			events.forEach((event) => window.removeEventListener(event, resetTimer));
			if (timer) clearTimeout(timer);
		};
	}, [router]);

	return <Component {...pageProps} />;
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

