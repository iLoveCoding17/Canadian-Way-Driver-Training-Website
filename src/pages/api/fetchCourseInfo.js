import dbConnect from "../../../backend/dbconnect.js";
import PurchaseCourseModel from "../../../backend/models/PurchaseCourseModel.js";

export default async function handler(req, res) {
	await dbConnect();

	const email = req.body.email;

	try {
		const courseInfo = await PurchaseCourseModel.findOne({ email }).sort({ createdAt: -1 });

		if(courseInfo == null) {
			return res.status(404).json({ success: false, error: "No courses registered for this email" });
		}

		const courseName = courseInfo.courseName;
		const coursePrice = courseInfo.coursePrice;

		return res.status(200).json({ success: true, courseName: courseName, coursePrice: coursePrice });
	} catch {
		res.status(500).json({ success: false, error: "Error fetching course info" });
	}
}
