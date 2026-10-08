import openapi from "../../../openapi.json";

export default function handler(req, res) {
	res.status(200).json(openapi);
}
