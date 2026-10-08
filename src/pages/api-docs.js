/**
 * @file api-docs.js
 * @description api-docs.js is used to load and setup api's which are used in the program. 
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

// Use dynamic import with no SSR to avoid server-side rendering issues
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
	ssr: false,
	loading: () => <p>Loading API documentation...</p>,
});

export default function ApiDocs() {
	const [spec, setSpec] = useState(null);

	useEffect(() => {
		fetch("/api/swagger")
			.then((res) => res.json())
			.then((data) => setSpec(data));
	}, []);

	return spec && <SwaggerUI spec={spec} />;
}
