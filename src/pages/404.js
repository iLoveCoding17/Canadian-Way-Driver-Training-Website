/**
 * @file 404.js
 * @description 404.js is used for when the user trys to access a page which does not exist.
 */
import Layout from "../components/Layout";

export default function PageNotFound() {
	return (
		<Layout>
			<h3 className="text-danger">Page not found!</h3>
		</Layout>
	);
}
