import dbConnect from "../../../backend/dbconnect.js";
import Instructor from "../../../backend/models/Instructor.js";

export default async function handler(req, res) {
	await dbConnect();

	const gender = req.body.gender;
	try {
		let instructors;
		if (gender === "male") {
			instructors = await Instructor.find({ gender: "male" });
		} else {
			instructors = await Instructor.find();
		}
		res.status(200).json(instructors);
	} catch {
		res.status(500).json({ error: "Error fetching instructors" });
	}
}
